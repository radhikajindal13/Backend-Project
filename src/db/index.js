import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

// since db is always in another continent so we use async await

const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MONGODB Connected || DB HOST: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("MONGODB Connection error ",error);
        process.exit(1);
    }
}

export default connectDB