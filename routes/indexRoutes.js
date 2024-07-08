const express = require("express");
const adminController = require("../controllers/adminController");
const routes = express.Router();

routes.get("/", adminController.login);
routes.use("/admin", require("./adminRoutes"));


module.exports = routes;