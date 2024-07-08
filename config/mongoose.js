const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/adminData");

const db = mongoose.connection.once("open", (error) => {
    if (error) {
        console.log("db not connected");
    } else {
        console.log("db connected :)");
    }
})

module.exports = db;