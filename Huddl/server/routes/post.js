import express from "express";
import {getFeedPosts,getUserPosts,likePost} from '../controllers/post.js'
import { verifytoken } from "../middleware/auth.js";
const router = express.Router()
//read
router.get("/",verifytoken,getFeedPosts);
router.get("/:userId/posts",verifytoken,getUserPosts);
router.get("/:id/like",verifytoken,likePost);
export default router;