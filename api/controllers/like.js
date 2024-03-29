import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getLikes = async (req, res) => {
  try {
    // Find likes for the specified post ID
    const likes = await prisma.like.findMany({
      where: {
        postId: Number(req.query.postId),
      },
      select: {
        userId: true,
      },
    })

    // Extract user IDs from likes
    const userIds = likes.map((like) => like.userId)

    return res.status(200).json(userIds)
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

export const addLike = async (req, res) => {
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

export const deleteLike = async (req, res) => {
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
