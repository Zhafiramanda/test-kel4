const mongoose = require("mongoose");

//schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "user name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    usertype: {
      type: String,
      required: [true, "user type is required"],
      enum: ["admin", "staff", "manager"],
      default: "admin",
    },
    profile: {
      type: String,
      default:
        "https://www.366icons.com/media/01/profile-avatar-account-icon-16699.png",
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("User", userSchema);
