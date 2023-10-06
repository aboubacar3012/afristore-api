const express = require("express");
const router = express.Router();
const Address = require("../model/address.model");
const middleware = require("../utils/middleware");

// Create Address
router.post("/", middleware.isAuthenticated, (request, response) => {
  try {
    const body = request.body;
    const newAddress = new Address({
      ...body,
    });
    newAddress.save().then((address) => {
      return response.status(201).json({
        success: true,
        message: "Adresse ajoutée avec succès",
        address: address,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Get All Addresses
router.get("/", (request, response) => {
  try {
    Address.find().then((addresses) => {
      return response.status(200).json({
        success: true,
        addresses: addresses,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Get Address By Id
router.get("/:id", (request, response) => {
  try {
    const id = request.params.id;
    Address.findById(id).then((address) => {
      return response.status(200).json({
        success: true,
        address: address,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

module.exports = router;
