const connection = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Router } = require("express");
const Pets = require("../models/pets");
const User = require("../models/users");
const router = Router();

router.get("/pets", async (req, res, next) => {
  const name = req.query.name;
  try {
    connection();
    console.log("conectado");
  } catch (err) {
    console.error(err);
  }
  try {
    const arrayPets = await Pets.find();
    if (name) {
      let petFound = arrayPets.filter(
        (p) => p.name.toLowerCase() === name.toLowerCase()
      );
      if (petFound.length) res.send(petFound);
      else res.send(["Pet not found"]);
    } else {
      res.send(arrayPets);
    }
  } catch (error) {
    next(error);
  }
});
router.get("/users", async (req, res, next) => {
  const name = req.query.name;
  try {
    connection();
    console.log("conectado a users");
  } catch (err) {
    console.error(err);
  }
  try {
    const arrayUsers = await User.find().populate("pets");
    if (name) {
      let userFound = arrayUsers.filter(
        (u) => u.username.toLowerCase() === name.toLowerCase()
      );
      if (userFound.length) res.send(userFound);
      else {
        userFound = arrayUsers.filter((u) => u.email === name);
        if (userFound.length) res.send(userFound);
        else {
          userFound = arrayUsers.filter(
            (u) => u.first_name.toLowerCase() === name.toLowerCase()
          );
          if (userFound.length) res.send(userFound);
          else {
            userFound = arrayUsers.filter(
              (u) => u.last_name.toLowerCase() === name.toLowerCase()
            );
            if (userFound.length) res.send(userFound);
            else res.send(["User not found"]);
          }
        }
      }
    } else {
      res.send(arrayUsers);
    }
  } catch (error) {
    next(error);
  }
});

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
});
router.get("/users/:id", async (req, res, next) => {
  try {
    connection();
    console.log("conectado a users id");
  } catch (err) {
    next(err);
  }
  try {
    const arrayUsers = await User.findById(req.params.id).populate("pets");
    res.send(arrayUsers);
  } catch (error) {
    next(error);
  }
});
router.get("/pets/:id", async (req, res, next) => {
  try {
    connection();
    next("conectado a pets id");
  } catch (err) {
    next(err);
  }
  try {
    const arrayPets = await Pets.findById(req.params.id).populate("user");
    res.send(arrayPets);
  } catch (error) {
    next(error);
  }
});

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

router.get("/filterBySize", async (req, res, next) => {
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
    next(error);
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
});
router.get("/bySortDate", async (req, res, next) => {
  try {
    connection();
    const date = await Pets.find().sort({ createdAt: -1 });
    res.send(date);
  } catch (error) {
    next(error);
  }
});
router.get("/bySortDate2", async (req, res, next) => {
  try {
    connection();
    const date2 = await Pets.find().sort({ createdAt: 1 });
    res.send(date2);
  } catch (error) {
    next(error);
  }
});

router.patch("/users", async (req, res, next) => {
  const {
    first_name,
    last_name,
    username,
    email,
    password,
    image,
    telephone,
    about,
  } = req.body;
  try {
    const oneUser = await User.findOne({
      _id: req.body._id,
    });

    await oneUser.update({
      first_name,
      last_name,
      username,
      email,
      password,
      image,
      telephone,
      about,
    });
    res.status(200).json("Datos Actualizados Exitosamente 👌");
  } catch (error) {
    next(error);
  }
});

router.patch("/pets", async (req, res) => {
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
    const onePet = await Pets.findOne({
      _id: req.body._id,
    });
    await onePet.update({
      name,
      image,
      type,
      description,
      size,
      age,
      vaccination,
      castrated,
      place,
    });
    res
      .status(200)
      .json("Los Datos de Tu Mascota se actualizaron exitosamente 🐶 ");
  } catch (error) {
    next(error);
  }
});

router.get("/filterByVaccination", async (req, res, next) => {
  let { vaccination } = req.body;
  try {
    if (vaccination === "yes") connection();
    const yes = await Pets.find({ vaccination: "yes" });
    res.send(yes);
    if (vaccination === "no") connection();
    const no = await Pets.find({ vaccination: "no" });
    res.send(no);
    if (vaccination === "unknown") connection();
    const unknown = await Pets.find({ vaccination: "unknown" });
    res.send(unknown);
  } catch (error) {
    next(error);
  }
});

router.get("/filterByCastrated", async (req, res, next) => {
  let { castrated } = req.body;
  try {
    if (castrated === true) connection();
    const yes = await Pets.find({ castrated: true });
    res.send(yes);
    if (castrated === false) connection();
    const no = await Pets.find({ castrated: false });
    res.send(no);
  } catch (error) {
    next(error);
  }
});

router.get("/filterByPlace", async (req, res, next) => {
  let { place } = req.body;
  try {
    connection();
    const pet = await Pets.find({ place: place });
    res.send(pet);
  } catch (error) {
    next(error);
  }
});

router.get("/filterByAge", async (req, res, next) => {
  let { age } = req.query;
  try {
    let pet;
    connection();
    if (age === "young") {
      pet = await Pets.find({ age: { $lt: 6 } });
      res.send(pet);
    }
    if (age === "adult") {
      pet = await Pets.find({ age: { $gt: 5, $lt: 10 } });
      res.send(pet);
    }
    if (age === "old") {
      pet = await Pets.find({ age: { $gt: 9 } });
      res.send(pet);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
