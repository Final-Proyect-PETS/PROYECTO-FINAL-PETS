const { Router } = require("express");
const pets = require("./gets");
const users = require("./gets");
const userId = require("./gets");
const petId = require("./gets");
const filters = require("./filters");
const register = require("./register");
const login = require("./login");
const loginGoogle = require("./googlelogin");
const likes = require("./patch");
const router = Router();
const postPet = require("./posts");
const patchPet = require("./patch");
const patchUser = require("./patch");
const adopt = require("./patch");
const adoptionMail = require("./send-email");
const conversations = require("./conversations");
const messages = require("./messages");
const postImage = require("./posts");
const payment = require("./payment");
const responsePayment = require("./payment");
const forgotPassword = require("./forgotPassword");
const resetPassword = require("./resetPassword");
const patchReportedPets = require("./patch");
const patchReportedUsers = require("./patch");
const errorHandler = require("../utils/middlewares/errorHandler");

router.use(
  "/home",
  pets,
  users,
  userId,
  petId,
  filters,
  postPet,
  patchPet,
  patchUser,
  postImage,
  conversations,
  messages,
  adopt,
  likes,
  patchReportedPets,
  patchReportedUsers
);

router.use("/linkpayment", payment, responsePayment);
router.use("/register", register);
router.use("/login", login);
router.use("/", loginGoogle);
router.use("/mail", adoptionMail);
router.use("/", forgotPassword, resetPassword);
router.use(errorHandler);

module.exports = router;
