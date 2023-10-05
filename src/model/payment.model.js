const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orders",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["VISA", "MASTERCARD", "PAYPAL", "CASH", "APPLE_PAY", "GOOGLE_PAY"],
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["PENDING", "PAID", "CANCELLED"],
    required: true,
    default: "PENDING",
  },
  paymentDate: {
    type: String,
    required: true,
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

paymentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("payments", paymentSchema);
