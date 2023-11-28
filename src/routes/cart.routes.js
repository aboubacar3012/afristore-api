const express = require("express");
const router = express.Router();
const User = require("../model/user.model");
const Order = require("../model/order.model");
const Product = require("../model/product.model");
const middleware = require("../utils/middleware");

const getOptionsPrice = (options) => {
  let price = 0;
  options.forEach((option) => {
    option.values.forEach((value) => {
      price += value.price;
    })
  })
  return price;
}

// validate cart
router.post("/validateCart", middleware.isAuthenticated, async (req, res, next) => {
  const { products, userId, amount, deliveryCharge, totalAmount, takingOrder, timeToPickup } = req.body;
  const user = await User.findById(userId).populate("addresses");
  if (!user) {
    return res.status(404).json({ error: "User not found", status: 404 });
  }
  let productTotalAmount = 0;
  for (let i = 0; i < products.length; i++) {
    const product = await Product.findById(products[i].id);
    if (!product) {
      return res.status(404).json({ error: "Product not found", status: 404 });
    }
    const price = product.price + getOptionsPrice(products[i].options);
    productTotalAmount += price * products[i].quantity;
  }
  productTotalAmount = parseFloat(productTotalAmount.toFixed(2));

  console.log({ productTotalAmount, deliveryCharge, totalAmount })
  if (productTotalAmount + deliveryCharge !== totalAmount) {
    return res.status(400).json({
      success: false,
      error: "Le total ne correspond pas a ceux qui est attendu",
      status: 400,
    });
  }

  const newOrder = new Order({
    user: userId,
    takingOrder,
    timeToPickup,
    products: products,
    orderDate: new Date().toISOString(),
    paymentStatus: "PENDING",
    orderStatus: "PENDING",
    deliveryAddress: user?.addresses[0].id,
    totalAmount,
  });

  const savedOrder = await newOrder.save();

  return res.status(200).json({
    success: true,
    message: "Panier validé avec succès",
    data: savedOrder,
    status: 200,
  });
  // console.log(user);
  // next();
});

module.exports = router;
