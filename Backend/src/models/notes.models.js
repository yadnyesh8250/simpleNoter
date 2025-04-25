import mongoose,{Schema} from "mongoose";

const notesSChema=new Schema({
content:{
  type:String,
  required:true,
  default:""
},
title:{
  type:String,
  required:true,
  default:"Title"
},
User:{
  type:Schema.Types.ObjectId,
  ref:"User",
  required:true
},
ispinned:{
  type:Boolean,
  default:false
}
},{timestamps:true})

export const Notes=mongoose.model("Notes",notesSChema)