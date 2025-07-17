const express = require("express");
const router = express.Router();
const BusinessInfo = require("../models/BusinessInfo");
const { requireAuth } = require("@clerk/express");

// POST /api/business-info/add
router.post("/add", requireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { businessName, gstin, phone, address } = req.body;

    // Validate required fields
    if (!businessName || !phone || !address) {
      return res.status(400).json({ error: "Please fill all required fields" });
    }

    // Check for duplicate businessName (case-insensitive)
    const existingBusiness = await BusinessInfo.findOne({
      businessName: { $regex: new RegExp(`^${businessName}$`, "i") },
    });
    if (existingBusiness) {
      return res.status(400).json({ error: "Business name already exists" });
    }

    // Check for duplicate gstin if provided (case-insensitive)
    if (gstin) {
      const existingGSTIN = await BusinessInfo.findOne({
        gstin: { $regex: new RegExp(`^${gstin}$`, "i") },
      });
      if (existingGSTIN) {
        return res.status(400).json({ error: "GSTIN already exists" });
      }
    }

    const newInfo = new BusinessInfo({
      userId,
      businessName,
      gstin,
      phone,
      address,
    });

    await newInfo.save();

    res.status(201).json({
      success: true,
      message: "Business info saved",
      data: newInfo,
    });
  } catch (err) {
    console.error("❌ Error saving business info:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ GET /api/business-info/get
router.get("/get", requireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    const info = await BusinessInfo.findOne({ userId });

    if (!info) {
      return res.status(404).json({ success: false, message: "Business info not found" });
    }

    res.status(200).json({ success: true, data: info });
  } catch (err) {
    console.error("❌ Error fetching business info:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ PUT /api/business-info/update
router.put("/update", requireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { businessName, gstin, phone, address } = req.body;
    console.log(gstin)
    if (!businessName || !phone || !address) {
      return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }

    // Convert to lowercase for case-insensitive uniqueness check
    const businessNameLower = businessName.toLowerCase();
    const gstinLower = gstin?.toLowerCase();

    // Check for duplicate business name (case-insensitive) for other users
    const existingName = await BusinessInfo.findOne({
      userId: { $ne: userId },
      businessName: { $regex: new RegExp(`^${businessName}$`, "i") }
    });

    if (existingName) {
      return res.status(409).json({ success: false, message: "Business name already exists" });
    }

    // Check for duplicate GSTIN (case-insensitive) if provided
    if (gstin) {
      const existingGstin = await BusinessInfo.findOne({
        userId: { $ne: userId },
        gstin: { $regex: new RegExp(`^${gstin}$`, "i") }
      });

      if (existingGstin) {
        return res.status(409).json({ success: false, message: "GSTIN already exists" });
      }
    }

    const updatedInfo = await BusinessInfo.findOneAndUpdate(
      { userId },
      { businessName, gstin, phone, address },
      { new: true, runValidators: true }
    );

    if (!updatedInfo) {
      return res.status(404).json({ success: false, message: "Business info not found" });
    }

    res.status(200).json({ success: true, message: "Business info updated", data: updatedInfo });
  } catch (err) {
    console.error("❌ Error updating business info:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;