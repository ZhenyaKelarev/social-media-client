import { db } from "../connect.js"
import jwt from "jsonwebtoken"

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

export const getAllUsers = (req, res) => {
  const userId = req.query.userId
  // const q = "SELECT * FROM users WHERE id != ?"

  // const q =
  //   "SELECT u.* FROM users AS u JOIN relationships As r ON u.id = r.followerUserId WHERE r.followedUserId = ?"
  // const q =
  //   "SELECT u.* FROM users u JOIN relationships r ON u.id = r.followedUserId WHERE r.followerUserId = ?"

  // const q =
  //   "SELECT u.* FROM users u WHERE u.id NOT IN (SELECT r.followedUserId FROM relationships r WHERE r.followerUserId = ?);"

  const q =
    "SELECT u.* FROM users u WHERE u.id != ? AND u.id NOT IN (SELECT r.followedUserId FROM relationships r WHERE r.followerUserId = ?)"

  db.query(q, [userId, userId], (err, data) => {
    if (err) return res.status(500).json(err)
    const { password, ...info } = data
    return res.json(data)
  })
}
