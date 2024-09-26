const express = require("express");
const router = express.Router();
const knex = require("../db/connection"); 
const reduceProperties = require("../utils/reduce-properties");

// Define how movies should be grouped under the 'movies' key for each theater
const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  created_at: ["movies", null, "created_at"],
  updated_at: ["movies", null, "updated_at"],
  is_showing: ["movies", null, "is_showing"],
  theater_id: ["movies", null, "theater_id"],
});

// GET /theaters - Get all theaters with movies playing at each theater
router.get("/theaters", async (req, res, next) => {
  try {
    // Join the theaters and movies_theaters tables
    const data = await knex("theaters")
      .join("movies_theaters", "theaters.theater_id", "movies_theaters.theater_id")
      .join("movies", "movies_theaters.movie_id", "movies.movie_id")
      .select(
        "theaters.theater_id",
        "theaters.name",
        "theaters.address_line_1",
        "theaters.address_line_2",
        "theaters.city",
        "theaters.state",
        "theaters.zip",
        "theaters.created_at",
        "theaters.updated_at",
        "movies.movie_id",
        "movies.title",
        "movies.runtime_in_minutes",
        "movies.rating",
        "movies.description",
        "movies.image_url",
        "movies.created_at as movie_created_at",
        "movies.updated_at as movie_updated_at",
        "movies_theaters.is_showing"
      );

    // Use reduceProperties to group movies under their corresponding theater
    const theatersWithMovies = reduceMovies(data);

    // Respond with the data in the required format
    res.json({ data: theatersWithMovies });
  } catch (error) {
    next(error); // Handle any errors
  }
});

module.exports = router;