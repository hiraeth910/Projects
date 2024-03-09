import Post from "../models/post.js"
import User from "../models/User.js"
//create
export const createPost = async(req,res)=>{
    try{
        const {userId,description,picturePath} =  req.body
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName:user.firstName,
            lastName:user.lastName,
            location:user.location,
            description,
            userPicturePath: user.picturepath,
            likes:{},
            comments:[]
        })
        await newPost.save();
        const post  = await post.find();
        res.status(201).json(post);
    }
    catch(err){res.status(409).json({message:err.message})}
};
export const getFeedPosts = async(req,res)=>{
  try {
    const post = await post.find()
    res.status(200).json(post)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}
export const getUserPosts = async(req,res)=>{
    try{
        const {userId}=req.body
        const post = await Post.find({userId});
        res.status(200).json(post)
    }catch(err){res.status(404).json({message:err.message})}
}
//update
export const likePost = async(req,res)=>{
    try{
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id)
        const isliked = post.likes.get(userId)
        if (isliked){
            post.likes.delete(userId);
        }
        else{
            post.likes.set(userId)
        }
        const updatePost =  await Post.findByIdAndUpdate(id,{likes:post.likes},{new:true})
        res.status(200).json(updatePost)
    }catch(err){res.status(404).json({message:err.message})}
}