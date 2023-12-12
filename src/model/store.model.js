const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  storeOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "addresses",
    required: false,
  },
  latitude: {
    type: String,
    required: false,
  },
  longitude: {
    type: String,
    required: false,
  },
  phoneNumbers: [
    {
      type: String
    },
  ],
  email: {
    type: String,
    required: false,
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
        enum: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
        required: false,
      },
      open: {
        type: String,
        required: false,
      },
      close: {
        type: String,
        required: false,
      },
      isActive: {
        type: Boolean,
        required: false,
        default: false,
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
    required: false,
    default: 0,
  },
  storeCategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "storeCategories",
    required: false,
  }],
  storeSpecialities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "storeSpecialities",
    required: false,
  }],
  storeReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviews",
      required: false,
    },
  ],
  isActive: {
    type: Boolean,
    required: true,
    default: false,
  },
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
