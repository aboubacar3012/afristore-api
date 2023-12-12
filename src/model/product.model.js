const mongoose = require("mongoose");

/*
  Code produit
  Code: 0001
    Taille: S, M, L, XL, XXL, XXXL
    Couleur: BLACK, WHITE, RED, BLUE, GREEN, YELLOW
    Sexe: HOMME, FEMME, UNISEX
  Code: 0002
    Longueur: 1m, 2m, 3m, 4m, 5m, 6m
    Largeur: 1m, 2m, 3m, 4m, 5m, 6m
    Couleur: BLACK, WHITE, RED, BLUE, GREEN, YELLOW
  code: 0003
    Taille : S, M, L, XL, XXL, XXXL
  

*/



const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // code: {
  //   type: String,
  //   required: false,
  // },
  options: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "options",
      required: false,
    },
  ],
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
  ],
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "stores",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // quantity: {
  //   type: Number,
  //   required: false,
  //   default: 0,
  // },
  // size: {
  //   type: String,
  //   enum: ["S", "M", "L", "XL", "XXL", "XXXL"],
  //   required: false,
  // },
  // color: {
  //   type: String,
  //   enum: ["BLACK", "WHITE", "RED", "BLUE", "GREEN", "YELLOW"],
  //   required: false,
  // },
  // sex: {
  //   type: String,
  //   enum: ["MAN", "WOMAN", "UNISEX"],
  //   required: false,
  // },
  discount: {
    type: Number,
    required: true,
    default: 0, // 0% discount
  },
  stock: {
    type: Number,
    required: false,
    default: 0,
  },
  status: {
    type: String,
    enum: ["ACTIVE", "INACTIVE"],
    default: "ACTIVE",
  },
  images: [
    {
      type: String,
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

productSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("products", productSchema);
