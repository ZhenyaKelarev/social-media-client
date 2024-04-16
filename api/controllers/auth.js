import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const register = async (req, res) => {
  try {
    const { username, email, password, name } = req.body

    const isUserExist = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          {
            email,
          },
        ],
      },
    })

    if (isUserExist) return res.status(409).json("User already exists!")

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    await prisma.user.create({
      data: { name, email, username, password: hashedPassword },
    })

    const response = {
      username,
      password,
    }

    return res.status(200).json(response)
  } catch (e) {
    console.log(e)
    return res.status()
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    })
    if (!user) return res.status(404).json("Wrong password or username")
    const checkPassword = bcrypt.compareSync(password, user.password)
    if (!checkPassword)
      return res.status(400).json("Wrong password or username")

    const accessToken = jwt.sign({ id: user.id }, "secretkey")

    const loginData = {
      accessToken,
      user,
    }

    return res.status(200).json(loginData)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
}

export const logout = (_, res) => {
  res.status(200).json("User has been log out")
}
