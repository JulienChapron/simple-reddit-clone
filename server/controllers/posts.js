const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Subreddit = require("../models/Subreddit");
const Post = require("../models/Post");
const User = require("../models/User");
const path = require("path");

// @desc    Get videos
// @route   GET /api/v1/videos/public or /api/v1/videos/private
// @access  Public Or Private
exports.getPostsFilteredByNew = asyncHandler(async (req, res, next) => {
  const posts = await Post.find()
    .populate({ path: "comments", select: "id" })
    .populate({ path: "userId", select: "avatarUrl username" })
    .sort("-createdAt");
  res.status(200).json({ success: true, data: posts });
});

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
    .populate({ path: "subreddits", select: "avatarUrl" })
    .populate({ path: "comments", select: "id" })
    .sort("-createdAt");
  if (!posts) {
    return next(
      new ErrorResponse(`No category with id of ${req.body.categoryId}`, 404)
    );
  }
  res.status(200).json({ success: true, data: posts });
});

// @desc    Get videos
// @route   GET /api/v1/videos/public or /api/v1/videos/private
// @access  Public Or Private
exports.getPostsSubreddit = asyncHandler(async (req, res, next) => {
  const posts = await Post.where("subreddit", req.params.subreddit)
    .populate({ path: "userId", select: "avatarUrl username" })
    .populate({ path: "comments", select: "id" })
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

// @desc    add post
// @route   POST /api/v1/posts/
// @access  Private
exports.createPostMedias = asyncHandler(async (req, res, next) => {
  const post = await Post.create({
    ...req.body,
    userId: req.user._id,
  });
  const subreddit = await Subreddit.where("title", req.body.title);
  if (!subreddit) {
    return next(
      new ErrorResponse(`No subreddit with title of ${req.body.title}`, 404)
    );
  }
  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 404));
  }
  const file = req.files.image;
  if (
    !file.mimetype.startsWith("image") &&
    !file.mimetype.startsWith("video")
  ) {
    return next(new ErrorResponse(`Please upload a file`, 404));
  }
  if (file.mimetype.startsWith("video")) {
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload an image less than ${
            process.env.MAX_FILE_UPLOAD / 100 / 100
          }mb`,
          404
        )
      );
    }
    file.name = `video-${post._id}${path.parse(file.name).ext}`;

    file.mv(
      `${process.env.FILE_UPLOAD_PATH}/posts/videos/${file.name}`,
      async (err) => {
        if (err) {
          console.error(err);
          return next(new ErrorResponse(`Problem with file upload`, 500));
        }
        await Post.findByIdAndUpdate(post._id, { videoUrl: file.name });
      }
    );
    return res.status(200).json({ sucess: true, data: post });
  } else if (file.mimetype.startsWith("image")) {
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload an image less than ${
            process.env.MAX_FILE_UPLOAD / 1000 / 1000
          }mb`,
          404
        )
      );
    }
    file.name = `image-${post._id}${path.parse(file.name).ext}`;

    file.mv(
      `${process.env.FILE_UPLOAD_PATH}/posts/images/${file.name}`,
      async (err) => {
        if (err) {
          console.error(err);
          return next(new ErrorResponse(`Problem with file upload`, 500));
        }
        await Post.findByIdAndUpdate(post._id, { imageUrl: file.name });
      }
    );
    return res.status(200).json({ sucess: true, data: post });
  }
});

// @desc    Get single post
// @route   GET /api/v1/videos/:id
// @access  Public
exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate({
    path: "userId",
    select: "avatarUrl username",
  });
  if (!post) {
    return next(new ErrorResponse(`No post with that id of ${req.params.id}`));
  }
  res.status(200).json({ sucess: true, data: post });
});

// @desc    Update post
// @route   PUT /api/v1/posts/:id
// @access  Private
exports.putPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
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
  let post = await Post.findByIdAndDelete(req.params.id);

  if (!post) {
    return next(new ErrorResponse(`No post with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: post.id });
});
