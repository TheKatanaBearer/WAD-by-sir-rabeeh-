const mongoose = require("mongoose");

const featureProductSchema = new mongoose.Schema({
  name: String,
  slug: String,        // NEW: unique id for URL
  image: String,
  description: String, // NEW: show details on product page
  price: Number,       // NEW: show price + buy button
  rating: String,
  isFeatured: Boolean
});

module.exports = mongoose.model("Featured", featureProductSchema);