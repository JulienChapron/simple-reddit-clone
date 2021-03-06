const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a username"],
      unique: true,
      uniqueCaseInsensitive: true,
    },
    avatarUrl: {
      type: String,
      default: "no-avatar.png",
    },
    backgroundUrl: {
      type: String,
      default: "no-background.png",
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      uniqueCaseInsensitive: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    subredditsSubscribe: {
      type: Array,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: [6, "Must be six characters long"],
      select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

UserSchema.virtual("subreddits", {
  ref: "Subreddit",
  localField: "_id",
  foreignField: "userId",
  justOne: false,
  count: true,
});

UserSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "userId",
  justOne: false,
  count: true,
});

/* UserSchema.pre("remove", function () {
  this.model("Post").deleteMany({ userId: this._id });
}); */

UserSchema.pre("find", function () {
  this.populate({ path: "subscribers" });
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
