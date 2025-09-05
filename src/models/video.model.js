import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const videoSchema = mongoose.Schema(
    {
        id:{
            type:String,
            unique: true,
            required:true,
        },
        videoFile:{
            type:String   ,   //cloudinary url
            required:true,
        },
        thumbnail:{
            type:String,     //cloudinary url
            required:true,
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        title:{
            type:String,     
            required:true,
        },
        description:{
            type:String,        
            required:true,
        },
        duration:{
            type:Number,
            required:true

        },
        views:{
            type:Number,
            default:0
        },
        isPublished:{
            type:Boolean,
            default:true
        },
        createdAt:{
            type:Date,
        },
        updatedAt:{
            type:Date,
        }
    },
    {
        timestamps:true,
    }
)
videoSchema.plugin(mongooseAggregatePaginate)
//now we can write aggregation queries by using plugin
export const Video= mongoose.model("Video",videoSchema)