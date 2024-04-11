import express from "express"
import { getCardCollection } from "../controllers/marketplace.js"

const router = express.Router()

router.get("/", getCardCollection)

export default router
