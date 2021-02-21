const express = require('express')
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users')

const User = require('../models/User')

const router = express.Router({ mergeParams: true })

const advancedResults = require('../middleware/advancedResults')
const { protect, authorize } = require('../middleware/auth')

router
  .route('/')
  .get(protect, advancedResults(User), getUsers)
  .post(protect, createUser)

router
  .route('/:username')
  .get(getUser)
  .put(protect,  updateUser)
  .delete(protect, deleteUser)

module.exports = router
