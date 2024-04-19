const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.id);
    if (user.usertype !== "admin" && user.usertype !== "staff") {
      return res.status(401).send({
        success: false,
        message: "You do not have permission to access this resource.",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unauthorized Access",
      error,
    });
  }
};
