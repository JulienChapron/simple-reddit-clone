const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Subreddit = require("../models/Subreddit");
const path = require('path')

// @desc    Get categories
// @route   GET /api/v1/categories
// @access  Private/Admin
exports.getSubreddits = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get categories
// @route   GET /api/v1/categories
// @access  Private/Admin
exports.getSubredditsByCategory = asyncHandler(async (req, res, next) => {
  const subreddit = await Subreddit.where("category", req.params.category);
  if (!subreddit) {
    return next(
      new ErrorResponse(
        `No subreddit with that category of ${req.params.category}`
      )
    );
  }
  res.status(200).json({ success: true, data: subreddit });
});

// @desc    Get single category
// @route   GET /api/v1/categories/:id
// @access  Private/Admin
exports.getSubreddit = asyncHandler(async (req, res, next) => {
  const subreddit = await Subreddit.where("subreddit", req.params.subreddit);
  if (!subreddit) {
    return next(
      new ErrorResponse(`No subreddit with that subreddit of ${req.params.subreddit}`)
    );
  }

  res.status(200).json({ success: true, data: subreddit });
});

// @desc    Create Category
// @route   POST /api/v1/categories/
// @access  Private/Admin
exports.createSubreddit = asyncHandler(async (req, res, next) => {
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
  const subreddit = await Subreddit.create({
    ...req.body,
    userId: req.user.id,
  });
  return res.status(200).json({ success: true, data: subreddit });
});

// @desc    Update category
// @route   PUT /api/v1/categories
// @access  Private/Admin
exports.updateSubreddit = asyncHandler(async (req, res, next) => {
  const subreddit = await Subreddit.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: "query",
  });

  if (!subreddit)
    return next(
      new ErrorResponse(`No subreddit with that id of ${req.params.id}`)
    );

  res.status(200).json({ success: true, data: subreddit });
});

// @desc    Delete Category
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
exports.deleteSubreddit = asyncHandler(async (req, res, next) => {
  let subreddit = await Subreddit.findById(req.params.id);

  if (!subreddit) {
    return next(
      new ErrorResponse(`No subreddit with id of ${req.params.id}`, 404)
    );
  }

  await subreddit.remove();

  return res.status(200).json({ success: true, subreddit });
});

// @desc    Thumbnails user
// @route   PUT /api/v1/auth/users/:username
// @access  Private/Admin
exports.uploadImage = asyncHandler(async (req, res, next) => {
  const subreddit = await Subreddit.findOne({ subreddit: req.params.subreddit });
  if (!subreddit)
    return next(new ErrorResponse(`No subreddit with subreddit of ${req.params.subreddit}`, 404))

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

  file.name = `photo-${subreddit._id}${path.parse(file.name).ext}`

  file.mv(
    `${process.env.FILE_UPLOAD_PATH}/subreddits/avatar/${file.name}`,
    async (err) => {
      if (err) {
        console.error(err)
        return next(new ErrorResponse(`Problem with file upload`, 500))
      }
      await Subreddit.findByIdAndUpdate(subreddit._id, { avatarUrl: file.name })
      res.status(200).json({ success: true, data: file.name })
    }
  )
})

// @desc    Thumbnails user
// @route   PUT /api/v1/auth/users/:username
// @access  Private/Admin
exports.uploadBackground = asyncHandler(async (req, res, next) => {
  const subreddit = await Subreddit.findOne({ subreddit: req.params.subreddit });
  if (!subreddit)
    return next(new ErrorResponse(`No subreddit with subreddit of ${req.params.subreddit}`, 404))

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

  file.name = `photo-${subreddit._id}${path.parse(file.name).ext}`

  file.mv(
    `${process.env.FILE_UPLOAD_PATH}/subreddits/background/${file.name}`,
    async (err) => {
      if (err) {
        console.error(err)
        return next(new ErrorResponse(`Problem with file upload`, 500))
      }
      await Subreddit.findByIdAndUpdate(subreddit._id, { backgroundUrl: file.name })
      res.status(200).json({ success: true, data: file.name })
    }
  )
})

