const { Router } = require("express");
const pets = require("./gets")
const users = require("./gets")
const userId = require("./gets")
const petId = require("./gets")
const filters = require("./filters")
const register = require("./register")
const login = require("./login")
const router = Router();
const postPet = require("./posts");
const patchPet = require("./patch")
const patchUser = require("./patch");
// const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/middlewares/errorHandler")
// const verifyToken = require('../utils/middlewares/validateToken');


router.use("/home", pets, users, userId, petId, filters, postPet, patchPet, patchUser)
router.use("/register", register)
router.use("/login", login)
router.use(errorHandler);


// router.patch("/users/:id", verifyToken, async (req, res, next) => {
//   const {
//     first_name,
//     last_name,
//     username,
//     email,
//     password,
//     image,
//     telephone,
//     about,
//   } = req.body;
//   try {
//     const oneUser = await User.findOne({
//       _id: req.params.id,
//     });
//     await oneUser.update({
//       first_name,
//       last_name,
//       username,
//       email,
//       password,
//       image,
//       telephone,
//       about,
//     });
//     res.status(200).json("Datos Actualizados Exitosamente 👌");
//   } catch (error) {
//     next(error);
//   }
// });


module.exports = router;
