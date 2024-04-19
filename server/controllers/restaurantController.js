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
    res.status(500).send({
      success: false,
      message: "Error fetching restaurants",
    });
  }
};

exports.addRestaurantForm = async (req, res) => {
  res.render("restaurant/add");
};

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

    // Validation
    if (!title || !location) {
      return res.status(400).send({
        success: false,
        message: "Title and location are required fields.",
      });
    }

    // Create restaurant
    const newRestaurant = new restaurantModel({
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
    });

    // Save the new restaurant to the database
    await newRestaurant.save();

    // Send success response
    res.status(201).send({
      success: true,
      message: "Restaurant created successfully.",
      restaurant: newRestaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error creating restaurant.",
    });
  }
};

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
      message: "Failed to fetch restaurant list.",
    });
  }
};

exports.getRestaurantByIdController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(400).send({
        success: false,
        message: "Restaurant ID not provided.",
      });
    }
    const restaurant = await restaurantModel.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant not found.",
      });
    }
    res.status(200).send({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching restaurant data.",
    });
  }
};

exports.deleteRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(400).send({
        success: false,
        message: "Restaurant ID not provided.",
      });
    }
    await restaurantModel.findByIdAndDelete(restaurantId);
    res.status(200).send({
      success: true,
      message: "Restaurant deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting restaurant.",
    });
  }
};
