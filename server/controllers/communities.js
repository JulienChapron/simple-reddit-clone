const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const Community = require('../models/Community')

// @desc    Get categories
// @route   GET /api/v1/categories
// @access  Private/Admin
exports.getCommunities = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc    Get categories
// @route   GET /api/v1/categories
// @access  Private/Admin
exports.getCommunitiesByCategory = asyncHandler(async (req, res, next) => {
  const community = await Community.where('category', req.params.category)
  if (!community) {
    return next(
      new ErrorResponse(`No community with that category of ${req.params.category}`)
    )
  }
  res.status(200).json({ success: true, data: community })
})


// @desc    Get single category
// @route   GET /api/v1/categories/:id
// @access  Private/Admin
exports.getCommunity = asyncHandler(async (req, res, next) => {
  const community = await Community.findById(req.params.id)

  if (!community) {
    return next(
      new ErrorResponse(`No community with that id of ${req.params.id}`)
    )
  }

  res.status(200).json({ success: true, data: community })
})

// @desc    Create Category
// @route   POST /api/v1/categories/
// @access  Private/Admin
exports.createCommunity = asyncHandler(async (req, res, next) => {
  const community = await Community.create({
    ...req.body,
    userId: req.user.id
  })
  return res.status(200).json({ success: true, data: community })
})

// @desc    Update category
// @route   PUT /api/v1/categories
// @access  Private/Admin
exports.updateCommunity = asyncHandler(async (req, res, next) => {
  const community = await Community.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: 'query'
  })

  if (!community)
    return next(
      new ErrorResponse(`No community with that id of ${req.params.id}`)
    )

  res.status(200).json({ success: true, data: community })
})

// @desc    Delete Category
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
exports.deleteCommunity = asyncHandler(async (req, res, next) => {
  let community = await Community.findById(req.params.id)

  if (!community) {
    return next(
      new ErrorResponse(`No community with id of ${req.params.id}`, 404)
    )
  }

  await community.remove()

  return res.status(200).json({ success: true, community })
})