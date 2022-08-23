const connection = require("../db");
const { Router } = require("express");
const Pets = require("../models/pets");
const User = require("../models/users");
const pets = require("./gets")
const users = require("./gets")
const userId = require("./gets")
const petId = require("./gets")
const filters = require("./filters")
const register = require("./register")
const router = Router();
const jwt = require("jsonwebtoken");
const verifyToken = require('../utils/middlewares/validateToken');


router.use("/home", verifyToken, pets, users, userId, petId, filters)
router.use("/register", register)



router.post("/login", async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).send("Usuario no encontrado");
  console.log(req.body.password);
  console.log(user.password);
  const passwordIsValid = await user.comparePassword(req.body.password, user.password);
  if (!passwordIsValid) return res.status(401).send("Contraseña incorrecta");
  const token = jwt.sign({ id: user._id, }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  const id = user.id
  res.header("token", token).json({ error: null, data: { token }, id: { id } });
})

router.post("/pets/:id", verifyToken, async (req, res, next) => {
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

router.patch("/users", verifyToken, async (req, res, next) => {
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

router.patch("/pets", verifyToken, async (req, res, next) => {
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
    res
      .status(200)
      .json("Los Datos de Tu Mascota se actualizaron exitosamente 🐶 ");
  } catch (error) {
    next(error);
  }
});


module.exports = router;
