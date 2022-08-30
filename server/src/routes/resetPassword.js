const { Router } = require("express");
const router = Router();
const User = require("../models/users")
const bcrypt = require("bcrypt")

router.patch("/resetpassword/:id", async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10)
        const userResetPassword = await User.findOne({ _id: req.params.id })
        await userResetPassword.update({ password: req.body.password })
        res.status(201).send({
            message: "Contraseña cambiada con exito"
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router