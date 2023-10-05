const mongoose = require("mongoose");

const storeReviewsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "stores",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
});

storeReviewsSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("storeReviews", storeReviewsSchema);
