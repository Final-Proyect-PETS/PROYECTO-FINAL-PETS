const { Router } = require("express");
const pets = require("./gets");
const users = require("./gets");
const userId = require("./gets");
const petId = require("./gets");
const filters = require("./filters");
const register = require("./register");
const login = require("./login");
const router = Router();
const postPet = require("./posts");
const patchPet = require("./patch");
const patchUser = require("./patch");
const payment = require("./payment");
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
  patchUser
);

router.use("/linkpayment", payment);
router.use("/register", register);
router.use("/login", login);
router.use(errorHandler);

router.get("/feedback/:idDonor/:donationAmount", (req, res) => {
  const { payment_id, status } = req.query;
  const { idDonor, donationAmount } = req.params;
  console.log("aca estaaaaaa: " + donationAmount); //tengo id del usuario, id del pago, cantidad donada.
  console.log(status); //hacer que if status === approved, agregar los datos de la donacion a una propiedad del usuario
  return res.redirect("http://localhost:3000/donations");
});

module.exports = router;
