const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

const Post = require("../models/Post");

// @desc    Get videos
// @route   GET /api/v1/videos/public or /api/v1/videos/private
// @access  Public Or Private
exports.getPosts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    add post
// @route   POST /api/v1/posts/
// @access  Private
exports.createPost = asyncHandler(async (req, res, next) => {
  let category = await Post.findOne({
    _id: req.body.categoryId,
    status: 'public'
  })

  if (!category) {
    return next(
      new ErrorResponse(`No category with id of ${req.body.categoryId}`, 404)
    )
  }
  const post = await Post.create({
    ...req.body,
    userId: req.user._id
  })

  return res.status(200).json({ sucess: true, data: post })
})

// @desc    Get single post
// @route   GET /api/v1/videos/:id
// @access  Public
exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id)
    .populate({
      path: "categoryId",
    })
    .populate({ path: "userId", select: "channelName subscribers photoUrl" })
    .populate({ path: "likes" })
    .populate({ path: "dislikes" })
    .populate({ path: "comments" });
  if (!video) {
    return next(new ErrorResponse(`No video with that id of ${req.params.id}`));
  }

  res.status(200).json({ sucess: true, data: post });
});


// @desc    Update post
// @route   PUT /api/v1/posts/:id
// @access  Private
exports.updatePost = asyncHandler(async (req, res, next) => {
  const post = await Video.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!post)
    return next(new ErrorResponse(`No video with that id of ${req.params.id}`));

  res.status(200).json({ success: true, data: post });
});

// @desc    Delete post
// @route   DELETE /api/v1/posts/:id
// @access  Private
exports.deleteVideo = asyncHandler(async (req, res, next) => {
  let post = await Video.findOne({ userId: req.user._id, _id: req.params.id });

  if (!post) {
    return next(new ErrorResponse(`No post with id of ${req.params.id}`, 404));
  }
});
