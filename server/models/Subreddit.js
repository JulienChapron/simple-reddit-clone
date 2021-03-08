const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const SubredditSchema = new Schema(
  {
    subreddit: {
      type: String,
      minlength: [3, "Title must be three characters long"],
      trim: true,
      unique: true,
      uniqueCaseInsensitive: true,
      required: [true, "Subreddit is required"],
    },
    title: {
      type: String,
      minlength: [3, "Title must be three characters long"],
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      minlength: [3, "Description must be three characters long"],
      required: [true, "Description is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    photoUrl: {
      type: String,
      default: "no-photo.jpeg",
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

SubredditSchema.plugin(uniqueValidator, { message: "{PATH} already exists." });

module.exports = mongoose.model("Subreddit", SubredditSchema);
