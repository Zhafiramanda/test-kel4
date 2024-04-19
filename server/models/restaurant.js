const mongoose = require("mongoose");

// Skema
const restaurantSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Restaurant title is required"],
    },
    imageUrl: {
      type: String,
    },
    foods: { type: Array },
    time: {
      type: String,
    },
    pickup: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    ratingCount: { type: String },
    code: {
      type: String,
    },
    location: {
      id: { type: String },
      address: { type: String },
      postalCode: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
