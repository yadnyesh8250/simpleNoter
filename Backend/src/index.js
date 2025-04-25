import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./db/index.js"
import cors from 'cors';
import cookieParser from 'cookie-parser';

//  Main entry point of the application
dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;


// Middlewares

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(
  express.json({
    limit:"16kb",
    extended:true,
  })
)
app.use(cookieParser(

))

//Routes
import UserRoutes from './Routes/User.routes.js';
app.use('/api/user',UserRoutes)



app.listen(PORT,()=>{
  console.log("Server is running on port " + PORT);
  
})
app.get('/', (req, res) => {
  res.send('Hello World!');
});