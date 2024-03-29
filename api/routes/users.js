import express from "express"
import {
  getUser,
  updateUser,
  getAllUnfollowUsers,
  getAllFriends,
} from "../controllers/user.js"

const router = express.Router()

router.get("/find/:userId", getUser)
router.put("/", updateUser)
router.get("/allUsers", getAllUnfollowUsers)
router.get("/allFriends", getAllFriends)

export default router
