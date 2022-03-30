const path = require("path")
const uuid = require("uuid")
const Post = require("../models/post")
const User = require("../models/user")

class PostController {
  async create(req, res) {
    try {
      const { contentType, tag, desc, tgLink } = req.body
      const { content } = req.files
      if (!contentType || !tag || !content) {
        return res.send({ err: "required fields is empty" })
      }
      const fileName = uuid.v4() + ".jpg"
      content.mv(path.resolve(__dirname, "..", "static", "postsContent", fileName))
      Post.create({ contentType, tag, content: fileName, desc, tgLink })
        .then(() => res.sendStatus(200))
    } catch (e) {
      return res.send({ err: e.message })
    }
  }

  async getAll(req, res) {
    try {
      const { limit, skip } = req.query
      Post.find({}).limit(limit).skip(skip)
        .then((posts) => res.send({ posts }))
    } catch (e) {
      return res.send({ err: e.message })
    }
  }

  async likePost(req, res) {
    try {
      const { userId, postId } = req.body
      const user = await User.findOne({ _id: userId })
      if (user.likedPosts.find(id => id === postId)) {
        return res.send({ err: "post already liked" })
      } else {
        Post.findOne({ _id: postId })
          .then((post) => {
            post.likes += 1
            post.save()
          })
        user.likedPosts.push(postId)
        user.save()
        return res.sendStatus(200)
      }
    } catch (e) {
      return res.send({ err: e.message })
    }
  }

  async dislikePost(req, res) {
    try {
      const { userId, postId } = req.body
      const user = await User.findOne({ _id: userId })
      Post.findOne({ _id: postId })
        .then((post) => {
          post.likes -= 1
          post.save()
        })
      user.likedPosts = user.likedPosts.filter(id => id !== postId)
      user.save()
      return res.sendStatus(200)
    } catch (e) {
      return res.send({ err: e.message })
    }
  }
}

module.exports = new PostController()