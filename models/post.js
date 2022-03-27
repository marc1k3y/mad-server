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
  }
})

const Post = mongoose.model('post', PostSchema)

module.exports = Post