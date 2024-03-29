import { db } from "../connect.js"
import jwt from "jsonwebtoken"
import moment from "moment"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getPosts = async (req, res) => {
  const userId = parseInt(req.query.userId)
  const token = req.headers.authorization

  if (!token) return res.status(401).json("Not logged in!")

  const followedUsers = await prisma.relationship.findMany({
    where: {
      followerUserId: userId,
    },
    select: {
      followedUserId: true,
    },
  })

  const followedUserIds = followedUsers.map((user) => user.followedUserId)

  try {
    const userInfo = jwt.verify(token, "secretkey")

    const posts = await prisma.post.findMany({
      where: {
        OR: [
          { userId: userInfo.id },
          {
            userId: {
              in: followedUserIds,
            },
          },
        ],
      },
      include: {
        user: {
          select: {
            name: true,
            profilePic: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return res.status(200).json(posts)
  } catch (error) {
    console.log("error", error)
    return res.status(403).json(error)
  }
}

export const addPost = async (req, res) => {
  const token = req.headers.authorization

  if (!token) return res.status(401).json("Not logged in!")

  try {
    const userInfo = jwt.verify(token, "secretkey")

    const newPost = {
      desc: req.body.desc,
      img: req.body.img,
      createdAt: moment().toISOString(),
      userId: userInfo.id,
    }

    await prisma.post.create({
      data: newPost,
    })

    return res.status(200).json("Post has been created")
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const deletePost = async (req, res) => {
  try {
    const token = req.headers.authorization
    if (!token) return res.status(401).json("Not logged in!")

    const userInfo = jwt.verify(token, "secretkey")
    if (!userInfo) return res.status(403).json("Token is not valid!")

    const postId = parseInt(req.params.id)

    // Find the post by ID and user ID
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
        userId: userInfo.id,
      },
    })

    // If the post doesn't exist or doesn't belong to the user, return error
    if (!post) {
      return res.status(403).json("You can delete only your post")
    }

    await prisma.post.delete({
      where: {
        id: postId,
      },
    })

    return res.status(200).json("Post deleted")
  } catch (error) {
    console.error("Error deleting post:", error)
    return res.status(500).json(error.message || "Internal server error")
  }
}
