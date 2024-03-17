const mongoose = require('mongoose')
const Grid = require("gridfs-stream");
const fs = require("fs");
var path = require("path");

const URI = "mongodb+srv://nikita_mongo:123@cluster0.nyecp.mongodb.net/"
const db_name = "pos_app"

console.log({ URI })
mongoose.connect(URI, {
    dbName: db_name
})
.then(() => {
    console.log('mongodb connected');    
})
.catch(err => console.log(err.message))


mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
})
mongoose.connection.on('error', (err) => {
    console.log(err.message);
})
mongoose.connection.on('disconnected', () => {
    console.log('Moongose connecton is disconnected');
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})
