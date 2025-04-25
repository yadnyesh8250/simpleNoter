import { Notes } from "../models/notes.models.js";
import AsyncHandler from "../utils/AsynchHandler.js";
import { apiError } from "../utils/apiError.js";
import { Apiresponce } from "../utils/apiResoponce.js";


const CreateNote= AsyncHandler(async(req,res)=>{
  const {title,content,ispinned}=req.body;
  if(!title || !content)
  {
    throw new apiError(404,"Please provide title and content")
  }

  const Newnote=await Notes.create({
    title,
    content,
    ispinned,
    User:req.user._id
  });

  return res.status(201).json(
    new Apiresponce(201,"Note is created successfully ",Newnote)
  )

});

const GetUsernotes= AsyncHandler(async(req,res)=>{
  const notes=await Notes.find({User:req.user._id})
   console.log("notes",notes);
   
  return res.status(200).json(
    new Apiresponce(200,"User notes fetched succesfully",notes)
  )
});



export {CreateNote,GetUsernotes}