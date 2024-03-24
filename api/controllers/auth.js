import { db } from "../connect.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

// export const register = (req, res) => {
//   const q = "SELECT * FROM users WHERE username = ?" // secure format expect  -> req.body.username

//   db.query(q, [req.body.username], (err, data) => {
//     if (err) return res.status(500).json(err)
//     if (data.length) return res.status(409).json("User already exists!")
//     //Hash the password
//     const salt = bcrypt.genSaltSync(10)
//     const hashedPassword = bcrypt.hashSync(req.body.password, salt)

//     const q =
//       "INSERT INTO users (`username`, `email`, `password`, `name`) VALUE (?)"

//     const values = [
//       req.body.username,
//       req.body.email,
//       hashedPassword,
//       req.body.name,
//     ]

//     const response = {
//       username: req.body.username,
//       password: req.body.password,
//     }

//     db.query(q, [values], (err, data) => {
//       if (err) return res.status(500).json(err)
//       return res.status(200).json(response)
//     })
//   })
// }

export const register = async (req, res) => {
  try {
    // if (data.length) return res.status(409).json("User already exists!")
    const { username, email, password, name } = req.body

    const isUserExist = prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    })

    if (isUserExist) return res.status(409).json("User already exists!")

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const newUser = await prisma.user.create({
      data: { name, email, username, password: hashedPassword },
    })

    return res.status(200).json(newUser)
  } catch (e) {
    console.log(e)
    return res.status()
  }
}

export const login = (req, res) => {
  const q = `SELECT * FROM users WHERE username = ?`

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err)
    if (data.length === 0) return res.status(404).json("User not found!")

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    )

    if (!checkPassword)
      return res.status(400).json("Wrong password or username")

    const accessToken = jwt.sign({ id: data[0].id }, "secretkey")

    const { password, ...others } = data[0]

    const loginData = {
      accessToken,
      user: others,
    }

    res
      .cookie("accessToken2", accessToken, {
        httpOnly: true,
      })
      .status(200)
      .json(loginData)

    // res.status(200).json(loginData)
  })
}

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been log out")
}
