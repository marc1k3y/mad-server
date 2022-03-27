require("dotenv").config()
const path = require("path")
const express = require("express")
const fileUpload = require("express-fileupload")
const cors = require("cors")
const mongoose = require("mongoose")
const router = require("./routes/index")

mongoose.connect(process.env.DB_URL)
mongoose.Promise = global.Promise

const app = express()

app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use("/api", router)
app.use(express.static(path.resolve(__dirname, "static")))
app.use((err, req, res, next) => {
  err && res.status(422).send({ error: err.message })
})

app.listen(process.env.PORT || 4000, function () {
  console.log("Server started")
})