const User = require("../model/userModel");
const bcrypt = require("bcrypt");

// The code for create user in chat 
module.exports.register = async(req,res,next) =>{
    try{
        const {password,pic,username,email} = req.body;
    const usernameCheck = await User.findOne({username});
    if(usernameCheck){
        return res.json({msg:"User already exit",status:false});
    }
    const emailCheck = await User.findOne({email});
    if(emailCheck){
        return res.json({msg:"Email already used",status:false});
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        email,
        username,
        password:hashedPassword,
        pic,
    });
    delete user.password;
    return res.json({status:true,user});
    }catch(err){
        next(err)
    }

};

//  The code for Login user in chat

module.exports.login = async(req,res,next) =>{
    try{
        const {password,username} = req.body;
    const user = await User.findOne({username});
    if(!user){
        return res.json({msg:"Incorrect username or password",status:false});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.json({msg:"Incorrect username or password",status:false});
    }
    delete user.password

    return res.json({status:true,user});
    }catch(err){
        next(err)
    }

};


module.exports.getAllUsers = async (req,res,next) => {
    try{
        const users = await User.find({_id:{$ne: req.params.id}}).select(
            [
                "email",
                "username",
                "pic",
                "_id",
            ]
        );
        return res.json(users);
    }catch(err){
        next(ex);
    }
};