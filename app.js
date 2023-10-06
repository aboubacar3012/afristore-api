const express = require("express");
const path = require("path");
// const cookieParser = require("cookie-parser");
const logger = require("morgan");
const middleware = require("./src/utils/middleware");
const cors = require("cors");
require("./src/model/dbConnection");
require("dotenv").config();
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

const app = express();

// app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(
  session({
    genid: (req) => {
      return uuidv4(); // use UUIDs for session IDs
    },
    secret: "my_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      // secure: false, //process.env.NODE_ENV === "production" ? true : false, // Si true, le cookie ne sera envoyé que sur HTTPS
      maxAge: 24 * 60 * 60 * 1000, // Durée de vie du cookie en millisecondes (ici, 24 heures)
      // httpOnly: true, //process.env.NODE_ENV === "production" ? true : false, // Le cookie ne peut pas être accédé via JavaScript
      // sameSite: "none", //process.env.NODE_ENV === "production" ? "strict" : "lax", // 'Strict', 'Lax', 'None', ou true (équivalent à 'Strict')
    },
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(middleware.errorHandler);
app.use(middleware.requestLogger);

// app.use(middleware.isAuthenticated);

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/orders", orderRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/stores", storeRouter);
app.use("/api/storeCategories", storeCategoryRouter);

app.use(middleware.unknownEndpoint);
module.exports = app;
