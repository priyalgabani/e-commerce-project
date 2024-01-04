const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  des: String,
  img: String,
  price: Number,
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

let product = mongoose.model("Product", productSchema);

module.exports = product;  
