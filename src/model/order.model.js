const mongoose = require("mongoose");
const ShortUniqueId = require("short-unique-id");
// @ts-ignore
const { randomUUID } = new ShortUniqueId({ length: 10 });

const orderSchema = new mongoose.Schema({
  takingOrder: {
    type: String,
    enum: ["DELIVERY", "PICKUP"],
    required: true,
  },
  timeToPickup: {
    now: {
      type: Boolean,
      required: true,
    },
    day: {
      type: String,
      default: null,
    },
    period: {
      type: String,
      default: null,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  products: [
    {
      type: Object,
      required: true,
      
    }
  ],
  orderNumber: {
    type: String,
    required: true,
    default: () => randomUUID(),
  },
  orderDate: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["PENDING", "PAID", "CANCELLED"],
    required: true,
    default: "PENDING",
  },
  orderStatus: {
    type: String,
    required: true,
    enum: ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"],
    default: "PENDING",
  },
  deliveryAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "addresses",
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

orderSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("orders", orderSchema);
