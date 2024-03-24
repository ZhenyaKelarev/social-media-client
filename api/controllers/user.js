import { db } from "../connect.js"
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getUser = (req, res) => {
  const userId = req.params.userId
  const q = "SELECT * FROM users WHERE id = ?"

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err)
    const { password, ...info } = data[0]
    return res.json(info)
  })
}

export const updateUser = (req, res) => {
  const token = req.headers.authorization
  if (!token) return res.status(401).json("Not authenticated!")

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!")

    const q =
      "UPDATE users SET `name`=?, `city`=?,`website`=?,`profilePic`=?,`coverPic`=? WHERE id=?"

    db.query(
      q,
      [
        req.body.name,
        req.body.city,
        req.body.website,
        req.body.profilePic,
        req.body.coverPic,
        userInfo.id,
      ],
      (err, data) => {
        if (err) res.status(500).json(err)
        if (data.affectedRows > 0) return res.json("Updated!")
        return res.status(403).json("You can update only your post!")
      }
    )
  })
}

export const getAllUnfollowUsers = (req, res) => {
  const userId = req.query.userId
  // const q = "SELECT * FROM users WHERE id != ?" -- all users

  const q =
    "SELECT u.* FROM users u WHERE u.id != ? AND u.id NOT IN (SELECT r.followedUserId FROM relationships r WHERE r.followerUserId = ?)"

  db.query(q, [userId, userId], (err, data) => {
    if (err) return res.status(500).json(err)
    const { password, ...info } = data
    return res.json(data)
  })
}

// PRISMA all users
// export const getAllUsers = async (req, res) => {
//   try {
//     const userId = req.query.userId
//     const users = await prisma.user.findMany()
//     return res.status(200).json(users)
//     console.log(users)
//   } catch (error) {
//     console.log("error", error)
//   }
// }

export const getAllFriends = (req, res) => {
  const userId = req.query.userId

  const q =
    "SELECT u.* FROM users u JOIN relationships r ON u.id = r.followedUserId WHERE r.followerUserId = ?"

  db.query(q, [userId, userId], (err, data) => {
    if (err) return res.status(500).json(err)
    const { password, ...info } = data
    return res.json(data)
  })
}
