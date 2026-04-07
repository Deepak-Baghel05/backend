const mongoose = require("mongoose");
const dotenv = require('dotenv');
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/team-database';

mongoose.connect('mongodb://localhost:27017/team-database')

const db = mongoose.connection;

db.on('connected',() => {
    console.log("Connected on MongoDB server.");
})

db.on('error',() => {
    console.log("MongoDB connection error.");
})

db.on('disconnected',() => {
    console.log("MongoDB server disconnected.");
})

module.exports = db;