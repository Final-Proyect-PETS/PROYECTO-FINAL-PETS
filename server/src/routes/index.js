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
const mercadopago = require("mercadopago");
const errorHandler = require("../utils/middlewares/errorHandler");

//payment
// const PaymentService = require("./payments/PaymentService");
// const PaymentController = require("./payments/PaymentControllers");

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
router.use("/register", register);
router.use("/login", login);
// router.use("/mercadopago", mercadopago);
router.use(errorHandler);

//-----payments

// const PaymentInstance = new PaymentController(new PaymentService());

// router.get("/linkpayment", function (req, res, next) {
//     PaymentInstance.getPaymentLink(req, res);
// });

// router.get("/subscription", function (req, res, next) {
//   PaymentInstance.getSubscriptionLink(req, res);
// });

//------------------------------------------------

router.get("/linkpayment", (req, res, next) => {
  //const id_orden = req.query.id

  const id_orden = 1;
  // cargamos el carrito de la bd
  const carrito = [
    {
      title: "Donación a Happy Tails",
      description: "",
      picture_url: "http://www.myapp.com/myimage.jpg",
      category_id: "category123",
      quantity: 1,
      //unidad de moneda dnd se encuentre la cuenta de MP asociada.
      unit_price: 10,
    },
  ];
  // Agrega credenciales
  mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN,
  });

  console.info("ml configured");

  const items_ml = carrito;
  console.info("carrito", items_ml);
  // Crea un objeto de preferencia
  let preference = {
    items: items_ml,
    external_reference: `${id_orden}`, //`${new Date().valueOf()}`,

    back_url: "https://locahost:3000/donations",
    //marketplace: Application_ID,
    /* marketplace_fee: 2.56,
    payer: {
      id: 699750543,
      nickname: "TESTR7BARI7Y"
    }*/
  };
  console.info("preference:", preference);
  mercadopago.preferences

    .create(preference)
    .then(function (response) {
      console.info("respondio");
      // Este valor reemplazará el string"<%= global.id %>" en tu HTML
      global.id = response.body.id;
      console.log(response.body);
      res.json({ id: global.id, init_point: response.body.init_point });
    })
    .catch(function (error) {
      console.log(error);
    });
});



module.exports = router;
