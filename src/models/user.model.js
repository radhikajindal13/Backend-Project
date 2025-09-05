import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema(
    {
        username:{
            type:"String",
            required:true,
            unique:true,
            trim:true,
            index:true,
            lowercase:true
        },
        password: {
            type:"String",
            required:[true,'Password is required'],
        },
        email:{
            type:"String",
            required:true,
            unique:true,
            trim:true,
            lowercase:true
        },
        fullname:{
            type:"String",
            required:true,
            lowercase:true,
            trim:true,
            index:true,
        },
        avatar:{
            type:"String",         // cloudinary url
            required:true
        },
        coverImage:{
            type:"String",        //cloudinary url
        }, 
        watchHistory:{
            type:Schema.Types.ObjectId,
            ref:"Video"
        },
        refreshToken:{
            type:"String"
        }
    },
    {
        timestamps:true
    }
)
// pre is a hook in middleware, that does something before "Save"
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password=bcrypt.hash(this.password,10); 
    next();
})

userSchema.methods.isPasswordCorrect= async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken =  function(){
    return jwt.sign(
        {
            _id: this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken =  function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User",userSchema)