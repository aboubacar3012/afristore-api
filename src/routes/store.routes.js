const express = require("express");
const router = express.Router();
const Store = require("../model/store.model");
const middleware = require("../utils/middleware");
// Create Store
router.post("/", middleware.isAuthenticated, (request, response) => {
  try {
    const body = request.body;
    const newStore = new Store({
      ...body,
    });
    newStore.save().then((store) => {
      return response.status(201).json({
        success: true,
        message: "Store created successfully",
        store: store,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Get all Stores
router.get("/", (request, response) => {
  try {
    Store.find().then((stores) => {
      return response.status(200).json({ success: true, stores: stores });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Get Store by Id
router.get("/:id", (request, response) => {
  try {
    const id = request.params.id;
    Store.findById(id).then((store) => {
      return response.status(200).json({ success: true, store: store });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Update Store by Id
router.put("/:id", middleware.isAuthenticated, (request, response) => {
  try {
    const id = request.params.id;
    const body = request.body;
    Store.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      { new: true }
    ).then((store) => {
      return response.status(200).json({
        success: true,
        message: "Store updated successfully",
        store: store,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Delete Store by Id
router.delete("/:id", middleware.isAuthenticated, (request, response) => {
  try {
    const id = request.params.id;
    Store.findByIdAndDelete(id).then((store) => {
      return response.status(200).json({
        success: true,
        message: "Store deleted successfully",
        store: store,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

module.exports = router;
