const express = require("express");
const router = express.Router();
const task = require('./../models/task');

router.post('/', async(req,res) => {
    try{
        const data = req.body;
        const newTask = new task(data);
        const response = await task.save();
        console.log("Task created successfully.");
        res.status(200).json(response);
        if (!response){
            res.status(404).json({error:'Invalid Project data.'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error.'});
    }
})

router.get('/', async(req,res) => {
    try{
        const response = await task.find();
        console.log("Task data fetched successfully.");
        res.status(200).json(response);
        if (!response){
            res.status(404).json({error:'Invalid Project data.'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error.'});
    }
})

router.get('/:status', async(req,res) => {
    try{
        const status = req.params.status;
        if(status == "To Do" || status == "In Progress" || status == "Done"){
            const response = await task.find({status:status});
            console.log("Task data fetched successfully.");
            res.status((200).json(response));
        }
        else{
            res.status(404).json({error:'Invalid Project data.'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error.'});
    }
})

router.put('/:id', async(req,res) => {
    try{
        const taskid = req.params.id;
        const updatedTask = req.body;
        const response = await task.findByIdAndUpdate(taskid,updatedTask,{
            returnDocument: 'after',
            runValidators:true,
    })
    console.log("Task data updated successfully.");
    res.status(200).json(response);
    if (!response){
            res.status(404).json({error:'Invalid Project data.'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error.'});
    }
})

router.delete('/:id', async(req,res) => {
    try{
        const taskid = req.params.id;
        const response = await task.findByIdAndDelete(taskid);
        console.log("Task data is deleted.");
        res.status(200).json(response);
        if (!response){
            res.status(404).json({error:'Invalid Project data.'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error.'});
    }
})

module.exports = router;