const express = require('express');
const router = express.Router();
const knex = require('../db/connection'); // Your Knex connection setup

// DELETE /reviews/:reviewId - Delete a review by ID
router.delete('/reviews/:reviewId', async (req, res, next) => {
  const { reviewId } = req.params;

  try {
    const deletedRows = await knex('reviews')
      .where({ review_id: reviewId })
      .del();

    if (deletedRows === 0) {
      return res.status(404).json({ error: "Review cannot be found." });
    }

    res.status(204).end(); // No content on success
  } catch (error) {
    next(error);
  }
});

module.exports = router;