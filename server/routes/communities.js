const express = require("express");
const {
  getCommunities,
  getCommunitiesByCategory,
  getCommunity,
  uploadImage,
  createCommunity,
  updateCommunity,
  deleteCommunity,
} = require("../controllers/communities");

const Community = require("../models/Community");

const router = express.Router();

const advancedResults = require("../middleware/advancedResults");
const { protect } = require("../middleware/auth");

//router.use(protect)
router
  .route("/")
  .get(advancedResults(Community), getCommunities)
  .post(protect, createCommunity);

router.route('/:subreddit/image').post( uploadImage)

router
  .route("/:subreddit")
  .get(getCommunity)
  .put(updateCommunity)
  .delete(deleteCommunity);


router.route("/category/:category").get(getCommunitiesByCategory);

module.exports = router;
