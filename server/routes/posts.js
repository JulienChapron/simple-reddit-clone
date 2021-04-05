const express = require("express");
const {
  getPostsSubreddit,
  getPostsUser,
  getPost,
  createPost,
  createPostMedias,
  getPostsFilteredByNew,
  putPost,
  deletePost,
} = require("../controllers/posts");

const router = express.Router();
const advancedResults = require("../middleware/advancedResults");
const { protect } = require("../middleware/auth");

router.post("/", protect, createPost);
router.post("/medias", protect, createPostMedias);
router.get("/new", getPostsFilteredByNew);
router.route("/user/:username").get(getPostsUser);
router.route("/subreddit/:subreddit").get(getPostsSubreddit);
router
  .route("/:id")
  .get(getPost)
  .put(protect, putPost)
  .delete(protect, deletePost);
/* router.route('/private').get(
  protect,
  advancedResults(
    Post,
    [
      { path: 'userId' },
      { path: 'categoryId' },
      { path: 'likes' },
      { path: 'dislikes' },
      { path: 'comments' }
    ],
    {
      status: 'private'
    }
  ),
  getPosts
) */

/* router
  .route('/public')
  .get(
    advancedResults(
      Post,
      [
        { path: 'userId' },
        { path: 'categoryId' },
        { path: 'likes' },
        { path: 'dislikes' }
      ],
      { status: 'public' }
    ),
    getPosts
  )
*/

module.exports = router;
