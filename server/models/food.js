const mongoose = require("mongoose");

//schema
const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Food Title is require"],
    },
    description: {
      type: String,
      required: [true, " food description is requir"],
    },
    price: {
      type: Number,
      required: [true, "food price is require"],
    },
    imageUrl: {
      type: String,
      default:
        "https://graphicsfamily.com/wp-content/uploads/edd/2021/06/Editable-Photoshop-Food-Logo-Design-PNG-Transparent-1536x1536.png",
    },
    foodTags: {
      type: String,
    },
    catgeory: {
      type: String,
    },
    code: {
      type: String,
    },
    isAvailabe: {
      type: Boolean,
      default: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("Foods", foodSchema);
