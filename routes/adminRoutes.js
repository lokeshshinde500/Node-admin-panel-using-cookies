const express = require("express");
const admin = require("../models/adminModel");
const adminController = require("../controllers/adminController");
const routes = express.Router();

// GET
routes.get("/", adminController.dashboard);
routes.get("/addAdmin", adminController.addAdmin);
routes.get("/viewAdmin", adminController.viewAdmin);
routes.get("/deleteRecord/:id", adminController.deleteRecord);
routes.get("/updateRecord", adminController.editRecord);
routes.get("/logout", adminController.logout);
routes.get("/forgetPassword", adminController.forgetPassword);
routes.get("/otpPage", adminController.otpPage);
routes.get("/changePassword", adminController.changePassword);

// POST
routes.post("/insert", admin.uploadImage, adminController.insert);
routes.post("/update", admin.uploadImage, adminController.update);
routes.post("/signIn", adminController.signIn);
routes.post("/sendOTP", adminController.sendOTP);
routes.post("/matchPassword", adminController.matchPassword);
routes.post("/resetPassword", adminController.resetPassword);

module.exports = routes;