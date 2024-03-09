import User from '../models/User.js';
export const getUser =async (req,res)=>{
    try{

        const {id}=req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }catch(err){res.status(404).json({message:err.message})}
}
export const getUserFriends = async(req,res)=>{
    try{
        const {id}=req.params;
        const user = await User.findById(id);
        const friends = await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );
        const formfriends = friends.map(({_id,
          firstName, lastName, picturepath,location,occupation,
        })=>{return {_id,firstName, lastName, picturepath,location,occupation,}});
        res.status(200).json(formfriends);
    }catch(err){
        res.status(404).json({message:err.message})
    }
}
export const addRemoveFriend = async(req,res)=>{
 try{
    const {id,friendId} = req.params;
    const user = await User.findById(id);
    const friend =  await User.findById(friendId);
    if (user.friends.includes(friendId)){
        user.friends = user.frineds.filter((id)=>id!==friendId);
        friend.friends = user.friends.filter((id)=>id!==id);
    }
    else{
        user.friends.push(friendId);
        friend.friends.pusH(id);
    }
    await user.save();
    await friend.save();
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    )
    const formfriends = friends.map(
      ({ _id, firstName, lastName, picturepath, location, occupation }) => {
        return { _id, firstName, lastName, picturepath, location, occupation }
      }
    )
    res.status(200).json(formfriends)

 }catch(err){
    res.status(404).json({message:err.message})
 }
}