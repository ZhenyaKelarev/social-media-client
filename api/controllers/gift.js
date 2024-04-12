import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
import moment from "moment"
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
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        createdAt: true,
        giftText: true,
        user: {
          select: {
            id: true,
            name: true,
            profilePic: true,
          },
        },
        giftCard: {
          select: {
            id: true,
            name: true,
            img: true,
          },
        },
        gifter: {
          select: {
            id: true,
            name: true,
            profilePic: true,
          },
        },
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

    const newGift = {
      giftText: req.body.giftText,
      createdAt: moment().toISOString(),
      gifterId: userInfo.id,
      userId: req.body.sendToUserId,
      giftCardId: req.body.giftCardId,
    }

    await prisma.gift.create({
      data: newGift,
    })

    return res.status(200).json("Gift has been sended")
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
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
