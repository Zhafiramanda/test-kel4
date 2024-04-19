const mongoose = require("mongoose");

//schema
const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "category title is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://graphicsfamily.com/wp-content/uploads/edd/2021/06/Editable-Photoshop-Food-Logo-Design-PNG-Transparent-1536x1536.png",
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("Category", categorySchema);
