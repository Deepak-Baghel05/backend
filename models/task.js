const mongoose = require("mongoose");
const user = require("./user");
const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project"
  },
    status:{
        type:String,
        enum:["To Do","In Progress","Done"],
        required:true,
    },
    assignedTo : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"project",
        required:true,
    },
    dueDate:{
        type:Date,
        required:true,
    },
    createdAt:{
        type:Date,
        required:true,
    }

})
const task = mongoose.model("task",taskSchema);

module.exports = task;