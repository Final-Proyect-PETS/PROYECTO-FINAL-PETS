const { Router } = require("express");
const User = require("../models/users");
const Pets = require("../models/pets");
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
    deleted
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
      isAdopted,
      deleted
    );

    res.status(201).send(petPatch);
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
    deleted
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
      about,
      deleted
    );
    res.status(201).send(userPatch);
  } catch (error) {
    next(error);
  }
});

router.patch("/adopt", verifyToken, async (req, res, next) => {
  try {
    const { petId, userId, ownerId } = req.body;
    const user = await User.findOne({ _id: userId });

    await Pets.updateOne({ _id: petId }, { $set: { user: userId } });
    await User.updateOne(
      { _id: userId },
      { $set: { pets: [...user.pets, petId] } }
    );
    await User.updateOne({ _id: ownerId }, { $pull: { pets: petId } });

    const newpet = await Pets.findOne({ _id: petId });
    const newuser = await User.findOne({ _id: userId });

    res.status(200).send("ADOPTED SSUCCESS");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
