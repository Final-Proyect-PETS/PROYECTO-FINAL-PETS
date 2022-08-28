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
const User = require("../models/users");

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

router.get("/feedback/:idDonor/:donationAmount", async (req, res, next) => {
  const { payment_id, status } = req.query;
  const { idDonor, donationAmount } = req.params;
  if (status === "approved") {
    try {
      const oneUser = await User.findOne({ _id: idDonor });
      oneUser.donations.push({
        "Payment id": payment_id,
        Status: status,
        "Donation amount": donationAmount,
      });
      await oneUser.save();
    } catch (error) {
      next(error);
    }
  }
  return res.redirect("http://localhost:3000/donations");
});


module.exports = router;

