const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DB_URL)
mongoose.Promise = global.Promise

const app = express()

// const userRouter = require('./routes/userApi')
// const busRouter = require('./routes/busApi')
// const User = require('./models/user')

app.use(express.json())
app.use(cors())
// app.use('/api/user', userRouter)
// app.use('/api/bus', busRouter)
app.use((err, req, res, next) => {
  err && res.status(422).send({ error: err.message })
})

app.listen(process.env.PORT || 4000, function () {
  console.log('Server started')
})