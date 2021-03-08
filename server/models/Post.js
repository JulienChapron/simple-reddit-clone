const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PostSchema = new Schema(
  {
    title: {
      type: String,
      minlength: [3, 'Must be three characters long']
    },
    text: {
      type: String,
      default: ''
    },
    subreddit:{
      type: String,
      ref: 'Subreddit',
      default: null
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
)

PostSchema.index({ title: 'text' })

PostSchema.virtual('users', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: false,
  count: true
})

PostSchema.virtual('subreddits', {
  ref: 'Subreddit',
  localField: 'subreddit',
  foreignField: 'subreddit',
  justOne: false
})

PostSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'postId',
  justOne: false,
  count: true
})
/* VideoSchema.virtual('dislikes', {
  ref: 'Feeling',
  localField: '_id',
  foreignField: 'videoId',
  justOne: false,
  count: true,
  match: { type: 'dislike' }
})

VideoSchema.virtual('likes', {
  ref: 'Feeling',
  localField: '_id',
  foreignField: 'videoId',
  justOne: false,
  count: true,
  match: { type: 'like' }
}) */

module.exports = mongoose.model('Post', PostSchema)