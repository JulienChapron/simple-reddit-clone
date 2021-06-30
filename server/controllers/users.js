const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const path = require("path");

exports.getSubscribeSubreddit = asyncHandler(async (req, res, next) => {
  res.status(200);
});

exports.postSubscribeSubreddit = asyncHandler(async (req, res, next) => {
  let user = await User.findOne({ username: req.params.username });
  if (!user)
    return next(
      new ErrorResponse(`No user with that username of ${req.params.username}`)
    );
  user.subredditsSubscribe.push(req.body.id);
  console.log('passage OK', user)
  await User.findByIdAndUpdate(user.id, user);

  //arraySubredditsSubscribe = user.subredditsSubscribe
  res.status(200).json({ success: true, data: "postSubscribeSubreddit" });
});

exports.deleteSubscribeSubreddit = asyncHandler(async (req, res, next) => {
  res.status(200);
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username });

  if (!user)
    return next(
      new ErrorResponse(`No user with that username of ${req.params.id}`)
    );

  res.status(200).json({ success: true, data: user });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  req.body.password = "";
  delete req.body.password;

  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: "query",
  });

  if (!user)
    return next(new ErrorResponse(`No user with that id of ${req.params.id}`));

  res.status(200).json({ success: true, data: user });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user)
    return next(new ErrorResponse(`No user with that id of ${req.params.id}`));

  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, data: {} });
});

exports.uploadAvatar = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user)
    return next(new ErrorResponse(`No user with id of ${user._id}`, 404));

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 404));
  }

  const file = req.files.image;
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 404));
  }

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

  file.name = `avatar-${user._id}${path.parse(file.name).ext}`;

  file.mv(
    `${process.env.FILE_UPLOAD_PATH}/users/avatar/${file.name}`,
    async (err) => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse(`Problem with file upload`, 500));
      }
      await User.findByIdAndUpdate(user._id, { avatarUrl: file.name });
      res.status(200).json({ success: true, data: file.name });
    }
  );
});

exports.uploadBackground = asyncHandler(async (req, res, next) => {
  console.log(req.params.username, "req.params.username");
  const user = await User.findOne({ username: req.params.username });
  if (!user) return next(new ErrorResponse(`No user ${req.params.user}`, 404));

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 404));
  }

  const file = req.files.image;
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 404));
  }

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

  file.name = `photo-${user._id}${path.parse(file.name).ext}`;
  file.mv(
    `${process.env.FILE_UPLOAD_PATH}/users/background/${file.name}`,
    async (err) => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse(`Problem with file upload`, 500));
      }
      await User.findByIdAndUpdate(user._id, { backgroundUrl: file.name });
      res.status(200).json({ success: true, data: file.name });
    }
  );
});
