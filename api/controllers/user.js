import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
import { checkIdValidation } from "../utils/helpers.js"
const prisma = new PrismaClient()

export const getUser = async (req, res) => {
  try {
    const { userId } = req.params
    if (checkIdValidation(userId))
      return res.status(404).json("User not found!")

    const user = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },
    })

    if (!user) return res.status(404).json("User not found!")
    const { password, ...info } = user
    return res.status(200).json(info)
  } catch (error) {
    console.error("Error occurred:", error)
    if (err) return res.status(500).json(err)
  }
}

export const updateUser = async (req, res) => {
  const token = req.headers.authorization
  if (!token) return res.status(401).json("Not authenticated!")

  try {
    const userInfo = await jwt.verify(token, "secretkey")

    const updatedUser = await prisma.user.update({
      where: { id: Number(userInfo.id) },
      data: {
        name: req.body.name,
        city: req.body.city,
        website: req.body.website,
        profilePic: req.body.profilePic,
        coverPic: req.body.coverPic,
      },
    })

    if (updatedUser) {
      return res.json("Updated!")
    } else {
      return res.status(403).json("You can update only your post!")
    }
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json("Token is not valid!")
    } else {
      return res.status(500).json(error)
    }
  }
}

export const getAllUnfollowUsers = async (req, res) => {
  const userId = parseInt(req.query.userId)

  try {
    const followedUsers = await prisma.relationship.findMany({
      where: {
        followerUserId: userId,
      },
      select: {
        followedUserId: true,
      },
    })

    const followedUserIds = followedUsers.map((user) => user.followedUserId)

    const unfollowUsers = await prisma.user.findMany({
      where: {
        NOT: {
          id: {
            in: [...followedUserIds, userId],
          },
        },
      },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        coverPic: true,
        profilePic: true,
        city: true,
        website: true,
        posts: true,
        comments: true,
        likes: true,
        story: true,
      },
    })

    return res.json(unfollowUsers)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const getAllFriends = async (req, res) => {
  const userId = parseInt(req.query.userId)

  try {
    const friends = await prisma.relationship.findMany({
      where: {
        followerUserId: userId,
      },
      select: {
        followedUser: {
          select: {
            id: true,
            username: true,
            email: true,
            name: true,
            coverPic: true,
            profilePic: true,
            city: true,
            website: true,
            posts: true,
            comments: true,
            likes: true,
            story: true,
          },
        },
      },
    })

    return res.json(friends.map(({ followedUser }) => followedUser))
  } catch (error) {
    return res.status(500).json(error)
  }
}
