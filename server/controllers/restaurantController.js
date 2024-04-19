const restaurantModel = require("../models/restaurant");

exports.restaurantHomepage = async (req, res) => {
  const messages = await req.flash("info");

  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const restaurants = await restaurantModel
      .aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await restaurantModel.countDocuments({});

    res.render("restaurant/index", {
      restaurants,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.addRestaurantForm = async (req, res) => {
  res.render("restaurant/add");
};

// Create restaurant
exports.createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      rating,
      ratingCount,
      code,
      location,
    } = req.body;

    // validasi
    if (!title || !location) {
      return res.status(500).send({
        success: false,
        message: "Title and location are required fields.",
      });
    }

    // Proses pembuatan restoran.
    const newRestaurant = new restaurantModel({
      title: title,
      imageUrl: imageUrl,
      foods: foods,
      time: time,
      pickup: pickup,
      delivery: delivery,
      isOpen: isOpen,
      rating: rating,
      ratingCount: ratingCount,
      code: code,
      location: location,
    });

    // Simpan restoran yang baru dibuat ke dalam database
    await newRestaurant.save();

    // Mengirim respon berhasil
    res.status(200).send({
      success: true,
      message: "Restaurant created successfully.",
      restaurant: newRestaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating restaurant. Please try again later.",
    });
  }
};

// get all restaurant
exports.getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});
    if (!restaurants || restaurants.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Restaurant list not found.",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message:
        "Failed to fetch restaurant list. There was an error on the server.",
      error: error,
    });
  }
};

// get restaurant by id
exports.getRestaurantByIdController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Restaurant ID not provided.",
      });
    }
    // Temukan restoran
    const restaurant = await restaurantModel.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant not found.",
      });
    }

    // Render halaman view dengan data restoran
    res.render("restaurant/view", { restaurant });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching restaurant data by ID.",
      error: error,
    });
  }
};

//DELETE RESTRURNAT
exports.deleteRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "No Restaurant Found or Restaurant ID Not Provided",
      });
    }
    await restaurantModel.findByIdAndDelete(restaurantId);
    // Redirect ke halaman utama setelah penghapusan berhasil
    res.redirect("/rest/restaurant");
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete restaurant API",
      error,
    });
  }
};
