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
const errorHandler = require("../utils/middlewares/errorHandler")
//payment
const PaymentService = require("./payments/PaymentService");
const PaymentController = require("./payments/PaymentControllers");

router.use("/home", pets, users, userId, petId, filters, postPet, patchPet, patchUser)
router.use("/register", register)
router.use("/login", login)
router.use(errorHandler);

//-----payments

const PaymentInstance = new PaymentController(new PaymentService());

  router.get("/linkpayment", function (req, res, next) {
    PaymentInstance.getPaymentLink(req, res);
  });
  
  router.get("/subscription", function (req, res, next) {
    PaymentInstance.getSubscriptionLink(req, res);
  });
  
module.exports = router;
