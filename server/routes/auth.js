const express = require("express");
const router = express.Router();

// Import controllers for login, register, and logout
const { registerController, loginController, logoutController} = require("../controllers/authController");

// Routes for login and register
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/logout", logoutController);

module.exports = router;
