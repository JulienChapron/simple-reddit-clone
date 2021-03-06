const express = require('express')
const {
  getCommentByPostId,
  createComment,
  updateComment,
  deleteComment
} = require('../controllers/comments')

const router = express.Router()

const { protect } = require('../middleware/auth')

router
  .route('/')
  .post(protect, createComment)

router.route('/:id').put(protect, updateComment).delete(protect, deleteComment)

router.route('/:postId/comments').get(getCommentByPostId)

module.exports = router