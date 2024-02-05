import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import path from "path";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// routes import
import product from "./routes/product.routes.js";
import user from "./routes/user.routes.js";

// routes declaration
app.use("/api/v1/", product);
app.use("/api/v1/", user);

export { app };
