const googlelogin = require('../utils/controllers/googlelogin');
const { Router } = require('express')
const router = Router()
const User = require("../models/users")
const jwt = require("jsonwebtoken")
const { OAuth2Client } = require("google-auth-library")
const client = new OAuth2Client("841685042609-24rmh0gcg16vvfl3j8cgrll1nr23pi04.apps.googleusercontent.com")



router.post("/logingoogle", async (req, res) => {
    const { tokenId } = req.body;

    client.verifyIdToken({ idToken: tokenId, audience: "841685042609-24rmh0gcg16vvfl3j8cgrll1nr23pi04.apps.googleusercontent.com" }).then(response => {
        const { email_verified, given_name, family_name, name, email } = response.payload
        console.log(email_verified)
        if (email_verified) {
           User.findOne({ email }).exec(async (err, user) => {
                if (err) {
                    console.log("entro al error")
                    return res.status(400).json({
                        error: "Algo salio mal en el user.findOne linea 16 controllers/googlelogin", err
                    })
                } else {
                    if (user) {
                        console.log("entro al ifuser")
                        let id = user._id
                        const token = jwt.sign({ id: id }, process.env.SECRET_KEY)
                        console.log(token);
                        res.header("token", token).json({ error: null, data: { token }, id: { id } })
                    } else {
                        try {
                            let newUser = new User({
                                first_name: given_name,
                                last_name: family_name,
                                email: email,
                            })
                            await newUser.save()
                                let id = newUser._id
                                const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY)
                                res.header("token", token).json({ error: null, data: { token }, id: { id } })
                        } catch (error) {
                            console.log(error)
                        }
                    }
                }

            })
        }
    })
})

module.exports = router