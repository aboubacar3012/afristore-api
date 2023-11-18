const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "addresses",
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  phoneNumbers: [
    {
      type: String,
      minlength: 10,
      maxlength: 12,
    },
  ],
  email: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    default: "",
  },
  storeStatus: {
    type: String,
    enum: ["OPEN", "CLOSED"],
    required: true,
    default: "CLOSED",
  },
  storeHours: [
    {
      day: {
        type: String,
        enum: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
        required: true,
      },
      open: {
        type: String,
        required: true,
      },
      close: {
        type: String,
        required: true,
      },
    },
  ],
  storeDescription: {
    type: String,
    default: "",
  },
  storeLogo: {
    type: String,
    default: "",
  },
  storeBanner: {
    type: String,
    default: "",
  },
  storeRating: {
    type: Number,
    required: true,
    default: 0,
  },
  storeCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "storeCategories",
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  storeReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviews",
    },
  ],
  storeProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  ],
  storeOrders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orders",
    },
  ],
  storePayments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "payments",
    },
  ],
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
  updatedAt: {
    type: String,
    default: new Date().toISOString(),
  },
});

storeSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("stores", storeSchema);
