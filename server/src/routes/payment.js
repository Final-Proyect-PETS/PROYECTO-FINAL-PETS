const mercadopago = require("mercadopago");
const { Router } = require("express");
const verifyToken = require("../utils/middlewares/validateToken");
const router = Router();

router.get("/:email", verifyToken, (req, res, next) => {
  // const id_compra = req.query.id

  const id_orden = 1;

  // Agrega credenciales
  mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN,
  });

  let preference = {
    items: [{
      title: "Donación a Happy Tails",
      description: "",
      picture_url: "https://cdn-icons-png.flaticon.com/512/194/194279.png",
      category_id: "category123",
      quantity: 1,
      unit_price: 100,
    }],
    external_reference: `${id_orden}`, //`${new Date().valueOf()}`,
    back_urls: {
      success: "http://localhost:3000/donations",
      failure: "http://localhost:3000/home",
      pending: "https://localhost:3000/home",
    },
    /*payer: {
        id: 699750543,
        nickname: "TESTR7BARI7Y"
      }*/
  };
  // console.info("preference:", preference);

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      console.info("respondio");
      // Este valor reemplazará el string"<%= global.id %>" en tu HTML
      global.id = response.body.id;

      res.json({
        id: global.id,
        init_point: response.body.init_point,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

// router.get("/pagos", verifyToken, (req, res) =>{
//   return res.redirect("http://localhost:3000/home")
// })

module.exports = router;
