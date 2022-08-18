const connection = require("../db");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Router } = require("express");
const Pets = require("../models/pets");
const User = require("../models/users");
const router = Router();

router.get("/pets", async (req, res, next) => {
    try {
        connection();
        console.log("conectado");
    } catch (err) {
        console.error(err);
    }
    try {
        const arrayPets = await Pets.find().populate("user");
        res.send(arrayPets);
    } catch (error) {
        next(error);
    }
});
router.get("/users", async (req, res, next) => {
    try {
        connection();
        console.log("conectado a users");
    } catch (err) {
        console.error(err);
    }
    try {
        const arrayUsers = await User.find().populate("pets")
        res.send(arrayUsers)
    } catch (error) {
        next(error);
    }
})
router.post("/users", (req, res, next) => {
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

            pets: req.body.pets,
        });

        post.save().then((per) => res.json(per));
    } catch (error) {
        next(error);
    }
})
router.get("/users/:id", async (req, res, next) => {
    try {
        connection();
        console.log("conectado a users id");
    } catch (err) {
        next(err);
    }
    try {
        const arrayUsers = await User.findById(req.params.id).populate("pets")
        res.send(arrayUsers)
    } catch (error) {
        next(error);
    }
})
router.get("/pets/:id", async (req, res, next) => {
    try {
        connection();
        console.log("conectado a pets id");
    } catch (err) {
        next(err);
    }
    try {
        const arrayPets = await Pets.findById(req.params.id).populate("user");
        res.send(arrayPets);
    } catch (error) {
        next(error);
    }
})


router.post("/pets/:id", async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    const {
        name,
        image,
        type,
        description,
        size,
        age,
        vaccination,
        castrated,
        place,
    } = req.body;

    try {
        connection();
        console.log("conectado a users");
    } catch (error) {
        next(error);
    }


    try {
        const foundUser = await User.findById(id);
        // const date = new Date().toISOString().slice(0, 10);
        // const date = new Date();
        // const now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
        //     date.getUTCDate())
        //  const dateAdded = new Date(now_utc).toISOString().slice(0, 10);


        const newPet = new Pets({
            name,
            image,
            type,
            description,
            size,
            age,
            vaccination,
            castrated,
            place,
            user: foundUser._id,
        });
        await newPet.save();
        res.status(201).json(newPet);
    } catch (error) {
        next(error);
    }
});

router.get("/filterBySize", async (req, res) => {
    try {
        let { size } = req.query;
        if (size === "big") {
            connection();
            const pet = await Pets.find({ size: "big" });
            res.send(pet);
        }
        if (size === "medium") {
            connection();
            const pet2 = await Pets.find({ size: "medium" });
            res.send(pet2);
        }
        if (size === "small") {
            connection();
            const pet3 = await Pets.find({ size: "small" });
            res.send(pet3);
        }
    } catch (error) {
        console.log(error);
    }
});

router.get("/filterByType", async (req, res, next) => {
    let { type } = req.body;
    try {
        if (type === "dog") connection();
        const dog = await Pets.find({ type: "dog" });
        res.send(dog);
        if (type === "cat") connection();
        const cat = await Pets.find({ type: "cat" });
        res.send(cat);
    } catch (error) {
        next(error);
    }
});

router.get("/bySortAge", async (req, res, next) => {
    try {
        connection();
        const asc = await Pets.find().sort({ age: 1 });
        res.send(asc);
    } catch (error) {
        next(error);
    }
});

router.get("/bySortAge2", async (req, res, next) => {
    try {
        connection();
        const desc = await Pets.find().sort({ age: -1 });
        res.send(desc);
    } catch (error) {
        next(error);
    }
})
router.get("/bySortDate", async (req, res, next) => {
    try {
        connection();
        const date = await Pets.find().sort({ createdAt: -1 });
        res.send(date);
    } catch (error) {
        next(error);
    }
})
router.get("/bySortDate2", async (req, res, next) => {
    try {
        connection();
        const date2 = await Pets.find().sort({ createdAt: 1 });
        res.send(date2);
    } catch (error) {
        next(error);
    }
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
/* fa6ed9174372874b8ad5d5c9e243064dbde44624 jeje */

