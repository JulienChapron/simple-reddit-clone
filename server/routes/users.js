const express = require("express");
const {
  getUser,
  updateUser,
  deleteUser,
  uploadAvatar,
  uploadBackground,
  getSubscribeSubreddit,
  postSubscribeSubreddit,
  deleteSubscribeSubreddit,
} = require("../controllers/users");

const router = express.Router({ mergeParams: true });

const { protect } = require("../middleware/auth");

router
  .route("/:username")
  .get(getUser)
  .put(protect, updateUser)
  .delete(protect, deleteUser);

router
  .route("/:username/subscribeSubreddit")
  .get(protect, getSubscribeSubreddit)
  .post(protect, postSubscribeSubreddit)
  .delete(protect, deleteSubscribeSubreddit);

router.route("/:username/avatar").post(protect, uploadAvatar);
router.route("/:username/background").post(protect, uploadBackground);

module.exports = router;
