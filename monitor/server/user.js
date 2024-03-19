const express = require("express")
const router = express.Router()
const User = require("./model") // Import your User model
const {fileupload} =require("./app")
const jwt = require("jsonwebtoken") // For token-based auth (optional)

const isAuthenticated = (req, res, next) => {
 
  // Check for a valid token or session (replace with your logic)
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" }) // No header
  }

  const token = authHeader.replace(/^Bearer\s+/, "") // Remove "Bearer" and whitespace

  if (token) {
    
  }
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  
  // Verify token (if using token-based auth)
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).json({ message: "Unauthorized" })
    }
    
    req.user = decoded // Attach user data to the request object
    next()
  })
}


router.get("/search", isAuthenticated, async (req, res) => {
  try {
    const searchTerm = req.query.term // Get search term from query string
    if (!searchTerm) {
      return res.status(400).json({ error: "Search term is required" })
    }
    const regex = new RegExp(searchTerm, "i") // Case-insensitive search
    const users = await User.find({ $or: [{ name: regex }, { email: regex }] })
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Filter (GET /api/users/filter)
router.get("/filter", isAuthenticated, async (req, res) => {
  try {
    const filters = req.query // Get filters from query string

    const query = {}
    if (filters.designation) {
      query.designation = filters.designation
    }
    if (filters.startDate && filters.endDate) {
      query.createdAt = {
        $gte: new Date(filters.startDate),
        $lte: new Date(filters.endDate),
      }
    }
    const users = await User.find(query)
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Sort (GET /api/users/sort)(worked)
router.get("/sort", isAuthenticated, async (req, res) => {
  try {
    const sortField = req.query.sort // Get sort field from query string
    const sortOrder = req.query.order || "asc" // Default to ascending order

    if (!sortField) {
      return res.status(400).json({ error: "Sort field is required" })
    }

    const sortCriteria = {}
    sortCriteria[sortField] = sortOrder === "asc" ? 1 : -1
    const users = await User.find().sort(sortCriteria)
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
// Add employee (POST /api/users) (worked)
router.post(
  "/",
  isAuthenticated,
  fileupload.single("image"),
  async (req, res) => {
    try {
      // Create a new User object, but don't save it yet
      const user = new User({
        ...req.body,
        image: req.file ? req.file.path : null,
      })

      // Perform validation (Mongoose will throw errors if invalid)
      await user.validate()

      // Save the user if validation is successful
      await user.save()
      res.status(201).json(user)
    } catch (err) {
      // Check if the error is caused by Mongoose validation
      if (err.name === "ValidationError") {
        console.log(err)
        res.status(400).json({ errors: err.errors }).send(err.ValidationError) // Return validation errors
      } else {
        res.status(500).json({ error: err.message }) // Generic error for others
      }
    }
  }
)


// Get all employees (GET /api/users)(worked)
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const users = await User.find()
    
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Delete employee (DELETE /api/users/:id)(worked)
router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    console.log("req for deletion",req.params)
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }
    res.json({ message: "User deleted" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Edit employee (PUT /api/users/:id)(worked)
router.put(
  "/:id",
  isAuthenticated,
  fileupload.single("image"),
  async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          image: req.file ? req.file.path : req.body.image, // Update image if changed
        },
        { new: true }
      ) // Return the updated document

      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }
      res.status(200).json(user)
      console.log(res)
    } catch (err) {
      res.status(400).json({ error: err.message }) // Use 400 for validation errors
    }
  }
)
//get user (worked)
router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
module.exports = router
