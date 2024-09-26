const express = require('express');
const router = express.Router();
const knex = require('../db/connection'); // Assuming you have a connection setup with Knex

// GET /movies
router.get('/movies', async (req, res, next) => {
  try {
    const { is_showing } = req.query;

    let query = knex('movies')
      .select('movies.movie_id as id', 'movies.title', 'movies.runtime_in_minutes', 'movies.rating', 'movies.description', 'movies.image_url');

    // If `is_showing=true`, join the movies_theaters table and filter for currently showing movies
    if (is_showing === 'true') {
      query = query
        .join('movies_theaters', 'movies.movie_id', 'movies_theaters.movie_id')
        .where('movies_theaters.is_showing', true);
    }

    const movies = await query;
    res.json({ data: movies });
  } catch (error) {
    next(error); // Handle any errors by passing to the error handler middleware
  }
});

module.exports = router;