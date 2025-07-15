const express = require("express");
const router = express.Router();
const Product = require("../models/Products");

// Clerk helper to extract userId
const { requireAuth } = require("@clerk/express");

// ✅ Create Product
router.post("/add", requireAuth(), async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const userId = req.auth.userId;

    if (!name || !price) {
      return res.status(400).json({ error: "Name and price are required" });
    }

    const product = new Product({ userId, name, price, category });
    await product.save();

    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get All Products for Logged-in User
router.get("/all", requireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    const products = await Product.find({ userId });
    res.json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Update Product by ID
router.put("/update/:id", requireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    const productId = req.params.id;
    const { name, price, category } = req.body;

    const updated = await Product.findOneAndUpdate(
      { _id: productId, userId },
      { name, price, category },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ success: true, product: updated });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Delete Product by ID
router.delete("/delete/:id", requireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    const productId = req.params.id;

    const deleted = await Product.findOneAndDelete({ _id: productId, userId });

    if (!deleted) {
      return res.status(404).json({ error: "Product not found or not authorized" });
    }

    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Server error" });
  }
});

//✅ Getting Product by ID
/*router.get("/get/:id", requireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    const productId = req.params.id;

    const product = await Product.findOne({ _id: productId, userId });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Server error" });
  }
});*/
module.exports = router;