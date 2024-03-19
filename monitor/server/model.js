const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

// Define the valid course options
const validCourses = ["MCA", "BCA", "BSC"]

// Custom validator function to validate course array elements
const validateCourses = {
  validator: function (value) {
    return value.every((course) => validCourses.includes(course))
  },
  message: "Course must be one of: MCA, BCA, BSC",
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    match: /^[6789]\d{9}$/,
  },
  designation: {
    type: String,
    required: true,
    enum: ["HR", "Manager", "Sales"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  course: {
    type: [String], // Changed to array of strings
    required: true,
    validate: [validateCourses], // Using custom validation
  },
  image: {
    type: String,
    validate: {
      validator: (value) => {
        return /\.(jpg|jpeg|png)$/i.test(value)
      },
      message: "Image must be in JPG or PNG format.",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set the default value to the current timestamp
  },
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model("User", userSchema)

module.exports = User
