const express = require('express')
const router = express.Router()

const {
  signup,
  signin,
  logout,
  getMe,
 /*  forgotPassword,
  resetPassword,
  updateDetails,
  uploadChannelAvatar,
  updatePassword */
} = require('../controllers/auth')

const { protect } = require('../middleware/auth')

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/logout', logout)
router.get('/me', protect, getMe)
/* router.put('/updatedetails', protect, updateDetails)
router.put('/avatar', protect, uploadChannelAvatar)
router.put('/updatepassword', protect, updatePassword)
router.post('/forgotpassword', forgotPassword)
router.put('/resetpassword/:resettoken', resetPassword) */

module.exports = router