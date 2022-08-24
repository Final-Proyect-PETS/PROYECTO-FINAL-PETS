const { Router } = require("express");
const { patchPet, patchUser } = require("../utils/controllers/patch.js");
const verifyToken = require("../utils/middlewares/validateToken");
const router = Router();

router.patch("/pets/:id", verifyToken, async (req, res, next) => {
  const _id = req.params.id;
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
    gender,
    isAdopted,
  } = req.body;
  try {
    const petPatch = await patchPet(
      _id,
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
      isAdopted
    );
    res.status(201).send("actualizado");
  } catch (error) {
    next(error);
  }
});

router.patch("/users/:id", verifyToken, async (req, res, next) => {
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
    const userPatch = await patchUser(
      req.params.id,
      first_name,
      last_name,
      username,
      email,
      password,
      image,
      telephone,
      about
    );
    res.status(201).send(userPatch);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
