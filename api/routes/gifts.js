import express from "express"
import { getGifts, sendGift, deleteGift } from "../controllers/gift.js"

const router = express.Router()

router.get("/", getGifts)
router.post("/", sendGift)
router.delete("/", deleteGift)

export default router
