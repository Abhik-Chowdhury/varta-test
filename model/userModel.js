const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        min:3,
        max:25,
        unique:true,
    },
    email:{
        type: String,
        required:true,
        max:50,
        unique:true,
    },
    password:{
        type: String,
        required:true,
        min:8,
    },
    pic: {
        type: String,
        required: false,
        default:
             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFYupwNxYjZ6PvNx9U9tBwXGmOu0eX9BkCP5_td1GcyhqM7mMF&s",
        timestamps: true,
      },
});
module.exports = mongoose.model("Users",userSchema);