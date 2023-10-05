const express = require("express");
const router = express.Router();
const Category = require("../model/category.model");

// Create Category
router.post("/", (request, response) => {
  try {
    const body = request.body;
    const newCategory = new Category({
      ...body,
    });
    newCategory.save().then((category) => {
      return response.status(201).json({
        success: true,
        message: "Category created successfully",
        category: category,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Get all Categories
router.get("/", (request, response) => {
  try {
    Category.find().then((categories) => {
      return response
        .status(200)
        .json({ success: true, categories: categories });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Get Category by Id
router.get("/:id", (request, response) => {
  try {
    const id = request.params.id;
    Category.findById(id).then((category) => {
      return response.status(200).json({ success: true, category: category });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Update Category
router.put("/:id", (request, response) => {
  try {
    const id = request.params.id;
    const body = request.body;
    Category.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      { new: true }
    ).then((category) => {
      return response.status(200).json({
        success: true,
        message: "Category updated successfully",
        category: category,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Delete Category
router.delete("/:id", (request, response) => {
  try {
    const id = request.params.id;
    Category.findByIdAndDelete(id).then((category) => {
      return response.status(200).json({
        success: true,
        message: "Category deleted successfully",
        category: category,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

module.exports = router;
