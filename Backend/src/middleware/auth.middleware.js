import jwt from "jsonwebtoken";
import AsyncHandler from "../utils/AsynchHandler.js";
import { apiError } from "../utils/apiError.js";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";

dotenv.config();


const Authmiddleware= AsyncHandler(async(req,res,next)=>{

  try{
  
const token=req.cookies.accessToken || req.headers.authorization?.split(" ")[1]


if(!token)
{
  throw new apiError(404,"Please login to access this resource")
}

const DecodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

if(!DecodedToken)
{
   throw new apiError(404,"Invalid token, please login again")
}
 
const isuser=await User.findById(DecodedToken._id).select(
" -password -refreshToken"
);
if(!isuser)
{
  throw new apiError(404,"User not found")

}
req.user=isuser;
next()
}
catch(error)
{
  throw new apiError(404,"Invalid token, please login again") 
}

})
export {Authmiddleware}