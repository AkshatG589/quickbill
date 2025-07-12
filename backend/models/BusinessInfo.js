const mongoose = require("mongoose");

const businessInfoSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  businessName: { type: String, required: true },
  logoUrl: { type: String }, // Optional
  gstin: { type: String },
  phone: { type: String, required: true },
  address: { type: String, required: true },
});

module.exports = mongoose.model("BusinessInfo", businessInfoSchema);