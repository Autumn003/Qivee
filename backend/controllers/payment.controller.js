import { asyncHandler } from "../utils/asyncHandler.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const processPyment = asyncHandler(async (req, res) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    description: "payment-discription",
    metadata: {
      company: "QIVEE",
    },
  });

  return res
    .status(201)
    .json({ success: true, client_secret: myPayment.client_secret });
});

const sendStripeApiKey = asyncHandler(async (req, res) => {
  return res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});

export { processPyment, sendStripeApiKey };
