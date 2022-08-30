const { Router } = require("express");
const router = Router();
const User = require("../models/users")
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")
const router = require("./send-email")
require("dotenv").config()
const { NMAILER_PASSWORD } = process.env


router.post("/resetpassword", async (req, res, next) => {
    if (req.body.email == "") {
        res.status(400).send({
            message: "El email es requerido"
        })
    }
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(403).send({
                message: "No existe ese email"
            })
        }

        let id = user._id;
        const token = jwt.sign({ id: id }, process.env.SECRET_KEY);
        res
            .header("token", token)
            .json({ error: null, data: { token }, id: { id } });
        const transporter = nodemailer.createTransport({
            service: "hotmail",
            auth: {
                user: "HAppYTAil5@hotmail.com",
                pass: `${NMAILER_PASSWORD}`
            },
        })
        const emailPort = 587
        const mailOptions = {
            from: "'HappyTails'<HAppYTAil5@hotmail.com>",
            to: `${user.email}`,
            subject: "Recuperar contraseña en Happy Tails",
            text: `${emailPort}/resetpassword/${id}/${token}`
        }
        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                console.error("Ha ocurrido un error", err);
            } else {
                console.error("Response", response);
                res.status(200).json("El email para la reucperacion ha sido enviado")
            }
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router