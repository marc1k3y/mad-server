const path = require("path")
const uuid = require("uuid")
const Post = require("../models/post")

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
}

module.exports = new PostController()