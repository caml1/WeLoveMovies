const express = require("express");
const router = express.Router();
const knex = require("../db/connection");

// PUT /reviews/:reviewId - Update review by ID
router.put("/reviews/:reviewId", async (req, res, next) => {
  const { reviewId } = req.params;
  const data = req.body.data || {};  // Ensure data is always an object

  try {
    // Check if the review exists
    const review = await knex("reviews").where({ review_id: reviewId }).first();

    if (!review) {
      return res.status(404).json({ error: "Review cannot be found." });
    }

    // Create an updated review object, merging the existing review with new data
    const updatedReviewData = {
      ...review,
      ...data,
      review_id: review.review_id,
    };

    // Update the review in the database
    await knex("reviews").where({ review_id: reviewId }).update(updatedReviewData);

    // Fetch the updated review with critic information
    const updatedReviewWithCritic = await knex("reviews")
      .join("critics", "reviews.critic_id", "critics.critic_id")
      .select(
        "reviews.review_id",
        "reviews.content",
        "reviews.score",
        "reviews.created_at",
        "reviews.updated_at",
        "reviews.critic_id",
        "reviews.movie_id",
        "critics.critic_id as critic_critic_id",
        "critics.preferred_name",
        "critics.surname",
        "critics.organization_name",
        "critics.created_at as critic_created_at",
        "critics.updated_at as critic_updated_at"
      )
      .where({ "reviews.review_id": reviewId })
      .first();

    // Format the response to include critic data under the 'critic' key
    const responseData = {
      ...updatedReviewWithCritic,
      critic: {
        critic_id: updatedReviewWithCritic.critic_critic_id,
        preferred_name: updatedReviewWithCritic.preferred_name,
        surname: updatedReviewWithCritic.surname,
        organization_name: updatedReviewWithCritic.organization_name,
        created_at: updatedReviewWithCritic.critic_created_at,
        updated_at: updatedReviewWithCritic.critic_updated_at,
      },
    };

    // Remove critic fields from the root of the response object
    delete responseData.critic_critic_id;
    delete responseData.preferred_name;
    delete responseData.surname;
    delete responseData.organization_name;
    delete responseData.critic_created_at;
    delete responseData.critic_updated_at;

    res.json({ data: responseData });
  } catch (error) {
    next(error);
  }
});

module.exports = router;