const { Router } = require("express");
const petReport = require("../models/petReports");
const userReport = require("../models/userReports");
const User = require("../models/users");
const Pets = require("../models/pets");
const verifyToken = require("../utils/middlewares/validateToken");

const router = Router();

router.post("/reportpet", verifyToken, async (req, res, next) => {
  const { informerId, reportedPetId, reason } = req.body;
  try {
    const oneUser = await User.findOne({ _id: informerId });
    const onePet = await Pets.findOne({ _id: reportedPetId });

    if (onePet && oneUser) {
      const newPetReport = new petReport({
        informerId: oneUser._id,
        informerFirstName: oneUser.first_name,
        informerLastName: oneUser.last_name,
        reportedPetId: onePet._id,
        reason: reason,
      });
      await newPetReport.save();
    } else return res.status(401).send("Hubo un error, intente mas tarde");
    res.status(201).send("OK");
  } catch (error) {
    next(error);
  }
});

router.post("/reportuser", verifyToken, async (req, res, next) => {
  const { informerId, reportedUserId, reason } = req.body;
  try {
    const oneInformer = await User.findOne({ _id: informerId });
    const oneReportedUser = await User.findOne({ _id: reportedUserId });

    if (oneInformer && oneReportedUser) {
      const newUserReport = new userReport({
        informerId: oneInformer._id,
        informerFirstName: oneInformer.first_name,
        informerLastName: oneInformer.last_name,
        reportedUserId: oneReportedUser._id,
        reportedFirstName: oneReportedUser.first_name,
        reportedLastName: oneReportedUser.last_name,
        reason: reason,
      });
      await newUserReport.save();
    } else return res.status(401).send("Hubo un error, intente mas tarde");
    res.status(201).send("OK");
  } catch (error) {
    next(error);
  }
});

router.get("/reportpet", verifyToken, async (req, res, next) => {
  try {
    const arrayReportedPets = await petReport.find();
    res.status(201).json(arrayReportedPets);
  } catch (error) {
    next(error);
  }
});

router.get("/reportuser", verifyToken, async (req, res, next) => {
  try {
    const arrayReportedUsers = await userReport.find();
    res.status(201).json(arrayReportedUsers);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
