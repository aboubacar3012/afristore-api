const express = require("express");
const router = express.Router();
const OptionValue = require("../model/optionsValues.model");
const middleware = require("../utils/middleware");

// Create OptionValue
router.post("/", (request, response) => { // middleware.isAuthenticated
  try {
    const body = request.body;
    const newOptionValue = new OptionValue({
      ...body,
    });
    newOptionValue.save().then((optionValue) => {
      return response.status(201).json({
        success: true,
        message: "OptionValue created successfully",
        optionValue: optionValue,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Get all OptionValues
router.get("/", (request, response) => { // middleware.isAuthenticated
  try {
    OptionValue.find({}).then((optionValues) => {
      return response.status(200).json({
        success: true,
        message: "OptionValues retrieved successfully",
        optionValues: optionValues,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Get OptionValue by id
router.get("/:id", (request, response) => { // middleware.isAuthenticated
  try {
    const id = request.params.id;
    OptionValue.findById(id).then((optionValue) => {
      return response.status(200).json({
        success: true,
        message: "OptionValue retrieved successfully",
        optionValue: optionValue,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
}
);

// Update OptionValue by id
router.put("/:id", (request, response) => { // middleware.isAuthenticated
  try {
    const id = request.params.id;
    const body = request.body;
    OptionValue.findByIdAndUpdate(id, body).then((optionValue) => {
      return response.status(200).json({
        success: true,
        message: "OptionValue updated successfully",
        optionValue: optionValue,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
}
);

// Delete OptionValue by id
router.delete("/:id", (request, response) => { // middleware.isAuthenticated
  try {
    const id = request.params.id;
    OptionValue.findByIdAndDelete(id).then((optionValue) => {
      return response.status(200).json({
        success: true,
        message: "OptionValue deleted successfully",
        optionValue: optionValue,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
}
);


module.exports = router;
