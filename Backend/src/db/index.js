import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";
import { apiError } from "../utils/apiError.js";



const connectDB = async () =>{
  
  console.log(DB_NAME);
  
  try{
    const connection_Instance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    
    console.log("MongoDB connected successfully")
    
  }
  catch(error)
  {
    throw new apiError(404,"Database connection failed",error.message)
    
  }
}

export default connectDB;
