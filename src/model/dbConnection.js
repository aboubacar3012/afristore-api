const mongoose = require("mongoose");
const config = require("../utils/config");
mongoose
  // @ts-ignore
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("✅ Afristore Database connected successfully ✨✨");
  })
  .catch((error) => {
    console.log("❌Afristore Database is not connected❌", error);
  });
