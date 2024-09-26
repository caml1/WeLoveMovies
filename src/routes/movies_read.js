const express = require("express");
const router = express.Router();
const knex = require("../db/connection"); // Your Knex connection setup

// GET /movies/:movieId - Get a single movie by ID
router.get("/movies/:movieId", async (req, res, next) => {
  const { movieId } = req.params;

  try {
    const movie = await knex("movies")
      .select(
        "movie_id as id",
        "title",
        "runtime_in_minutes",
        "rating",
        "description",
        "image_url"
      )
      .where({ movie_id: movieId })
      .first();

    if (!movie) {
      return res.status(404).json({ error: "Movie cannot be found." });
    }

    res.json({ data: movie });
  } catch (error) {
    next(error);
  }
});

// GET /movies/:movieId/theaters - Get theaters where the movie is playing
router.get("/movies/:movieId/theaters", async (req, res, next) => {
  const { movieId } = req.params;

  try {
    const theaters = await knex("theaters")
      .join(
        "movies_theaters",
        "theaters.theater_id",
        "movies_theaters.theater_id"
      )
      .select(
        "theaters.theater_id",
        "theaters.name",
        "theaters.address_line_1",
        "theaters.address_line_2",
        "theaters.city",
        "theaters.state",
        "theaters.zip",
        "movies_theaters.is_showing",
        "movies_theaters.movie_id"
      )
      .where({ "movies_theaters.movie_id": movieId })
      .andWhere({ "movies_theaters.is_showing": true });

    res.json({ data: theaters });
  } catch (error) {
    next(error);
  }
});

// GET /movies/:movieId/reviews - Get reviews for the movie with critic details
router.get("/movies/:movieId/reviews", async (req, res, next) => {
  const { movieId } = req.params;

  try {
    const reviews = await knex("reviews")
      .join("critics", "reviews.critic_id", "critics.critic_id")
      .select(
        "reviews.review_id",
        "reviews.content",
        "reviews.score",
        "reviews.created_at",
        "reviews.updated_at",
        "reviews.critic_id",
        "reviews.movie_id",
        knex.raw(
          "json_build_object('critic_id', critics.critic_id, 'preferred_name', critics.preferred_name, 'surname', critics.surname, 'organization_name', critics.organization_name, 'created_at', critics.created_at, 'updated_at', critics.updated_at) as critic"
        )
      )
      .where({ "reviews.movie_id": movieId });

    res.json({ data: reviews });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
