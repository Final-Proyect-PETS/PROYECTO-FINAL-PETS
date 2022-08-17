const connection = require("../db");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Router } = require("express");
const Pets = require("../models/pets");
const User = require("../models/users");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    connection();
    console.log("conectado");
  } catch (err) {
    console.error(err);
  }
  try {
    const arrayPets = await Pets.find();
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
    const arrayUsers = await User.find();
    res.send(arrayUsers);
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
        pets: req.body.pets,
      });
      post.save().then((per) => res.json(per));
    } catch (error) {
      console.error(error);
    }
  }),
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
    } catch (err) {
      console.error(err);
    }

    try {
      const foundUser = await User.findById(id); //valido que el id que me pasan del front por params exista en mi db

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
      const savedPet = await newPet.save();
      foundUser.pets = foundUser.pets.concat(savedPet._id);
      await foundUser.save();
      res.status(201).json(newPet);
    } catch (error) {
      next(error);
    }
  }),
  (module.exports = router);
