const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
    projectName:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    members:{
        type:Array,
        default:[],
    },
    coverImage:{
        type:String,
        required:true,
    },
    tasks:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "task"
}],
    createdAt:{
        type:Date,
        required:true,
    },
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
})

const project = mongoose.model("project",projectSchema);

module.exports = project;