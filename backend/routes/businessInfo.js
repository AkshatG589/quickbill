const express = require("express");
const router = express.Router();
const BusinessInfo = require("../models/BusinessInfo");
const { requireAuth } = require("@clerk/express");

// POST /api/business-info/add
router.post("/add", requireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { businessName, logoUrl, gstin, phone, address } = req.body;

    if (!businessName || !phone || !address) {
      return res.status(400).json({ error: "Please fill all required fields" });
    }

    const newInfo = new BusinessInfo({
      userId,
      businessName,
      logoUrl,
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
    const { businessName, logoUrl, gstNumber, phone, address } = req.body;

    const updatedInfo = await BusinessInfo.findOneAndUpdate(
      { userId },
      { businessName, logoUrl, gstNumber, phone, address },
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