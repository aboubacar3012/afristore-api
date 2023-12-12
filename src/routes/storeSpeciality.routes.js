const express = require("express");
const router = express.Router();
const StoreSpeciality = require("../model/storeSpeciality.model");
const middleware = require("../utils/middleware");

// Create StoreSpeciality
router.post("/", middleware.isAuthenticated, (request, response) => {
  try {
    const body = request.body;
    const newStoreSpeciality = new StoreSpeciality({
      ...body,
    });
    newStoreSpeciality.save().then((storeSpeciality) => {
      return response.status(201).json({
        success: true,
        message: "StoreSpeciality created successfully",
        storeSpeciality: storeSpeciality,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Get all storeSpecialities
router.get("/", (request, response) => {
  try {
    StoreSpeciality.find().then((storeSpecialities) => {
      return response
        .status(200)
        .json({ success: true, storeSpecialities: storeSpecialities });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

module.exports = router;
