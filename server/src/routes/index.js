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
const adoptionMail = require("./send-email")
const errorHandler = require("../utils/middlewares/errorHandler")

router.use("/home", pets, users, userId, petId, filters, postPet, patchPet, patchUser)
router.use("/register", register)
router.use("/login", login)
router.use("/mail", adoptionMail)
router.use(errorHandler);

module.exports = router;
