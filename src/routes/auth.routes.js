const express = require("express");
const router = express.Router();
const User = require("../model/user.model");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

// Registration
router.post("/signup", (request, response) => {
  try {
    const body = request.body;
    // check if user exist
    User.findOne({ email: body.email }).then((user) => {
      // if exist return error message
      if (user) {
        return response.status(200).json({
          success: false,
          error: "Cet utilisateur exist deja, veillez vous connecter",
        });
      }

      // if not exist create new user
      else {
        const hashedPassword = bcrypt.hashSync(body.password, saltRounds);
        body.password = hashedPassword;
        const newUser = new User({
          ...body,
        });
        newUser.save().then((user) => {
          return response.status(201).json({
            success: true,
            message: "Inscription reussie avec success",
            user: user,
          });
        });
      }
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Login
router.post("/signin", (request, response) => {
  try {
    const { email, password } = request.body;
    // check if user exist
    User.findOne({ email: email }).then((user) => {
      // if exist return user
      if (user && bcrypt.compareSync(password, user.password)) {
        // @ts-ignore
        delete user.password;
        return response.status(200).json({ success: true, user: user });
      }
      // if not exist create new user
      else {
        return response.status(200).json({
          success: false,
          message: "votre email ou mot de passe est incorrect",
        });
      }
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Reset Password
// router.post("/resetpwd", (request, response) => {
//   try {
//     const { email, password, dateOfBirth } = request.body;
//     // check if user exist
//     User.findOne({ email: email, dateOfBirth: dateOfBirth }).then((user) => {
//       // if exist return user
//       if (user) {
//         const hashedPassword = bcrypt.hashSync(password, saltRounds);
//         user.password = hashedPassword;
//         user.save().then(() => {
//           return response.status(200).json({
//             success: true,
//             message: "modification reussie avec success",
//           });
//         });
//       }
//       // if not exist create new user
//       else {
//         return response.status(200).json({
//           success: false,
//           error: "votre adresse mail ou date de naissance est incorrect",
//         });
//       }
//     });
//   } catch (e) {
//     return response.status(200).json({ success: false, error: e.message });
//   }
// });

module.exports = router;
