const express = require("express");
const mongoose = require("mongoose");
const db = require('./db');
const user = require("./models/user");
const project = require("./models/project");
const task = require("./models/task");
require('dotenv').config();
const passport = require('./auth'); 
const app = express();

const logRequest = (req,res,next) => {
    console.log(`[${new Date().toLocaleString()}] Request Mode to : ${req.method} ${req.url}`);
    next();
}
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware  = passport.authenticate("local",{session:false});
app.get("/", (req,res) => {
    res.send("Hello team task manager.")
})

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const userRoute = require('./routes/userRoute');
const projectRoute = require('./routes/projectRoute');
const taskRoute = require('./routes/taskRoute');
app.use('/signup', userRoute);
app.use('/projects', projectRoute);
app.use('/tasks', taskRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}.`);
})