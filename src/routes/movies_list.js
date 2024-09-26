const express = require("express");
const knex = require("../db/connection");
const router = express.Router();

// GET /movies?is_showing=true
router.get("/movies", async (req, res, next) => {
  try {
    const { is_showing } = req.query;
    let query = knex("movies");

    if (is_showing === "true") {
      query = query
        .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
        .where({ "movies_theaters.is_showing": true })
        .distinct("movies.*");
    }

    const movies = await query;
    res.json({ data: movies });
  } catch (error) {
    next(error);
  }
});

module.exports = router;