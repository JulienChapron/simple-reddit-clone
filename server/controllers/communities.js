const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Community = require("../models/Community");
const path = require('path')

// @desc    Get categories
// @route   GET /api/v1/categories
// @access  Private/Admin
exports.getCommunities = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get categories
// @route   GET /api/v1/categories
// @access  Private/Admin
exports.getCommunitiesByCategory = asyncHandler(async (req, res, next) => {
  const community = await Community.where("category", req.params.category);
  if (!community) {
    return next(
      new ErrorResponse(
        `No community with that category of ${req.params.category}`
      )
    );
  }
  res.status(200).json({ success: true, data: community });
});

// @desc    Get single category
// @route   GET /api/v1/categories/:id
// @access  Private/Admin
exports.getCommunity = asyncHandler(async (req, res, next) => {
  const community = await Community.where("subreddit", req.params.subreddit);
  if (!community) {
    return next(
      new ErrorResponse(`No community with that subreddit of ${req.params.subreddit}`)
    );
  }

  res.status(200).json({ success: true, data: community });
});

// @desc    Create Category
// @route   POST /api/v1/categories/
// @access  Private/Admin
exports.createCommunity = asyncHandler(async (req, res, next) => {
  if (/\s/g.test(req.body.subreddit)) {
    return next(
      new ErrorResponse(
        `White space is not authorized, please use : ${req.body.subreddit.replace(
          / /g,
          "_"
        )}`
      )
    );
  }
  const community = await Community.create({
    ...req.body,
    userId: req.user.id,
  });
  return res.status(200).json({ success: true, data: community });
});

// @desc    Update category
// @route   PUT /api/v1/categories
// @access  Private/Admin
exports.updateCommunity = asyncHandler(async (req, res, next) => {
  const community = await Community.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: "query",
  });

  if (!community)
    return next(
      new ErrorResponse(`No community with that id of ${req.params.id}`)
    );

  res.status(200).json({ success: true, data: community });
});

// @desc    Delete Category
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
exports.deleteCommunity = asyncHandler(async (req, res, next) => {
  let community = await Community.findById(req.params.id);

  if (!community) {
    return next(
      new ErrorResponse(`No community with id of ${req.params.id}`, 404)
    );
  }

  await community.remove();

  return res.status(200).json({ success: true, community });
});

// @desc    Thumbnails user
// @route   PUT /api/v1/auth/users/:username
// @access  Private/Admin
exports.uploadImage = asyncHandler(async (req, res, next) => {
  const community = await Community.findOne({ subreddit: req.params.subreddit });
  if (!community)
    return next(new ErrorResponse(`No community with subreddit of ${req.params.subreddit}`, 404))

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 404))
  }

  const file = req.files.image
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 404))
  }

  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${
          process.env.MAX_FILE_UPLOAD / 1000 / 1000
        }mb`,
        404
      )
    )
  }

  file.name = `photo-${community._id}${path.parse(file.name).ext}`

  file.mv(
    `${process.env.FILE_UPLOAD_PATH}/communities/photo/${file.name}`,
    async (err) => {
      if (err) {
        console.error(err)
        return next(new ErrorResponse(`Problem with file upload`, 500))
      }
      await Community.findByIdAndUpdate(community._id, { photoUrl: file.name })
      res.status(200).json({ success: true, data: file.name })
    }
  )
})
