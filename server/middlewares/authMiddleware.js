const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // Periksa apakah header "authorization" ada
    if (!req.headers["authorization"]) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized User: Missing Authorization Header",
      });
    }

    // Ambil token dari header "authorization"
    const token = req.headers["authorization"].split(" ")[1];

    // Verifikasi token
    const decode = await JWT.verify(token, process.env.JWT_SECRET);
    req.body.id = decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Please provide Auth Token",
      error,
    });
  }
};
