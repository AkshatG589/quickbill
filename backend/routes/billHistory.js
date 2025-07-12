const express = require("express");
const router = express.Router();
const BillHistory = require("../models/BillHistory");
const { requireAuth } = require("@clerk/express"); // ✅ correct import

// ✅ GET all bills for current user
router.get("/all", requireAuth, async (req, res) => {
  try {
    const userId = req.auth.userId;
    const bills = await BillHistory.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, bills });
  } catch (err) {
    console.error("Error fetching bills:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ POST to add a new bill
router.post("/add", requireAuth, async (req, res) => {
  try {
    const userId = req.auth.userId;
    const {
      invoiceNo,
      billId,
      products,
      discount = 0,
      billImageUrl = ""
    } = req.body;

    if (!invoiceNo || !billId || !products || products.length === 0) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    // Calculate totals
    const calculatedProducts = products.map((p) => ({
      ...p,
      total: p.price * p.quantity,
    }));

    const totalBeforeDiscount = calculatedProducts.reduce(
      (acc, curr) => acc + curr.total,
      0
    );

    const grandTotal = totalBeforeDiscount - discount;

    const newBill = new BillHistory({
      userId,
      invoiceNo,
      billId,
      products: calculatedProducts,
      discount,
      grandTotal,
      billImageUrl,
    });

    await newBill.save();

    res.status(201).json({ success: true, message: "Bill saved", bill: newBill });
  } catch (err) {
    console.error("Error adding bill:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;