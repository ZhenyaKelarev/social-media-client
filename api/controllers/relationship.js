import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getRelationships = async (req, res) => {
  try {
    const { followedUserId } = req.query
    const followerUsers = await prisma.relationship.findMany({
      where: {
        followedUserId: Number(followedUserId),
      },
    })
    return res
      .status(200)
      .json(followerUsers.map((relationship) => relationship.followerUserId))
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const addRelationship = async (req, res) => {
  const token = req.headers.authorization
  if (!token) return res.status(401).json("Not logged in!")

  try {
    const userInfo = jwt.verify(token, "secretkey")
    await prisma.relationship.create({
      data: {
        followerUserId: userInfo.id,
        followedUserId: req.body.userId,
      },
    })

    return res.status(200).json("Following")
  } catch (error) {
    return res.status(500).json(err)
  }
}

export const deleteRelationship = async (req, res) => {
  const token = req.headers.authorization
  if (!token) return res.status(401).json("Not logged in!")

  try {
    const userInfo = jwt.verify(token, "secretkey")
    await prisma.relationship.deleteMany({
      where: {
        followerUserId: userInfo.id,
        followedUserId: Number(req.query.userId),
      },
    })

    return res.status(200).json("Unfollow")
  } catch (error) {
    return res.status(500).json(err)
  }
}
