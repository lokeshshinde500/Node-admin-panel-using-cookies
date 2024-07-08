const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const imagePath = "/uploads/admin";

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    hobby: {
        type: Array,
        required: true
    },
    image: {
        type: String,
        required: true
    },
})

const adminImage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", imagePath));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now());
    }
})

adminSchema.statics.uploadImage = multer({ storage: adminImage }).single("image");
adminSchema.statics.imagePath = imagePath;

const admin = mongoose.model("admin", adminSchema);

module.exports = admin;

