const mongoose = require("mongoose");

const businessInfoSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  businessName: { type: String, required: true, unique: true }, // ✅ unique
  gstin: { type: String, unique: true, sparse: true }, // ✅ unique but optional
  phone: { type: String, required: true },
  address: { type: String, required: true },
});

module.exports = mongoose.model("BusinessInfo", businessInfoSchema);