const fs = require("fs");
const path = require("path");
const admin = require("../models/adminModel");
const nodemailer = require("nodemailer");

const dashboard = async (req, res) => {
    try {
        const user = await req.cookies.user;
        if (user != undefined) {
            return res.render("dashboard", { user });
        } else {
            return res.redirect("/");
        }
    } catch (error) {
        return res.redirect("/");
    }
}

const addAdmin = async (req, res) => {
    try {
        const user = await req.cookies.user;
        if (user != undefined) {
            return res.render("add_admin", { user });
        } else {
            return res.redirect("/");
        }
    } catch (error) {
        return res.redirect("/");
    }

}

const viewAdmin = async (req, res) => {
    try {
        const adminData = await admin.find();
        const user = await req.cookies.user;
        if (user != undefined) {
            return res.render("view_admin", { adminData, user });
        } else {
            return res.redirect("/");
        }
    } catch (error) {
        return res.redirect("/");
    }
}

const insert = async (req, res) => {

    try {
        if (req.file) {
            req.body.image = admin.imagePath + "/" + req.file.filename;
        }

        req.body.name = req.body.firstName + " " + req.body.lastName;
        await admin.create(req.body);
        return res.redirect("/admin/addAdmin");

    } catch (error) {
        return res.redirect("/admin/addAdmin");
    }
}

const deleteRecord = async (req, res) => {

    try {
        const deleteRecord = await admin.findById(req.params.id);

        if (deleteRecord) {
            const deleteImagePath = path.join(__dirname, "..", deleteRecord.image);
            await fs.unlinkSync(deleteImagePath);
        }

        await admin.findByIdAndDelete(req.params.id);
        return res.redirect("/admin/viewAdmin");
    } catch (error) {
        return res.redirect("/admin/viewAdmin");
    }
}

const editRecord = async (req, res) => {
    try {
        const editRecord = await admin.findById(req.query.id);
        const user = await req.cookies.user;
        if (user != undefined) {
            return res.render("edit_admin", { editRecord, user });
        } else {
            return res.redirect("/");
        }
    } catch (error) {
        return res.redirect("/");
    }
}

const update = async (req, res) => {
    try {
        const oldImageData = await admin.findById(req.query.id);
        if (req.file) {

            if (oldImageData) {
                const deleteImagePath = path.join(__dirname, "..", oldImageData.image);
                await fs.unlinkSync(deleteImagePath);
            }

            req.body.image = admin.imagePath + "/" + req.file.filename;

        } else {
            req.body.image = oldImageData.image;
        }

        req.body.name = req.body.firstName + " " + req.body.lastName;
        await admin.findByIdAndUpdate(req.query.id, req.body);
        return res.redirect("/admin/viewAdmin");
    } catch (error) {
        return res.redirect("/admin/viewAdmin");
    }
}

const login = async (req, res) => {
    return res.render("login");
}

const signIn = async (req, res) => {
    try {
        const verifyData = await admin.findOne({ email: req.body.email, password: req.body.password });
        if (verifyData) {
            if (req.body.password == verifyData.password) {
                res.cookie("user", verifyData);
                return res.redirect("/admin");
            } else {
                return res.redirect("/")
            }
        } else {
            return res.redirect("/")
        }
    } catch (error) {
        return res.redirect("/")
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("user");
        return res.redirect("/admin");
    } catch (error) {
        return res.redirect("/admin");
    }
}

const forgetPassword = async (req, res) => {
    return res.render("forget_password");
}

const otpPage = async (req, res) => {
    return res.render("otpPage");
}

const sendOTP = async (req, res) => {
    try {
        const verifyEmail = await admin.findOne({ email: req.body.email });
        if (verifyEmail) {
            // send mail
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: "lokeshinde500@gmail.com",
                    pass: "azjeliapaguqrdzs",
                },
            });

            const otp = Math.round(Math.random() * 1000000);
            res.cookie("otp", otp);
            res.cookie("email", req.body.email);


            const info = await transporter.sendMail({
                from: ' <lokeshinde500@gmail.com>', // sender address
                to: "lokeshinde500@gmail.com", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: `<b>otp is : ${otp} </b>`, // html body
            });

            return res.redirect("otpPage");


        } else {
            console.log("invalid mail");
            return res.redirect("/admin/forgetPassword");
        }
    } catch (error) {
        return res.redirect("/admin/forgetPassword");
    }
}

const changePassword = async (req, res) => {
    return res.render("changePassword");
}

const matchPassword = async (req, res) => {
    try {
        const otp = await req.cookies.otp;

        if (+req.body.otp == otp) {
            res.clearCookie("otp");
            return res.redirect("/admin/changePassword");
        } else {
            return res.redirect("/admin/otpPage");
        }
    } catch (error) {
        return res.redirect("/admin/otpPage");
    }
}

const resetPassword = async (req, res) => {
    try {
        const userData = await admin.findOne({ email: req.cookies.email });
        res.clearCookie("email");
        if (req.body.newPassword == req.body.confirmPassword) {
            await admin.findByIdAndUpdate(userData.id, {
                password: req.body.newPassword
            });
            return res.redirect("/admin");
        } else {
            return res.redirect("/admin/changePassword");
        }
    } catch (error) {
        return res.redirect("/admin/changePassword");
    }
}


module.exports = { dashboard, addAdmin, viewAdmin, insert, deleteRecord, editRecord, update, login, signIn, logout, forgetPassword, sendOTP, otpPage, matchPassword, changePassword, resetPassword }