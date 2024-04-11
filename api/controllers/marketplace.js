import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getCardCollection = async (req, res) => {
  const token = req.headers.authorization
  if (!token) return res.status(401).json("Not logged in!")

  try {
    jwt.verify(token, "secretkey")

    const cardCollection = await prisma.giftCard.findMany({})

    return res.status(200).json(cardCollection)
  } catch (error) {
    return res.status(500).json(error.message)
  }
}
