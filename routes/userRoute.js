const express = require("express");
const router = express.Router();
const user = require('./../models/user');
const {jwtAuthMiddleware,generateToken} = require('./../jwt');

router.post('/signup', async(req,res) => {
    try{
        //const data = req.body;
        const newUser = new user(req.body);
        const response = await newUser.save();
        console.log("User registed successfully.");
        res.status(200).json(response);

        const payload = {
            id : response.id,
            username : response.username
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is :", token);
        res.status(200).json({token});

        //if (!response){
           // res.status(404).json({error:'Invalid User data.'});
        //}
    }catch(err){
        if (err.name == 'ValidationError'){
            res.status(400).json({error: err.message});
        }else{}
        console.log(err);
        res.status(500).json({error:'Internal Server Error.'});
    }
})

router.post('/login', async(req,res) => {
    try{
        const {username,password} = req.body;
        const user = await user.findOne({username:username});
        if(!user){
            return res.status(401).json({error:'Invalid username or password.'});
        }
        const payload = {
            id : user.id,
            username : user.username
        }
        const token = generateToken(payload);
        res.status(200).json({token});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error.'});
    }
})

router.get('/profile',async(req,res) => {
    try{
        const userData = req.user;
        console.log("User data :",userData);
        const userId = await user.findById(userId);
        res.status(200).json({user});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error.'});
    }
})

router.get('/', async(req,res) => {
    try{
        const response = await user.find();
        console.log("User data fetched successfully.");
        res.status(200).json(response);
        if (!response){
            res.status(404).json({error:'Invalid User data.'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error.'});
    }
})

router.put('/:id', async(req,res) => {
    try{
        const userid = req.params.id;
        const updatedUser = req.body;
        const response = await user.findByIdAndUpdate(userid,updatedUser,{
            returnDocument: 'after',
            runValidators:true,
        })
       
        //if(!response){
        //    res.status(404).json({error:'User not found.'});
        //}
        console.log("User data updated successfully.");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error.'});
    }
})

router.delete('/:id', async(req,res) => {
    try{
        const userid = req.params.id;
        const response = await user.findByIdAndDelete(userid);
        
        if (!response){
            res.status(404).json({error:'User not found.'});
        }
        console.log("User data is deleted.");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error.'});
    }
})

module.exports = router;