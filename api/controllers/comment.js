import jwt from "jsonwebtoken"
import moment from "moment"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: Number(req.query.postId),
      },
      orderBy: {
        createdAt: "desc",
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
    })

    return res.status(200).json(comments)
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

export const addComment = async (req, res) => {
  try {
    const token = req.headers.authorization
    if (!token) return res.status(401).json("Not logged in!")

    const userInfo = jwt.verify(token, "secretkey")
    if (!userInfo) return res.status(403).json("Token is not valid!")

    await prisma.comment.create({
      data: {
        desc: req.body.desc,
        createdAt: moment().toISOString(),
        userId: userInfo.id,
        postId: req.body.postId,
      },
    })

    return res.status(200).json("Comment has been created")
  } catch (error) {
    return res.status(500).json(error.message)
  }
}
