import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req,res)=>{
    //get user details from frontend
    //validation - not empty
    //check if user already exists by username , email
    //check for images, check for avatar
    //upload them to cloudinary, avatar
    //create user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return res
    const {fullname,email,username,password}=req.body
    console.log("email",email);
    // if(fullname===""){
    //     throw new ApiError(400,"Full name required")
    // }
    if([fullname,email,username,password].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"All fields are required")
    }
    //User can directly contact database as u can see in user.model.js
    const existedUser = await User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"User with email or username already exists")
    }

    // req.body contains all the data that client provided(does not handle files and urls)
    //multer gives req.files access

    // const avatarLocalFilePath = req.files?.avatar[0]?.path;
    // const coverImageLocalFilePath = req.files?.coverimage[0]?.path;

    // if(!avatarLocalFilePath)
    // {
    //     throw new ApiError(400,"Avatar file is required")
    // }

    // const avatar = await uploadOnCloudinary(avatarLocalFilePath);
    // const coverimage = await uploadOnCloudinary(coverImageLocalFilePath);
    
    // if(!avatar)
    //     throw new ApiError(400,"Avatar file is required")

    const user = await User.create({
        fullname,
        // avatar:avatar?.url || "",
        // coverimage:coverimage?.url || "",
        email,
        password,
        username:username.toLowerCase(),
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser)
        throw new ApiError(500,"Something went wrong while registering the user")

    return res.status(201).json(
        new ApiResponse(200,createdUser,"user registered successfully")
    )
})

export {registerUser}