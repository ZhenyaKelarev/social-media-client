import express from "express"
import { getStories, addStory, deleteStory } from "../controllers/story.js"
import { upload } from "../utils/multer.js"

const router = express.Router()

router.get("/", getStories)
router.post("/", upload.single("img"), addStory)
router.delete("/:id", deleteStory)

export default router
