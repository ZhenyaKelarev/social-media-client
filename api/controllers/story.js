import { db } from "../connect.js"
import jwt from "jsonwebtoken"
import moment from "moment"

export const getStories = (req, res) => {
  const userId = req.query.userId
  const token = req.headers.authorization
  if (!token) return res.status(401).json("Not logged in!")

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!")

    const q = `SELECT s.*, u.id AS userId, name FROM stories AS s JOIN users AS u ON (u.id = s.userId) WHERE s.userId = ? ORDER BY s.id DESC`

    const values =
      userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id]

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json(data)
    })
  })
}

export const addStory = (req, res) => {
  const token = req.headers.authorization
  if (!token) return res.status(401).json("Not logged in!")

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!")

    const q = "INSERT INTO stories (`img`, `userId`) VALUES (?)"

    const values = [req.body.img, userInfo.id]
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json("Post has been created")
    })
  })
}

export const deleteStory = (req, res) => {
  const token = req.headers.authorization
  if (!token) return res.status(401).json("Not logged in!")

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!")

    const q = "DELETE FROM posts WHERE `id`=? AND `userId`=?"

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err)
      if (data.affectedRows > 0) return res.status(200).json()
      return res.status(403).json("You can delete only your post")
    })
  })
}
