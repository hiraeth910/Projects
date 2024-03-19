const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const express = require("express")
const router = express.Router()
require('dotenv').config(); // Loads your .env file

router.post("/login", async (req, res) => {
  
  try {
    const { username, password } = req.body

    // 1. Find the admin
    const admin = {
      _id: "65f7a22ba7c47c91b812617f",
      username: "admin",
      password:
        "76a867741646b16295c0c35f1fc8724b35078631d57f41e728b393200a662df4",
    }
     // Assuming 'admins' collection
    if (!admin) {
      return res.status(401).json({ error: "Invalid username or password" })
    }

    // 2. Compare the SHA-256 hash
    const passwordHash = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex") // Hash provided password
    
    if (passwordHash !== admin.password || username!== admin.username) {
      return res.status(401).json({ error: "Invalid username or password" })
    }

    // 3. Generate JWT (same as before)
    
    const token = jwt.sign({userid:admin._id}, process.env.JWT_SECRET, {
      expiresIn: "5d",
    })
    console.log(token)
    res.json({ token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
module.exports = router;