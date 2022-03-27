const Router = require("express")
const router = new Router()
const userApi = require("./userApi")
const postApi = require("./postApi")

router.use("/user", userApi)
router.use("/post", postApi)

module.exports = router