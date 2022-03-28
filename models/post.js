const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  contentType: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  desc: {
    type: String
  },
  tgLink: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  owner: {
    type: String
  }
}, { timestamps: true })

const Post = mongoose.model('post', PostSchema)

module.exports = Post