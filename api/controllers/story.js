import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getStories = async (req, res) => {
  try {
    const userId = req.query.userId
    const token = req.headers.authorization

    if (!token) return res.status(401).json("Not logged in!")
    const userInfo = jwt.verify(token, "secretkey")
    if (!userInfo) return res.status(403).json("Token is not valid!")

    const stories = await prisma.story.findMany({
      where: {
        userId: userId ? parseInt(userId) : userInfo.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    })

    return res.status(200).json(stories)
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

export const addStory = async (req, res) => {
  try {
    const token = req.headers.authorization
    if (!token) return res.status(401).json("Not logged in!")

    const userInfo = jwt.verify(token, "secretkey")
    if (!userInfo) return res.status(403).json("Token is not valid!")

    // Create story using Prisma
    await prisma.story.create({
      data: {
        img: req.body.img,
        userId: userInfo.id,
      },
    })

    return res.status(200).json("Story has been created")
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

export const deleteStory = async (req, res) => {
  try {
    const token = req.headers.authorization
    if (!token) return res.status(401).json("Not logged in!")

    const userInfo = jwt.verify(token, "secretkey")
    if (!userInfo) return res.status(403).json("Token is not valid!")

    // Find the story by ID
    const story = await prisma.story.findFirst({
      where: {
        id: parseInt(req.params.id),
        userId: userInfo.id,
      },
    })

    if (!story) return res.status(403).json("You can delete only your story")

    await prisma.story.delete({
      where: {
        id: parseInt(req.params.id),
      },
    })

    return res.status(200).json("Story has been deleted")
  } catch (error) {
    return res.status(500).json(error.message)
  }
}
