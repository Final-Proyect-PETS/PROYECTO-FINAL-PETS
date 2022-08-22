const connection = require("../db");
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
    const arrayPets = await Pets.find().populate("user");
    ///CAMBIE LOGICA,EN VEZ DE === USE .INCLUDES y || para mas placer
    if (name) {
      let petFound = arrayPets.filter(
        (p) =>
          p.name?.toLowerCase().includes(name.toLowerCase()) ||
          p.place?.toLowerCase().includes(name.toLowerCase()) ||
          p.type?.toLowerCase().includes(name.toLowerCase()) ||
          p.age?.toString().includes(name)
      );
      if (petFound.length) res.send(petFound);
      else res.send(arrayPets);
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
      //LOGICA CAMBIADO CON .INCLUDES Y || PARA MAS PLACERR
      let userFound = arrayUsers.filter(
        (u) =>
          u.username?.toLowerCase().includes(name.toLowerCase()) ||
          u.first_name?.toLowerCase().includes(name.toLowerCase()) ||
          u.last_name?.toLowerCase().includes(name.toLowerCase()) ||
          u.email?.toLowerCase().includes(name.toLowerCase())
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
    imagePool,
    type,
    description,
    size,
    age,
    vaccination,
    castrated,
    place,
    gender,
  } = req.body;

  try {
    connection();
    console.log("conectado a users");
  } catch (error) {
    next(error);
  }

  try {
    const foundUser = await User.findById(id);

    const newPet = new Pets({
      name,
      image,
      imagePool,
      type,
      description,
      size,
      age,
      vaccination,
      castrated,
      place,
      gender,
      user: foundUser._id,
    });
    await newPet.save();
    foundUser.pets.push(newPet._id);
    await foundUser.save();
    res.status(201).json(newPet);
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
      id: req.params.id,
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

router.patch("/pets", async (req, res, next) => {
  const {
    id,
    name,
    image,
    type,
    description,
    size,
    age,
    vaccination,
    castrated,
    place,
    gender,
  } = req.body;
  try {
    const onePet = await Pets.findOne({
      id: req.params.id,
    });
    await onePet.update({
      id,
      name,
      image,
      type,
      description,
      size,
      age,
      vaccination,
      castrated,
      place,
      gender,
    });
    res.status(200).json("Los Datos de Tu Mascota se actualizaron exitosamente 🐶 ");
  } catch (error) {
    next(error);
  }
});

router.get("/filters", async (req, res, next) => {
  try {
    connection();
    let {
      age,
      creation_date,
      vaccinated,
      castrated,
      location,
      pet_type,
      pet_size,
      pet_age,
      gender,
    } = req.query;
    let all = await Pets.find().populate("user");

    if (age === "young") {
      all = all.filter((ev) => ev.age < 6);
    }
    if (age === "adult") {
      all = all.filter((ev) => ev.age > 5 && ev.age < 10);
    }
    if (age === "old") {
      all = all.filter((ev) => ev.age > 9);
    }
    if (castrated === "true") {
      all = all.filter((ev) => ev.castrated === true);
    }
    if (castrated === "false") {
      all = all.filter((ev) => ev.castrated === false);
    }
    if (pet_size === "big") {
      all = all.filter((ev) => ev.size === "big");
    }
    if (pet_size === "medium") {
      all = all.filter((ev) => ev.size === "medium");
    }
    if (pet_size === "small") {
      all = all.filter((ev) => ev.size === "small");
    }
    if (pet_type === "cat") {
      all = all.filter((ev) => ev.type === "cat");
    }
    if (pet_type === "dog") {
      all = all.filter((ev) => ev.type === "dog");
    }
    if (vaccinated === "yes") {
      all = all.filter((ev) => ev.vaccination === "yes");
    }
    if (vaccinated === "no") {
      all = all.filter((ev) => ev.vaccination === "no");
    }
    if (vaccinated === "unknown") {
      all = all.filter((ev) => ev.vaccination === "unknown");
    }
    if (gender === "female"){
      all = all.filter((ev => ev.gender === "female"))
    }
    if (gender === "male"){
      all = all.filter((ev => ev.gender === "male"))
    }
    res.send(all);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
