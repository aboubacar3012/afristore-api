const express = require("express");
const router = express.Router();
const Option = require("../model/option.model");
const middleware = require("../utils/middleware");

// Create Option
router.post("/", (request, response) => { // middleware.isAuthenticated
  try {
    const body = request.body;
    const newOption = new Option({
      ...body,
    });
    newOption.save().then((option) => {
      return response.status(201).json({
        success: true,
        message: "Option created successfully",
        option: option,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Get all Options
router.get("/", (request, response) => { // middleware.isAuthenticated
  try {
    Option.find({}).populate("values").then((options) => {
      return response.status(200).json({
        success: true,
        message: "Options retrieved successfully",
        options: options,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Get Option by id
router.get("/:id", (request, response) => { // middleware.isAuthenticated
  try {
    const id = request.params.id;
    Option.findById(id).populate("values").then((option) => {
      return response.status(200).json({
        success: true,
        message: "Option retrieved successfully",
        option: option,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});


// Update Option by id
router.put("/:id", (request, response) => { // middleware.isAuthenticated
  try {
    const id = request.params.id;
    const body = request.body;
    Option.findByIdAndUpdate(id, body).then((option) => {
      return response.status(200).json({
        success: true,
        message: "Option updated successfully",
        option: option,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
}
);


// Delete Option by id
router.delete("/:id", (request, response) => { // middleware.isAuthenticated
  try {
    const id = request.params.id;
    Option.findByIdAndDelete(id).then((option) => {
      return response.status(200).json({
        success: true,
        message: "Option deleted successfully",
        option: option,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
}
);



module.exports = router;
