import express from "express"
import {
  getUser,
  updateUser,
  getAllUnfollowUsers,
  getAllFriends,
} from "../controllers/user.js"
import { upload } from "../utils/multer.js"

const router = express.Router()

router.get("/find/:userId", getUser)
router.put(
  "/",
  upload.fields([{ name: "profile" }, { name: "cover" }]),
  updateUser
)
router.get("/allUsers", getAllUnfollowUsers)
router.get("/allFriends", getAllFriends)

export default router
