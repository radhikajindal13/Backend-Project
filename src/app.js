import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import 
import userRouter from './routes/user.routes.js'  
// aise randomly name tbhi de skte h jb export default kiya ho

app.get("/", (req, res) => {
    res.send("Hello, API is working 🚀");
  });
//routes declaration
//we are not using app.get here bcz routes are in different file and we need to import
// so we need to use middleware, i.e., app.use, this is the syntax

app.use("/api/v1/users",userRouter) 
// http://localhost:8000/api/v1/users/register
export {app}