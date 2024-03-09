import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 30,
    },
    lastName: {
      type: String,
      required: true,
      min: 3,
      max: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 30,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 10,
    },
    picturepath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: {
      type: { type: String, enum: ["Point"] },
      coordinates: { type: [Number], required: true },
    },
    occupation: String,
    impressions: Number,
  },
  { timestamps: true }
)
const User = mongoose.model("User",UserSchema)
export default User;