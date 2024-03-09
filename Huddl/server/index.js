import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import multer from "multer";
import morgan from "morgan";
import path from "path";
import authroutes from "./routes/auth.js";
import userroutes from "./routes/users.js";
import postroutes from "./routes/post.js";
import { createPost } from "./controllers/post.js";
import { fileURLToPath } from "url";
import {register} from "./controllers/auth.js"
import { verifytoken } from "./middleware/auth.js";
import EventEmitter from "events";
const bus  = new EventEmitter();
bus.setMaxListeners(20);
// configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({pollicy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyparser.json({limit:"30mb",extended:true}));
app.use(bodyparser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use("/assets",express.static(path.join(__dirname,'public/assets')));

//file storage
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/assets")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});
const upload = multer({storage});

//routes with files
app.post("/auth/register",upload.single("picture"),register);
app.post("/posts", verifytoken, upload.single("picture"),createPost)
//routes
app.use('/auth',authroutes);
app.use('/users',userroutes);
app.use('/posts',postroutes);

//MONGOOSE SETUP
const PORT = process.env.PORT || 3080
mongoose.connect(process.env.MONGO_URL,{

}).then(()=>{
    app.listen(PORT,()=>{console.log(`server is active and listening from port-:${PORT}`)});
}).catch((err)=>{
    console.log(err)
})