const connection = require("../db")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Router } = require('express');
const Pets = require("../models/pets");
const User = require("../models/users");
const router = Router();

router.get("/pets", async (req, res, next) => {
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

    router.get("/filterBySize", async (req, res) => {
         /* const array = [{
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
          */
        /* try{
            const filter = []
            for (let i = 0; i < array.length; i++){
                if(array.size) filter.push(i)
            } console.log(filter)
            res.send(filter)
            /* const filter = array.map(param => param.size)            
            console.log(filter.size)
            res.send( filter.size) 
        }catch(error){
            console.log(array)
        } */
        try{
            let { size } = req.body
            /* let { size } = req.query
            if (size === "medium") */
            if (size === "big")
            connection()
            const pet = await Pets.find({size: "big"})
            res.send(pet)
            if (size === "medium")
            connection()
            const pet2 = await Pets.find({size: "medium"})
            res.send(pet2)
            if(size === "small")
            connection()
            const pet3 = await Pets.find({size: "small"})
            res.send(pet3)
        }
        catch(error){
            console.log(error)
        }
    })

 router.get("/filterByType", async (req, res) => {
    let { type } = req.body
    if (type === "dog")
        connection()
        const dog = await Pets.find({type: "dog"})
        res.send(dog)
    if (type === "cat")
        connection()
        const cat = await Pets.find({type: "cat"})
        res.send(cat)
 })

 router.get("/bySortAge", async (req, res) => {
    connection()
    const asc = await Pets.find().sort({age:1})
    res.send(asc)
 })

 router.get("/bySortAge2", async (req, res) => {
    connection()
    const desc = await Pets.find().sort({age:-1})
    res.send(desc)
 })

 /* router.get("/bySortCreated", async (req, res) => {
    connection()
    const asc = await Pets.find().sort({timestamps: 1})
    res.send(asc)
 })                                                                         <---- SE NESECITA CAMBIOS
 
 router.get("/bySortCreated2", async (req, res) =>{
    connection()
    const desc = await Pets.find().sort({timestamps: -1})
    res.send(desc)
 }) */

 

    module.exports = router;