import express,{Request,Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import morgan from "morgan";
import messageRouter from "./routes/message.routes";
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
const port = process.env.PORT || 5001;
const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173','http://127.0.0.1'],
    credentials:true
  })
);
app.use(morgan("common"));
//db connection
connectDatabase();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/message", messageRouter);
app.get('/currentuser',(req:Request,res:Response)=>{
  const token=req.cookies?.session
  if(token)
  {
    const user=jwt.verify(token,process.env.SECRET!)  as { _id: string }
    if(user)
    {
      res.status(200).json({user:user._id})
    }else{
      res.status(400).json({message:"something went wrong"})
    }
  }

})

app.listen(port, () => {
  console.log("listening on port " + port);
});

async function connectDatabase() {
  mongoose
    .connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
    .then((res) => {
      console.log(
        `connected to database ${res.connection.host}:${res.connection.port}`
      );
    })
    .catch((err) => {
      console.error(err);
    });
}
