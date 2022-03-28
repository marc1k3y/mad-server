const Router = require("express")
const router = new Router()
const PostController = require("../controllers/postController")

router.post("/create", PostController.create)
router.get("/getAll", PostController.getAll)

module.exports = router