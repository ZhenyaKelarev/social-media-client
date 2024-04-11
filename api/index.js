import "reflect-metadata"
import express from "express"
import { createServer } from "http"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import commentRoutes from "./routes/comments.js"
import likeRoutes from "./routes/likes.js"
import giftRoutes from "./routes/gifts.js"
import storiesRoutes from "./routes/stories.js"
import relationshipsRoutes from "./routes/relationships.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { Server } from "socket.io"
import multer from "multer"

const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true, // Enable CORS with credentials
  },
})
//middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true)
  next()
})
app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:3000",
  })
)

app.use(cookieParser())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  },
})

const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file
  res.status(200).json(file.filename)
})

app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/gifts", giftRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/relationships", relationshipsRoutes)
app.use("/api/stories", storiesRoutes)

io.on("connect", (socket) => {
  console.log("connect test")
  io.on("disconnect", () => {
    console.log("Disconnect test")
  })
})

httpServer.listen(8800, () => {
  console.log("API working!")
})
