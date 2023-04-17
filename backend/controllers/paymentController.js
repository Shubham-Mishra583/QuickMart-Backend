const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Stripe = require('stripe');
const stripe = Stripe('sk_test_51Mn35lSBm7QXy7QwAMcP9U5b9742gD3gn3PiTqIGFJVA1IgOUWdhI4yO0ZAfsvhw1l0xv5lcNx6O4vjITnroZOlD00xENlUKdX');

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "QuickMart",
    },
  });
  
  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
