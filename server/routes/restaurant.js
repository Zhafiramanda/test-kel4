const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
  restaurantHomepage,
  addRestaurantForm,
} = require("../controllers/restaurantController");

const router = express.Router();

// Routes
router.get("/restaurant", restaurantHomepage);
router.get("/add", addRestaurantForm);

// CREATE RESTAURANT || POST
router.post("/create", authMiddleware, createRestaurantController);

// GET ALL RESTAURANTS || GET
router.get("/getAll", getAllRestaurantController);

// GET RESTURANT BY ID || GET
router.get("/get/:id", getRestaurantByIdController);

// DELETE RESTURANT || DELETE
router.delete("/delete/:id", deleteRestaurantController);

module.exports = router;
