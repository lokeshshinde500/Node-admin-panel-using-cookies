// Database Name : adminData
// Collection Name : admin

// paste this data in database to verify login page.
// {
//     "_id": {
//       "$oid": "65d323c643d41374c2e8f135"
//     },
//     "name": "LOKESH SHINDE",
//     "email": "lokeshinde500@gmail.com",
//     "password": "12345",
//     "comment": "test",
//     "city": "surat",
//     "gender": "male",
//     "hobby": [
//       "traveling"
//     ],
//     "image": "/uploads/admin/image_1708336070683",
//     "__v": 0
//   }

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const db = require("./config/mongoose");
const port = 8000;
const app = express();

app.use(express.urlencoded());
app.use(cookieParser());

app.set("view engine", "ejs") ;
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join("assets")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", require("./routes/indexRoutes"));

app.listen(port, (error) => {
    if (error) {
        console.log("server not connected !");
    } else {
        console.log("server running on port ", port);
    }
})