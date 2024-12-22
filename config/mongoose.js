const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://lokeshshinde:qSGWIhhn6yxGnT9Z@cluster0.gu04j.mongodb.net/");

const db = mongoose.connection.once("open", (error) => {
    if (error) {
        console.log("db not connected");
    } else {
        console.log("db connected :)");
    }
})

module.exports = db;
