const express = require('express');
const router = express.Router();
const knex = require('../db/connection'); 

// DELETE /reviews/:reviewId - Delete a review by ID
router.delete("/reviews/:reviewId", async (req, res, next) => {
  const { reviewId } = req.params;

  try {
    // Check if the review exists
    const review = await knex("reviews").where({ review_id: reviewId }).first();

    if (!review) {
      return res.status(404).json({ error: "Review cannot be found." });
    }

    // Delete the review
    await knex("reviews").where({ review_id: reviewId }).del();

    res.status(204).end(); // 204 No Content
  } catch (error) {
    next(error);
  }
});

module.exports = router;

module.exports = router;