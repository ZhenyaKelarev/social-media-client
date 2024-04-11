import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getGifts = async (req, res) => {
  const token = req.headers.authorization
  if (!token) return res.status(401).json("Not logged in!")

  try {
    const userInfo = jwt.verify(token, "secretkey")

    const gifts = await prisma.gift.findMany({
      where: {
        OR: [{ userId: userInfo.id }],
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            profilePic: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return res.status(200).json(gifts)
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

export const sendGift = async (req, res) => {
  const token = req.headers.authorization

  if (!token) return res.status(401).json("Not logged in!")
  try {
    const userInfo = jwt.verify(token, "secretkey")

    await prisma.like.create({
      data: {
        userId: Number(userInfo.id),
        postId: Number(req.body.postId),
      },
    })

    return res.status(200).json("Post has been liked.")
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

export const deleteGift = async (req, res) => {
  const token = req.headers.authorization

  if (!token) return res.status(401).json("Not logged in!")
  try {
    const userInfo = jwt.verify(token, "secretkey")

    await prisma.like.deleteMany({
      where: {
        userId: Number(userInfo.id),
        postId: Number(req.query.postId),
      },
    })

    return res.status(200).json("Post has been disliked.")
  } catch (error) {
    return res.status(500).json(error.message)
  }
}
