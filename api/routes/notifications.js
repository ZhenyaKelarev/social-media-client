import express from "express"
import {
  getNotifications,
  updateNotifications,
  addNotification,
} from "../controllers/notification.js"

const router = express.Router()

router.get("/", getNotifications)
router.put("/", updateNotifications)
router.post("/", addNotification)

export default router
