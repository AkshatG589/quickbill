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
    invoiceNo: { type: String, required: true, unique: true }, // Unique across all bills
    billId: { type: String, required: true }, // Optional: can be user-specific
    products: [BillProduct],
    discount: { type: Number, default: 0 }, // Can be % or flat amount
    grandTotal: { type: Number, required: true }, // After applying discount
    billImageUrl: { type: String }, // Optional image URL
  },
  { timestamps: true }
);

module.exports = mongoose.model("BillHistory", BillHistory);