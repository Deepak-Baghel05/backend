const express = require("express");
const mongoose = require("mongoose");
const db = require('./db');
const user = require("./models/user");
const project = require("./models/project");
const task = require("./models/task");
const dotenv = require('dotenv');
const app = express();

app.get("/", (req,res) => {
    res.send("Hello team task manager.")
})

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const userRoute = require('./routes/userRoute');
const projectRoute = require('./routes/projectRoute');
const taskRoute = require('./routes/taskRoute');
app.use('/register', userRoute);
app.use('/projects', projectRoute);
app.use('/tasks', taskRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}.`);
})