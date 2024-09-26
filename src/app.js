if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json()); // This parses incoming requests with JSON payloads

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

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(404).json({ error: "An unexpected error occurred." });
});


// Use Routes with Base Paths
// app.use("/movies", moviesListRouter);
// app.use("/movies", moviesReadRouter);
// app.use("/reviews", reviewsDestroyRouter);
// app.use("/reviews", reviewsUpdateRouter);
// app.use("/theaters", theatersListRouter);

// 404 Not Found handler for unmatched routes
app.use((req, res, next) => {
    res.status(404).json({ error: "Not found" });
});

// General Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "An unexpected error occurred." });
});

module.exports = app;