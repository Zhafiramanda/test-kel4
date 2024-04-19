require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override");

// npm uninstall express-flash-message
//const { flash } = require('express-flash-message');

// npm install connect-flash
const flash = require("connect-flash");

const session = require("express-session");
const connectDB = require("./server/config/db");

const app = express();
const port = process.env.PORT || 5000;

// Connect to Database
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Static Files
app.use(express.static("public"));

// Express Session
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// Flash Messages
app.use(flash({ sessionKeyName: "flashMessage" }));

// Templating Engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Routes
app.use("/auth", require("./server/routes/auth"));
app.use("/users", require("./server/routes/user"));
app.use("/rest", require("./server/routes/restaurant"));
app.use("/foods", require("./server/routes/food"));
app.use("/cat", require("./server/routes/category"));

// Handle 404
app.get("*", (req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`App listeing on port ${port}`);
});
