if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

// Importing Routes
const moviesListRouter = require("./routes/movies_list");
const moviesReadRouter = require("./routes/movies_read");
const reviewsDestroyRouter = require("./routes/reviews_destroy");
const reviewsUpdateRouter = require("./routes/reviews_update");
const theatersListRouter = require("./routes/theaters_list");

//Use Routes
app.use(moviesListRouter);
app.use(moviesReadRouter);
app.use(reviewsDestroyRouter);
app.use(reviewsUpdateRouter);
app.use(theatersListRouter);

module.exports = app;
