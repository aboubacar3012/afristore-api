const express = require("express");
const router = express.Router();
const User = require("../model/user.model");
const Order = require("../model/order.model");
const Product = require("../model/product.model");
const middleware = require("../utils/middleware");

// validate cart
router.post("/validateCart", middleware.isAuthenticated, async (req, res, next) => {
  const { products, userId, amount, deliveryCharge, totalAmount } = req.body;
  const user = await User.findById(userId).populate("address");
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  let productTotalAmount = 0;
  for (let i = 0; i < products.length; i++) {
    const product = await Product.findById(products[i].id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    productTotalAmount += product.price * products[i].quantity;
  }
  productTotalAmount = parseFloat(productTotalAmount.toFixed(2));

  console.log({ productTotalAmount, deliveryCharge, totalAmount })
  if (productTotalAmount + deliveryCharge !== totalAmount) {
    return res.status(400).json({
      success: false,
      error: "Le total ne correspond pas a ceux qui est attendu",
    });
  }

  const newOrder = new Order({
    user: userId,
    products: products,
    orderDate: new Date().toISOString(),
    paymentStatus: "PENDING",
    orderStatus: "PENDING",
    deliveryAddress: user?.address.id,
    totalAmount,
  });

  const savedOrder = await newOrder.save();

  return res.status(200).json({
    success: true,
    message: "Panier validé avec succès",
    data: savedOrder,
  });
  // console.log(user);
  // next();
});

module.exports = router;
