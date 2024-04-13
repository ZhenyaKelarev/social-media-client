import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
import moment from "moment"
const prisma = new PrismaClient()

export const getNotifications = async (req, res) => {
  const token = req.headers.authorization
  if (!token) return res.status(401).json("Not logged in!")

  try {
    const userInfo = jwt.verify(token, "secretkey")

    const notifications = await prisma.notification.findMany({
      where: {
        AND: {
          user: { id: Number(userInfo.id) },
          viewed: false,
        },
      },
      select: {
        createdAt: true,
        eventText: true,
        viewed: true,
        fromUser: {
          select: {
            id: true,
            name: true,
            profilePic: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            profilePic: true,
          },
        },
      },
    })

    return res.status(200).json(notifications)
  } catch (error) {
    console.log("error", error)
    return res.status(500).json(error.message)
  }
}

export const updateNotifications = async (req, res) => {
  const token = req.headers.authorization
  if (!token) return res.status(401).json("Not logged in!")

  try {
    const userInfo = jwt.verify(token, "secretkey")

    await prisma.notification.updateMany({
      where: { userId: Number(userInfo.id) },
      data: {
        viewed: true,
      },
    })

    return res.status(200).json("notifications updated")
  } catch (error) {
    console.log("error", error)
    return res.status(500).json(error.message)
  }
}

export const addNotification = async (req, res) => {
  const token = req.headers.authorization

  if (!token) return res.status(401).json("Not logged in!")

  try {
    const userInfo = jwt.verify(token, "secretkey")

    const newNotification = {
      createdAt: moment().toISOString(),
      eventText: req.body.eventText,
      fromUserId: userInfo.id,
      viewed: false,
      userId: req.body.toUserId,
    }

    await prisma.notification.create({
      data: newNotification,
    })

    return res.status(200).json("Notification has been sended")
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}
