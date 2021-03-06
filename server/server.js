const express = require("express");
const path = require('path')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize')
const fileupload = require('express-fileupload')
const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require("cors");
const hpp = require('hpp')
const multer = require("multer");

const errorHandler = require('./middleware/error')

const DBConnection = require('./config/db')

dotenv.config({ path: './config/.env' })

DBConnection()
const authRoutes = require('./routes/auth')
const postsRoutes = require('./routes/posts')
const subredditsRoutes = require('./routes/subreddits')
const usersRoutes = require('./routes/users')
const commentsRoutes = require('./routes/comments')

const app = express()
app.use(express.json())
app.use(cookieParser())


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// File uploading
app.use(
  fileupload({
    createParentPath: true
  })
)

app.use(mongoSanitize())
app.use(helmet())
app.use(xss())
app.use(cors())
app.use(hpp())

app.use(express.static(path.join(__dirname, 'public')))

const versionOne = (routeName) => `/api/v1/${routeName}`
app.use(versionOne('auth'), authRoutes)
app.use(versionOne('posts'), postsRoutes)
app.use(versionOne('subreddits'), subredditsRoutes)
app.use(versionOne('users'), usersRoutes)
app.use(versionOne('comments'), commentsRoutes)

app.use(errorHandler)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(
    `We are live on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  // Close server & exit process
  server.close(() => process.exit(1))
})
