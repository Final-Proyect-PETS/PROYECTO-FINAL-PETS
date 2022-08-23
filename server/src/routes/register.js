const { Router } = require('express')
const { register } = require("../utils/controllers/register.js")

const router = Router()


router.post("/", async (req, res, next) => {
    let { first_name, last_name, username, email, password, image, telephone, about } = req.body
    console.log(req.body);
    try {
        const postUser = await register(first_name, last_name, username, email, password, image, telephone, about)
        console.log(postUser)
        res.status(201).send(postUser)
    } catch (err) {
        next(err)
    }
})

module.exports = router