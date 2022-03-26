const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

const generateJwt = (id, email) => {
  return jwt.sign({ id, email }, process.env.SECRET_KEY, { expiresIn: "24h" })
}

class UserController {
  async reg(req, res) {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        return res.send({ err: "email and password is required" })
      }
      const candidate = await User.findOne({ email })
      if (candidate) {
        return res.send({ err: "this email already exist" })
      }
      const hashPassword = await bcrypt.hash(password, 5)
      const user = await User.create({ email, password: hashPassword })
      const token = generateJwt(user._id, user.email)
      return res.send({ token })
    } catch (e) {
      return res.send({ err: e.message })
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (!user) {
        return res.send({ err: "user not found" })
      }
      let comparePassword = bcrypt.compareSync(password, user.password)
      if (!comparePassword) {
        return res.send({ err: "bad password" })
      }
      const token = generateJwt(user._id, user.email)
      return res.send({ token })
    } catch (e) {
      return res.send({ err: e.message })
    }
  }

  async check(req, res) {
    try {
      const token = generateJwt(req.user._id, req.user.email)
      return res.json({ token })
    } catch (e) {
      return res.send({ err: e.message })
    }
  }
}

module.exports = new UserController()