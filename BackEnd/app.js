const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const expressValidator = require("express-validator");
const mongoose = require("mongoose");

//MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB Connected");
  });

//Getting all the Routes
const productRoutes = require("./Routes/productRoutes");
const authRoutes = require("./Routes/authRoutes");
const userRoutes = require("./Routes/userRoutes");
const categoryRoutes = require("./Routes/categoryRoutes");

const app = express();

//Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
//Routes
app.use("/products", productRoutes);
app.use("/category", categoryRoutes);
app.use("/user", authRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server Started on Port Number ${PORT}`);
});
