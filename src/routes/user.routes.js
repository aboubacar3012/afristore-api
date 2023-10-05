const express = require("express");
const router = express.Router();
const User = require("../model/user.model");
const mongoose = require("mongoose");

// get user by ID
router.get("/:id", (request, response) => {
  try {
    const userId = request.params.id;
    // verifier si l'id est valid
    if (!mongoose.isValidObjectId(userId))
      return response
        .status(200)
        .json({ success: false, message: "id is not valid" });

    User.findById(userId).then((users) => {
      if (users) return response.status(200).json(users);
      else
        return response
          .status(200)
          .json({ success: false, message: "user not found" });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// get all users
router.get("/", (request, response) => {
  try {
    User.find().then((users) => {
      if (users.length > 0)
        return response.status(200).json({ success: true, users });
      else
        return response
          .status(200)
          .json({ success: false, message: "il ya aucun utilisateur" });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

router.delete("/:id", (request, response) => {
  try {
    const userId = request.params.id;
    // verifier si l'id est valid
    if (!mongoose.isValidObjectId(userId))
      return response
        .status(200)
        .json({ success: false, message: "id is not valid" });

    User.findByIdAndRemove(userId).then((deletedUser) => {
      if (deletedUser)
        return response
          .status(200)
          .json({ success: true, message: "user deleted successfully" });
      else
        return response
          .status(200)
          .json({ success: false, message: "user not found" });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// permet de mettre ajour un utilisateur par son id
router.put("/:id", (request, response) => {
  try {
    const userId = request.params.id;
    // verifier si l'id est valid
    if (!mongoose.isValidObjectId(userId))
      return response.status(200).json({
        success: false,
        message: "l'ID de cet utilisateur n'existe pas",
      });

    User.findByIdAndUpdate(userId, { ...request.body }, { new: true }).then(
      (updated) => {
        if (updated)
          return response.status(200).json({
            success: true,
            message: "Mise a jour reussie avec success",
          });
        else
          return response
            .status(200)
            .json({ success: false, message: "Utilisateur non trouvé" });
      }
    );
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

module.exports = router;
