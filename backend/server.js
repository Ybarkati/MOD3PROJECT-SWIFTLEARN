// Require dotenv to setup environment variables in our server
require('dotenv').config()

// Load express
const express = require('express')

const cors = require('cors')

// Setup our Express app
const app = express()

const PORT = 1111

// Load the connectDB function
const connectDB = require('./config')

// Connect to database
connectDB()

const postRoutes = require('./routes/postRoutes')
const commentRoutes = require('./routes/commentRoutes')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const studentRoutes=require('./routes/studentRoutes')

const { authorize } = require('./middleware/authMiddleware')

app.use(express.json())
app.use(cors())

app.use('/api/posts', postRoutes)
app.use('/api/student', studentRoutes)
app.use('/api/comments', authorize, commentRoutes)
app.use('/api/users', authorize, userRoutes)
app.use('/authU', authRoutes)


// Listen to the given port
app.listen(PORT, () => {
    console.log('Listening to the port: ' + PORT)
})