const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Clerk user ID
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);