import { Router } from "express";
import {
  processPyment,
  sendStripeApiKey,
} from "../controllers/payment.controller.js";

import { isAuthenticatedUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/payment/process").post(isAuthenticatedUser, processPyment);

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

export default router;
