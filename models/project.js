const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
    projectName:{
        type:String,
        reuired:true,
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
    tasks:{
        type:String,
        "ref":"task.id",   
    },
    createdAt:{
        type:Date,
        required:true,
    }
})
const project = mongoose.model("project",projectSchema);

module.exports = project;