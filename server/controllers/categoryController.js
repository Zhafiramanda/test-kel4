const categoryModel = require("../models/category");

exports.categoryHomepage = async (req, res) => {
  const messages = await req.flash("info");

  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const categories = await categoryModel
      .aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await categoryModel.countDocuments({});

    res.render("category/index", {
      categories,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });
  } catch (error) {
    console.log(error);
  }
};

// exports.addRestaurantForm = async (req, res) => {
//   res.render("restaurant/add");
// };

exports.createCatController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    // Validasi input
    if (!title) {
      return res.status(400).send({
        success: false,
        message: "Title or imageUrl are required fields",
      });
    }

    // Proses pembuatan kategori
    const newCategory = new category({ title, imageUrl });
    await newCategory.save();
    res.status(201).send({
      success: true,
      message: "Category created successfully",
      newCategory,
    });
  } catch (error) {
    // Tangani error
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create cat api",
      error: error.message,
    });
  }
};

exports.getAllCatController = async (req, res) => {
  try {
    const categories = await category.find({});
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "There are no categories found.",
      });
    }
    res.status(200).send({
      success: true,
      totalCat: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in get All Categpry API",
      error,
    });
  }
};

exports.updateCatController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    const updatedCategory = await category.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(500).send({
        success: false,
        message: "No category was found.",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in update cat api",
      error,
    });
  }
};

exports.deleteCatController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "Please provide the ID of the category.",
      });
    }
    const category = await category.findById(id);
    if (!category) {
      return res.status(500).send({
        success: false,
        message: "No category was found with this ID.",
      });
    }
    await category.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "The category was deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in Dlete Cat APi",
      error,
    });
  }
};
