import express from "express"
import {
  getPosts,
  addPost,
  deletePost,
  getUserPosts,
} from "../controllers/post.js"

const router = express.Router()

router.get("/", getPosts)
router.get("/userPosts", getUserPosts)
router.post("/", addPost)
router.delete("/:id", deletePost)

export default router
