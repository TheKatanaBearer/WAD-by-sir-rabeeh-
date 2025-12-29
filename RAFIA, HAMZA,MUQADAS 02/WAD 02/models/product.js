const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  slug: String,        // NEW: unique id for URL (e.g. "knife-handle")
  category: String,
  image: String,
  description: String,

  // NEW (optional but useful)
  price: Number
});

module.exports = mongoose.model("Product", productSchema);