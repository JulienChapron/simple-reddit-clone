const express = require('express')
const {
  getPosts,
  getPost,
  createPost,
  putPost,
  deletePost
} = require('../controllers/posts')

const Post = require('../models/Post')

const router = express.Router()

const advancedResults = require('../middleware/advancedResults')
const { protect } = require('../middleware/auth')

router.post('/', protect, createPost)

router.route('/private').get(
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
)

router
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

router
  .route('/:id')
  .get(getPost)
  /* .put(protect, putPost)
  .delete(protect, deletePost) */

module.exports = router
