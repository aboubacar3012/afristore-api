const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const middleware = require("./src/utils/middleware");
const cors = require("cors");
require("./src/model/dbConnection");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

const usersRouter = require("./src/routes/user.routes");
const authRouter = require("./src/routes/auth.routes");
const orderRouter = require("./src/routes/order.routes");
const productRouter = require("./src/routes/product.routes");
const categoryRouter = require("./src/routes/category.routes");
const paymentRouter = require("./src/routes/payment.routes");
const storeRouter = require("./src/routes/store.routes");
const storeCategoryRouter = require("./src/routes/storeCategory.routes");
const storeSpecialityRouter = require("./src/routes/storeSpeciality.routes");
const cartRouter = require("./src/routes/cart.routes");
const addressRouter = require("./src/routes/address.routes");
const optionValueRouter = require("./src/routes/optionValues.routes");
const optionsRouter = require("./src/routes/options.routes");
const uploadImageRouter = require("./src/routes/uploadImage.routes");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(middleware.errorHandler);
app.use(middleware.requestLogger);

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/orders", orderRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/stores", storeRouter);
app.use("/api/storeCategories", storeCategoryRouter);
app.use("/api/storeSpecialities", storeSpecialityRouter);
app.use("/api/cart", cartRouter);
app.use("/api/addresses", addressRouter);
app.use("/api/optionsValues", optionValueRouter);
app.use("/api/options", optionsRouter);
app.use("/api/upload", uploadImageRouter);

app.use(middleware.unknownEndpoint);
module.exports = app;
