import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { Apiresponce } from "../utils/apiResoponce.js";
import AsyncHandler from "../utils/AsynchHandler.js";


const registerUser = AsyncHandler(async(req,res)=>{
    const{username,email,password}=req.body;
    if(!username || !email || !password)
    {
         throw new apiError(404,"Please provide all the fields")
   }


    const existedUser=await User.findOne(
        {
          $or:[{email},{username}]
        }
      )

      if(existedUser)
      {
        throw new apiError(404,"User already existed")
      }

      const newuser=await User.create(
        {
          username,
          email, 
          password
        }
      )
      
      
      const createduser=await User.findById(
        newuser._id
      ).select(
        "-password -refreshToken"
      )


      if(!createduser)
      {
        throw new apiError(404,"User not found")
      }
         

      return res.status(200).json(
        new Apiresponce(200,"User registered successfully",createduser)
      )
  }

  
);

const loginUser = AsyncHandler(async(req,res)=>{
  const{username,password,email}=req.body;
  if(!email||!password)
  {
    throw new apiError(404,"Please provide all the fields")
  }

  const user=await User.findOne(
    {
      $or:[{username},{email}]
    }
  )

  if(!user)
  {
    throw new apiError(404,"User not found please provide valid credentials")
  }
  const ispasswordmatched=await user.ispasswordmatched(password);
  
  
  if(!ispasswordmatched)
  {
    throw new apiError(404,"Invalid Password provided")
  }

  const accessToken =await user.generateAccessToken();
  const refreshToken=await user.generateRefreshToken();

  const loggedInUser=await User.findById(user._id).select(
    "-password -refreshToken"
  )
 
  
  const options={
    httpOnly:true,
    secure: process.env.NODE_ENV === "production",
  }

  return res.status(200)
  .cookie("accessToken",accessToken,options)
  .cookie("refreshToken",refreshToken,options)
  .json(
    new Apiresponce(200,"User logged in successfully",
      {
        user:loggedInUser,
        accessToken,
        refreshToken
      }
    )
  )

});

const logoutUser= AsyncHandler(async(req,res)=>{
  await User.findByIdAndUpdate(
   req.user._id,{
    $set:{
      refreshToken:null
    } 
   },
   {
    new:true
   }
  );


  const option={
    httpOnly:true,
    secure: process.env.NODE_ENV === "production",
  }


  return res.status(200).
  clearCookie("accessToken",option).
  clearCookie("refreshToken",option).
  json(
    new Apiresponce(200),"User Logged out successfully",{}
  )
})

export {registerUser,loginUser,logoutUser}