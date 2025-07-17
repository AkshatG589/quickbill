const mongoose = require("mongoose");

const BillProduct = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true }, // price * quantity
});

const BillHistory = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // Clerk user ID
    invoiceNo: { type: String, required: true, unique: true },

    // Optional customer info
    customerName: { type: String, default: "" },
    customerPhone: { type: String, default: "" },

    // Products array
    products: [BillProduct],

    // Pricing info
    subtotal: { type: Number, required: true },   // Before discount
    discount: { type: Number, default: 0 },       // Flat discount
    gst: { type: Number, default: 0 },            // Optional GST on total amount
    grandTotal: { type: Number, required: true }, // After discount and GST
  },
  { timestamps: true }
);

module.exports = mongoose.model("BillHistory", BillHistory);