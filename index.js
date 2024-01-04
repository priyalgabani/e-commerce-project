const express = require("express");
const connect = require("./config/db");
const userRouter = require("./routes/user");
const cookies = require("cookie-parser");
const jwt = require("jsonwebtoken");
const productRoutes = require("./routes/product");

require("dotenv").config();
const app = express();
app.use(cookies());
app.use(express.json());


app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

app.use("/user", userRouter);
app.use("/product", productRoutes);

app.get("/", (req, res) => {
  res.redirect("/product/products");
});

app.listen(process.env.PORT, () => {
  connect();
  console.log(`listening on port ${process.env.PORT}`);
});
