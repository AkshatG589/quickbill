const express = require("express");
const router = express.Router();
const BillHistory = require("../models/BillHistory");
const { requireAuth } = require("@clerk/express");
console.log("hello from bill history")
// ✅ GET all bills for current user
router.get("/all", requireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    const bills = await BillHistory.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, bills });
  } catch (err) {
    console.error("Error fetching bills:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ POST to add a new bill (data comes pre-calculated)
router.post("/add", requireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    const {
      invoiceNo,
      billId,
      products,
      subtotal,
      discount,
      grandTotal
    } = req.body;

    if (
      !invoiceNo || !billId || !products || products.length === 0 ||
      subtotal === undefined || grandTotal === undefined
    ) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const newBill = new BillHistory({
      userId,
      invoiceNo,
      billId,
      products,
      subtotal,
      discount,
      grandTotal,
    });

    await newBill.save();

    res.status(201).json({ success: true, message: "Bill saved", bill: newBill });
  } catch (err) {
    console.error("Error adding bill:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ GET a specific bill by _id
router.get("/:id", requireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    const billId = req.params.id;

    const bill = await BillHistory.findOne({ userId, _id: billId });

    if (!bill) {
      return res.status(404).json({ success: false, message: "Bill not found" });
    }

    res.json({ success: true, bill });
  } catch (err) {
    console.error("Error fetching bill by ID:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
module.exports = router;