const express = require("express");
const router = express.Router();
const Payment = require("../model/payment.model");
const middleware = require("../utils/middleware");

// @ts-ignore
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateCartAmount = (cart) => {
  let amount = 0;
  cart.products.map((product) => {
    product.quantity && (amount += product.price * product.quantity);
  });
  // return amount + cart.deliveryCharge;
  return 100;
};

// Handler pour la route /api/payment-intent
router.post('/create-payment-intent', async (req, res) => {
  const { cart } = req.body;

  try {
    const amount = calculateCartAmount(cart);

    // @ts-ignore
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// note used

// Create Payment
router.post("/", middleware.isAuthenticated, (request, response) => {
  try {
    const body = request.body;
    const newPayment = new Payment({
      ...body,
    });
    newPayment.save().then((payment) => {
      return response.status(201).json({
        success: true,
        message: "Payment created successfully",
        payment: payment,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Get all Payments
router.get("/", middleware.isAuthenticated, (request, response) => {
  try {
    Payment.find().then((payments) => {
      return response.status(200).json({ success: true, payments: payments });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Get Payment by Id
router.get("/:id", middleware.isAuthenticated, (request, response) => {
  try {
    const id = request.params.id;
    Payment.findById(id).then((payment) => {
      return response.status(200).json({ success: true, payment: payment });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Update Payment
router.put("/:id", middleware.isAuthenticated, (request, response) => {
  try {
    const id = request.params.id;
    const body = request.body;
    Payment.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      { new: true }
    ).then((payment) => {
      return response.status(200).json({
        success: true,
        message: "Payment updated successfully",
        payment: payment,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Delete Payment
router.delete("/:id", middleware.isAuthenticated, (request, response) => {
  try {
    const id = request.params.id;
    Payment.findByIdAndDelete(id).then((payment) => {
      return response.status(200).json({
        success: true,
        message: "Payment deleted successfully",
        payment: payment,
      });
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

module.exports = router;
