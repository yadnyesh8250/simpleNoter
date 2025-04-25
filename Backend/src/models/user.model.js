import mongoose,{Schema} from "mongoose";
import brcypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const userSchema= new mongoose.Schema({
username:{
  type:String,
  required:true,
  unique:true
},
email:{
  type:String,
  required:true,
  unique:true
},
password:{
  type:String,
  required:true
}
},{timestamps:true})  

userSchema.pre("save",async function(next){
  if(!this.isModified("password")) return next();

  this.password=await brcypt.hash(this.password,10)
  next() 
})

userSchema.methods.ispasswordmatched=async function(password)
{
  return await brcypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=async function () {
   return jwt.sign(
    {
    _id:this._id,
    username:this.username,
    email:this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
   )
}

userSchema.methods.generateRefreshToken=async function()
{
   return jwt.sign(
    {
      _id:this._id,
      username:this.username
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
   )
}



export const User=mongoose.model("User",userSchema)