const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "User"
  },
  avatar: {
    type: String
  },
  likedPosts: {
    type: Array,
    default: []
  }
})

const User = mongoose.model('user', UserSchema)

module.exports = User