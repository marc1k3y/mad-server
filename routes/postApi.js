const Router = require("express")
const router = new Router()
const PostController = require("../controllers/postController")

router.post("/create", PostController.create)

module.exports = router