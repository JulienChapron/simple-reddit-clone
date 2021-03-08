const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Subreddit = require("../models/Subreddit");
const Post = require("../models/Post");
const User = require("../models/User");

// @desc    Get videos
// @route   GET /api/v1/videos/public or /api/v1/videos/private
// @access  Public Or Private
exports.getPostsUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user)
    return next(
      new ErrorResponse(`No user with username of ${req.params.username}`, 404)
    );
  const posts = await Post.where("userId", user._id)
    .populate({ path: "userId", select: "avatarUrl username" })
    .populate({ path: "subreddits", select: "photoUrl"})
    .sort("-createdAt");
  if (!posts) {
    return next(
      new ErrorResponse(`No category with id of ${req.body.categoryId}`, 404)
    );
  }
  console.log(posts, "posts");
  res.status(200).json({ success: true, data: posts });
});

// @desc    Get videos
// @route   GET /api/v1/videos/public or /api/v1/videos/private
// @access  Public Or Private
exports.getPostsSubreddit = asyncHandler(async (req, res, next) => {
  const posts = await Post.where("subreddit", req.params.subreddit)
    .populate({ path: "userId", select: "avatarUrl username" })
    .sort("-createdAt");
  if (!posts) {
    return next(
      new ErrorResponse(`No category with id of ${req.body.categoryId}`, 404)
    );
  }
  res.status(200).json({ success: true, data: posts });
});

// @desc    add post
// @route   POST /api/v1/posts/
// @access  Private
exports.createPost = asyncHandler(async (req, res, next) => {
  const subreddit = await Subreddit.where("title", req.body.title);
  if (!subreddit) {
    return next(
      new ErrorResponse(`No subreddit with title of ${req.body.title}`, 404)
    );
  }
  const post = await Post.create({
    ...req.body,
    userId: req.user._id,
  });
  return res.status(200).json({ sucess: true, data: post });
});

// @desc    Get single post
// @route   GET /api/v1/videos/:id
// @access  Public
exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.where("title", req.body.title)
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
exports.putPost = asyncHandler(async (req, res, next) => {
  const post = await Video.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!post)
    return next(new ErrorResponse(`No post with that id of ${req.params.id}`));

  res.status(200).json({ success: true, data: post });
});

// @desc    Delete post
// @route   DELETE /api/v1/posts/:id
// @access  Private
exports.deletePost = asyncHandler(async (req, res, next) => {
  let post = await Video.where("title", req.body.title);

  if (!post) {
    return next(new ErrorResponse(`No post with id of ${req.params.id}`, 404));
  }
});
