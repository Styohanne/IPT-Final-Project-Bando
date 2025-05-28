const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  photoUrl: String, // This will store the file path or URL
});

module.exports = mongoose.model("Dish", dishSchema);