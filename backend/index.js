require("dotenv").config();
const connectToMongo = require('./db');
connectToMongo();

const express = require('express');
const app = express();
const cors = require('cors');

// ✅ Correct import
const { clerkMiddleware } = require("@clerk/express"); // not lowercase

const businessInfoRoute = require("./routes/businessInfo");
const productRoute = require("./routes/product");
const billHistory = require("./routes/billHistory");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Apply middleware
app.use(clerkMiddleware({
  secretKey: process.env.CLERK_SECRET_KEY,
}));

app.use("/api/business-info", businessInfoRoute);
app.use("/api/products", productRoute);
app.use("/api/bills", billHistory);

app.get('/', (req, res) => {
  res.send('Hello from Quick Bills backend!');
});

app.listen(port, () => {
  console.log(`🚀 Quick Bills backend listening on port ${port}`);
});