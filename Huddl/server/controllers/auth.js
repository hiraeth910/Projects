import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"
//register user
export const register = async(req,res)=>{
    try{
        
        const {
            firstName,
            lastName,
            email,
            password,
            picturepath,
            location,
            occupation
        }=req.body;
        const salt = await bcrypt.genSalt();
        const has = await bcrypt.hash(password,salt);
        const newUser = new User({
          firstName,
          lastName,
          email,
          password:has,
          picturepath,
          location,
          occupation,
          impressions:Math.floor(Math.random()*100)
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}
//login
export const login =async (req,res)=>{
    try{
        const {email,passowrd}=req.body;
        const user = await User.findOne({email:email});
        if(!user)return res.status(400).json({msg:"user doesn't exist"});
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({msg:"wrong password"})
        const token = jwt.sign({id:user._id},process.env.JT);
        delete user.password;
        res.status(200).json({token,user});

    }catch(err){res.status(500).json({error:err.message})};
}