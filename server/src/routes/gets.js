const { Router } = require('express')
const { getPets, getUsers, userId, petId } = require('../utils/controllers/gets.js')

const router = Router()


router.get("/pets", async (req, res, next) => {
    try {
        const pets = await getPets(req.query.name)
        res.status(200).send(pets)
    } catch (err) {
        next(err)
    }
})

router.get("/users", async (req, res, next) => {
    try {
        const users = await getUsers(req.query.name)
        res.status(200).send(users)
    } catch (err) {
        next(err)
    }
})

router.get("/users/:id", async (req, res, next) => {
    try {
        const user = await userId(req.params.id)
        res.status(200).send(user)
    } catch (err) {
        next(err)
    }
})

router.get("/pets/:id", async (req, res, next) => {
    try {
        const pet = await petId(req.params.id)
        res.status(200).send(pet)
    } catch (err) {
        next(err)
    }
})

module.exports = router