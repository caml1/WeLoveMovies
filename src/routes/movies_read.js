const express = require("express");
const knex = require("../db/connection");
const router = express.Router();

// GET /movies/:movieId
router.get("/movies/:movieId", async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const movie = await knex("movies").where({ movie_id: movieId }).first();

    if (!movie) {
      return res.status(404).json({ error: "Movie cannot be found." });
    }

    res.json({ data: movie });
  } catch (error) {
    next(error);
  }
});

// GET /movies/:movieId/theaters
router.get("/movies/:movieId/theaters", async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const theaters = await knex("theaters")
      .join("movies_theaters", "theaters.theater_id", "movies_theaters.theater_id")
      .where({ "movies_theaters.movie_id": movieId })
      .select("theaters.*", "movies_theaters.is_showing");

    res.json({ data: theaters });
  } catch (error) {
    next(error);
  }
});

// GET /movies/:movieId/reviews
router.get("/movies/:movieId/reviews", async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const reviews = await knex("reviews")
      .join("critics", "reviews.critic_id", "critics.critic_id")
      .select(
        "reviews.*",
        "critics.critic_id as critic_critic_id",
        "critics.preferred_name",
        "critics.surname",
        "critics.organization_name",
        "critics.created_at as critic_created_at",
        "critics.updated_at as critic_updated_at"
      )
      .where({ "reviews.movie_id": movieId });

    const formattedReviews = reviews.map((review) => {
      return {
        ...review,
        critic: {
          critic_id: review.critic_critic_id,
          preferred_name: review.preferred_name,
          surname: review.surname,
          organization_name: review.organization_name,
          created_at: review.critic_created_at,
          updated_at: review.critic_updated_at,
        },
      };
    });

    res.json({ data: formattedReviews });
  } catch (error) {
    next(error);
  }
});

// GET /movies/:movieId/critics - Return 404
router.get("/movies/:movieId/critics", (req, res) => {
  res.status(404).json({ error: "This route is not available." });
});

module.exports = router;