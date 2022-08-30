const { Router } = require("express");
const pets = require("./gets");
const users = require("./gets");
const userId = require("./gets");
const petId = require("./gets");
const filters = require("./filters");
const register = require("./register");
const login = require("./login");
const loginGoogle = require("./googlelogin");
const router = Router();
const postPet = require("./posts");
const patchPet = require("./patch");
const patchUser = require("./patch");
const adoptionMail = require("./send-email");
const postImage = require("./posts");
const payment = require("./payment");
const responsePayment = require("./payment");
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
  postImage
);

router.use("/linkpayment", payment, responsePayment);
router.use("/register", register);
router.use("/login", login);
router.use("/", loginGoogle);
router.use("/mail", adoptionMail);
router.use(errorHandler);

<<<<<<< HEAD
router.get("/feedback/:idDonor/:donationAmount", async (req, res, next) => {
  const { payment_id, status } = req.query;
  const { idDonor, donationAmount } = req.params;
  if (status === "approved") {
    try {
      const oneUser = await User.findOne({ _id: idDonor });
      oneUser.donations.push({
        paymentId: payment_id,
        status: status,
        donationAmount: Number(donationAmount),
      });
      await oneUser.save();
    } catch (error) {
      next(error);
    }

    return res.redirect("http://localhost:3000/donationsuccessful");
  }
  if (status === "in_process" || status === "pending")
    return res.redirect("http://localhost:3000/donationpending");
  if (status === "rejected")
    return res.redirect("http://localhost:3000/donationcancelled");
});

=======
>>>>>>> 61c8539aa3c10d8628a10bd2ef04cb7c87630a57
module.exports = router;

