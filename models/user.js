const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    profile:{
        type:String,
        required:true,
    },
    bio:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    projects:{
        type:Array,
        default:[],
    }
})

const user = mongoose.model("user",userSchema);

module.exports = user;