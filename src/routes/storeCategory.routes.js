const express = require("express");
const router = express.Router();

const StoreCategory = require("../model/storeCategory.model");

// Create StoreCategory
router.post("/", (request, response) => {
  try {
    const body = request.body;
    const newStoreCategory = new StoreCategory({
      ...body,
    });
    newStoreCategory.save().then((storeCategory) => {
      return response.status(201).json({
        success: true,
        message: "StoreCategory created successfully",
        storeCategory: storeCategory,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Get all StoreCategories
router.get("/", (request, response) => {
  try {
    StoreCategory.find().then((storeCategories) => {
      return response
        .status(200)
        .json({ success: true, storeCategories: storeCategories });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Get StoreCategory by Id
router.get("/:id", (request, response) => {
  try {
    const id = request.params.id;
    StoreCategory.findById(id).then((storeCategory) => {
      return response
        .status(200)
        .json({ success: true, storeCategory: storeCategory });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Update StoreCategory
router.put("/:id", (request, response) => {
  // TODO: Update StoreCategory by Id
  try {
    const id = request.params.id;
    const body = request.body;
    StoreCategory.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      { new: true }
    ).then((storeCategory) => {
      return response.status(200).json({
        success: true,
        message: "StoreCategory updated successfully",
        storeCategory: storeCategory,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Delete StoreCategory
router.delete("/:id", (request, response) => {
  // TODO: Delete StoreCategory by Id
  try {
    const id = request.params.id;
    StoreCategory.findByIdAndDelete(id).then((storeCategory) => {
      return response.status(200).json({
        success: true,
        message: "StoreCategory deleted successfully",
        storeCategory: storeCategory,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

module.exports = router;
