const express = require("express");
const {
  getSubreddits,
  getSubredditsByCategory,
  getSubreddit,
  uploadImage,
  createSubreddit,
  updateSubreddit,
  deleteSubreddit,
} = require("../controllers/subreddits");

const Subreddit = require("../models/Subreddit");

const router = express.Router();

const advancedResults = require("../middleware/advancedResults");
const { protect } = require("../middleware/auth");

//router.use(protect)
router
  .route("/")
  .get(advancedResults(Subreddit), getSubreddits)
  .post(protect, createSubreddit);

router.route('/:subreddit/image').post( uploadImage)

router
  .route("/:subreddit")
  .get(getSubreddit)
  .put(updateSubreddit)
  .delete(deleteSubreddit);


router.route("/category/:category").get(getSubredditsByCategory);

module.exports = router;
