const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
  categoryHomepage,

} = require("../controllers/categoryController");

const router = express.Router();

router.get("/category", categoryHomepage);
// router.get("/add", addRestaurantForm);

// CREATE CATEGORY: Endpoint untuk membuat kategori baru
router.post("/create", authMiddleware, createCatController);

// GET ALL CATEGORY: Endpoint untuk mendapatkan semua kategori
router.get("/getAll", getAllCatController);

// UPDATE CATEGORY: Endpoint untuk memperbarui kategori yang ada
router.put("/update/:id", authMiddleware, updateCatController);

// DELETE CATEGORY: Endpoint untuk menghapus kategori yang ada
router.delete("/delete/:id", authMiddleware, deleteCatController);

module.exports = router;
