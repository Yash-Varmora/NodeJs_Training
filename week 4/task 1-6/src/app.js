import express from "express"
import cors from "cors"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import bookRouter from "./routes/bookRoutes.js"
import authRouter from "./routes/authRoute.js"
import uploadRouter from "./routes/uploadRoutes.js"
import errorMiddleware from "./middlewares/errorMiddleware.js"

const app = express()

app.use(helmet())
app.use(cors());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again after 15 minutes"
})
app.use(limiter)

app.use(express.json())

app.use("/upload", uploadRouter)
app.use("/auth", authRouter)
app.use("/books", bookRouter)

app.use(errorMiddleware)

export default app