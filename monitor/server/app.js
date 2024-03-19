const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const multer = require("multer")
const path = require("path")
// creating storage using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/") // Store files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname) // Unique filename with timestamp
  },
})

const fileupload = multer({ storage: storage })
module.exports = { fileupload }
console.log("multer middleware")

const userRoutes = require("./user")
const authRouter = require("./auth")
const app = express()
app.use(express.json())
app.use("/uploads", cors())
app.use("/uploads", express.static(path.join(__dirname, "uploads")))
// MongoDB connection (remote server)
const MONGODB_URI =
  "mongodb+srv://gantagnaneswar:hOyHvqEIqoIeMg8v@cluster0.hdmqmr4.mongodb.net/registery?retryWrites=true&w=majority"

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err))

// Multer storage configuration



// Middleware

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true,
  })
)
app.use(bodyParser.json())

// Routes
app.use("/api/users", userRoutes)
app.use("/api/auth", authRouter) 

// Error handling (optional - you can modify as needed)
app.use((error, req, res, next) => {
  const status = error.statusCode || 500
  const message = error.message
  res.status(status).json({ message: message })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server listening on port ${port}`))
