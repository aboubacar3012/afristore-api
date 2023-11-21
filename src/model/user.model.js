const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  store: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "stores",
      default: null,
    },
  ],
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  dateOfBirth: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "UNKNOWN",
    enum: ["MALE", "FEMALE", "UNKNOWN"],
  },
  avatar: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["ADMIN", "USER", "MERCHANT", "RIDER"],
    default: "USER",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  addresses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "addresses",
    required: true,
  }],
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
  updatedAt: {
    type: String,
    default: new Date().toISOString(),
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("users", userSchema);
