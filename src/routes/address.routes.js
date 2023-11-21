const express = require("express");
const router = express.Router();
const Address = require("../model/address.model");
const User = require("../model/user.model");
const middleware = require("../utils/middleware");

// Create Address
router.post("/", middleware.isAuthenticated, (request, response) => {
  try {
    const body = request.body;
    const newAddress = new Address({
      ...body,
    });
    newAddress.save().then((address) => {
      const userId = body.userId;
      User.findById(userId).then((user) => {
        if (user) {
          if (user.addresses.length === 0) {
            address.isDefault = true;
          }
          user.addresses.push(address._id);
          // populate user with addresses
          return user.save().then(() => {
            User.findById(userId)
              .populate("addresses")
              .then((user) => {
                return response.status(201).json({
                  success: true,
                  message: "Adresse ajoutée avec succès",
                  address: address,
                  user: user,
                });
              });
          }).catch((error) => {
            return response.status(200).json({
              success: false,
              message: "Erreur lors de la création de l'adresse",
              error: error.message,
            });
          });
        }
        return response.status(200).json({
          success: false,
          message: "Utilisateur introuvable",
          code: 401,
        });
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

// Update Address
router.put("/:id", middleware.isAuthenticated, (request, response) => {
  try {
    const id = request.params.id;
    const body = request.body;
    Address.findByIdAndUpdate(id, body).then((address) => {
      const userId = body.userId;
      User.findById(userId).then((user) => {
        if (user) {
          return user.save().then(() => {
            User.findById(userId)
              .populate("addresses")
              .then((user) => {
                return response.status(200).json({
                  success: true,
                  message: "Adresse modifiée avec succès",
                  address: address,
                  user: user,
                });
              });
          }).catch((error) => {
            return response.status(200).json({
              success: false,
              message: "Erreur lors de la modification de l'adresse",
              error: error.message,
            });
          });
        }
        return response.status(200).json({
          success: false,
          message: "Utilisateur introuvable",
          code: 401,
        });
      });
    });
      

  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});


module.exports = router;
