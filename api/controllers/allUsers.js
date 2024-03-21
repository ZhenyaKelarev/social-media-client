import { db } from "../connect.js"

export const getUsers = (req, res) => {
  // console.log("req", req)
  const userId = req.query.userId
  const q = "SELECT * FROM users WHERE id != ?"

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err)
    const { password, ...info } = data
    return res.json(data)
  })
}

// export const getUsers = (req, res) => {
//   const userId = req.params.userId
//   const q = "SELECT * FROM users WHERE id = ?"

//   db.query(q, [userId], (err, data) => {
//     if (err) return res.status(500).json(err)
//     const { password, ...info } = data
//     return res.json(data)
//   })
// }
