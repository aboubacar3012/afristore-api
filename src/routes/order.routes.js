const express = require("express");
const router = express.Router();
const Order = require("../model/order.model");
const middleware = require("../utils/middleware");

// Create Order
router.post("/", middleware.isAuthenticated, (request, response) => {
  try {
    const body = request.body;
    const newOrder = new Order({
      ...body,
    });
    newOrder.save().then((order) => {
      return response.status(201).json({
        success: true,
        message: "Order created successfully",
        order: order,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Get all Orders
router.get("/", middleware.isAuthenticated, (request, response) => {
  try {
    Order.find()
      .populate("products")
      .populate("user")
      .then((orders) => {
        return response.status(200).json({ success: true, orders: orders });
      });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Get Order by Id
router.get("/:id", middleware.isAuthenticated, (request, response) => {
  try {
    const id = request.params.id;
    Order.findById(id)
      .populate("user")
      .then((order) => {
        return response.status(200).json({ success: true, order: order });
      });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Update Order
router.put("/:id", middleware.isAuthenticated, (request, response) => {
  try {
    const id = request.params.id;
    const body = request.body;
    Order.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      { new: true }
    ).then((order) => {
      return response.status(200).json({
        success: true,
        message: "Order updated successfully",
        order: order,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Delete Order
router.delete("/:id", middleware.isAuthenticated, (request, response) => {
  try {
    const id = request.params.id;
    Order.findByIdAndDelete(id).then((order) => {
      return response
        .status(200)
        .json({ success: true, message: "Order deleted successfully" });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

module.exports = router;
