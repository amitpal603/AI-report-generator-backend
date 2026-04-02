import express from "express"
import authRoutes from "./routes/user.routes.js"
import cookieParser from "cookie-parser"

const app = express()
app.use(express.json())
app.use(cookieParser())


app.get("/health", (req, res) => {
  res.send("Server is running!")
})

// Routes

app.use("/api/auth" , authRoutes)

export default app