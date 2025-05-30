const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  photoUrl: String, // This will store the file path or URL
  category: {
    type: String,
    enum: ["pizza", "appetizers", "pasta", "dessert"],
    required: true
  }
});

module.exports = mongoose.model("Dish", dishSchema);