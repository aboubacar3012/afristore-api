const express = require("express");
const router = express.Router();
const Product = require("../model/product.model");
const middleware = require("../utils/middleware");

// Create Product
router.post("/", middleware.isAuthenticated, (request, response) => {
  // category is an array of category ids
  try {
    const body = request.body;
    const product = new Product({
      ...body,
    });
    product.save().then((product) => {
      return response.status(200).json({
        success: true,
        message: "Produit créé avec succès",
        product: product,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Get all Products
router.get("/", (request, response) => {
  try {
    // populate category field
    Product.find()
      .populate("category")
      .populate("options")
      .populate({
        path: "options",
        populate: {
          path: "values",
        },
      })
      .then((products) => {
        return response.status(200).json({
          success: true,
          products: products,
        });
      });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Get Product by Id
router.get("/:id", (request, response) => {
  try {
    const id = request.params.id;
    Product.findById(id).then((product) => {
      return response.status(200).json({ success: true, product: product });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Update Product
router.put("/:id", middleware.isAuthenticated, (request, response) => {
  try {
    const id = request.params.id;
    const body = request.body;
    Product.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      { new: true }
    ).then((product) => {
      return response.status(200).json({
        success: true,
        message: "Produit mis à jour avec succès",
        product: product,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Delete Product
router.delete("/:id", middleware.isAuthenticated, (request, response) => {
  try {
    const id = request.params.id;
    Product.findByIdAndDelete(id).then((product) => {
      return response.status(200).json({
        success: true,
        message: "Produit supprimé avec succès",
        product: product,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

module.exports = router;
