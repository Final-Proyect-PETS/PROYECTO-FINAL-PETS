const connection = require("../db")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Router } = require('express');
const Pets = require("../models/pets");
const User = require("../models/users");
const router = Router();

router.get("/", async (req, res, next) => {
    try {
        connection()
        console.log("conectado");
    } catch (err) {
        console.error(err)
    }
    try {
        const arrayPets = await Pets.find()
        res.send(arrayPets)
    } catch (error) {
        next(error);
    }
})
router.get("/users", async (req, res, next) => {
    try {
        connection()
        console.log("conectado a users");
    } catch (err) {
        console.error(err);
    }
    try {
        const arrayUsers = await User.find()
        res.send(arrayUsers)
    } catch (error) {
        next(error);
    }
}),
    router.post("/users", (req, res) => {
        try {
            const post = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                image: req.body.image,
                telephone: req.body.telephone,
                about: req.body.about,
                pets: req.body.pets
            })
            post.save().then(per => res.json(per))
        } catch (error) {
            console.error(error);
        }
    }),

    router.get("/filterBySize", (req, res) => {
        const perro = [{
        name: "pepe",
        image: "www",
        type: "dog",
        description: "dkfsal",
        size: "grande",
        age: 10,
        vaccination: "rabia",
        castrated: true,
        place: "argentina",
            
        },
        {
        name: "pepe2",
        image: "www",
        type: "dog",
        description: "dkfsal",
        size: "pequeño",
        age: 10,
        vaccination: "rabia",
        castrated: true,
        place: "argentina",
        }]
    /*     const pets = [Pets] */
        try{
            const filter = perro.filter(value => value === perro.size)
            res.send(perro)
        } catch(error){
            console.log(error)
        }
    })

    module.exports = router;