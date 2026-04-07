const express = require("express");
const router = express.Router();
const project = require('./../models/project');

router.post('/', async(req,res) => {
    try{
        //const data = req.body;
        const newProject = new project(req.body);
        const response = await project.save();
        console.log("Project created successfully.");
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
        const response = await project.find();
        console.log("Project data fetched successfully.");
        res.status(200).json(response);
        if (!response){
            res.status(404).json({error:'Invalid Project data.'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error.'});
    }
})

router.put('/:id', async(req,res) => {
    try{
        const projectid = req.params.id;
        const updatedProject = req.body();
        const response = await project.findByIdAndUpdate(projectid,updatedProject,{
            returnDocument: 'after',
            runValidators:true,
        })
        console.log("Project data updated successfully.");
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
        const projectid = req.params.id;
        const response = await project.findByIdAndDelete(projectid);
        console.log("Project data is deleted.");
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