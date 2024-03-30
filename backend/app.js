import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// routes import
import product from "./routes/product.routes.js";
import user from "./routes/user.routes.js";
import order from "./routes/order.routes.js";
import payment from "./routes/payment.routes.js";

// routes declaration
app.use("/api/v1/", product);
app.use("/api/v1/", user);
app.use("/api/v1/", order);
app.use("/api/v1/", payment);

export { app };
