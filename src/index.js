// import mongoose from "mongoose"
// import { DB_NAME } from "./constants"
import connectDB from "./db/index.js"
import dotenv from "dotenv"
dotenv.config({
    path:"./env"
})
connectDB()