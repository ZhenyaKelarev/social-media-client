import express from "express"
import {
  getPosts,
  addPost,
  deletePost,
  getUserPosts,
} from "../controllers/post.js"
import { upload } from "../utils/multer.js"

const router = express.Router()

router.get("/", getPosts)
router.get("/userPosts", getUserPosts)
router.post("/", upload.single("img"), addPost)
router.delete("/:id", deletePost)

export default router
