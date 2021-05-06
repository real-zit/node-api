const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const morgan = require("morgan");

const mongoose = require("mongoose");
const url =
  "mongodb+srv://nodejs:nodejs@123@cluster0.gs9cj.mongodb.net/shop?retryWrites=true&w=majority";

const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/order");
const userRoutes = require("./routes/user");

app.use(morgan("dev"));

app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => console.log("Connected to db"))
  .catch((err) => console.log(err));

// cors header
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH");
    return res.status(200).json({});
  }
  next();
});

// Routes
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);

// Error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(port, console.log("Listening to Port 3000"));
