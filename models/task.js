const mongoose = require("mongoose");
const user = require("./user");
const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["To Do","In Progress","Done"],
        required:true,
    },
    assignedTo : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user.id",
    },
    projectId:{
        type:String,
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