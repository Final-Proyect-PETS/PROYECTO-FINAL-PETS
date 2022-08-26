// const { PROD_ACCESS_TOKEN } = process.env;
// const { Router } = require("express");
// const router = Router();
// // SDK de Mercado Pago
// const mercadopago = require("mercadopago");

// router.get("/", (req, res, next) => {
//   //const id_orden = req.query.id

//   const id_orden = 1;
//   // cargamos el carrito de la bd
//   const carrito = [
//     {
//       title: "Donación a Happy Tails",
//       description: "",
//       picture_url: "http://www.myapp.com/myimage.jpg",
//       category_id: "category123",
//       quantity: 1,
//       //unidad de moneda dnd se encuentre la cuenta de MP asociada.
//       unit_price: 10,
//     },
//   ];
//   // Agrega credenciales
//   mercadopago.configure({
//     access_token: PROD_ACCESS_TOKEN,
//   });

//   console.info("ml configured");

//   const items_ml = carrito;
//   console.info("carrito", items_ml);
//   // Crea un objeto de preferencia
//   let preference = {
//     items: items_ml,
//     external_reference: `${id_orden}`, //`${new Date().valueOf()}`,

//     back_url: "https://locahost:3000/donations",
//     //marketplace: Application_ID,
//     /* marketplace_fee: 2.56,
//     payer: {
//       id: 699750543,
//       nickname: "TESTR7BARI7Y"
//     }*/
//   };
//   console.info("preference:", preference);
//   mercadopago.preferences
//     .create(preference)

//     .then(function (response) {
//       console.info("respondio");
//       // Este valor reemplazará el string"<%= global.id %>" en tu HTML
//       global.id = response.body.id;
//       console.log(response.body);
//       res.json({ id: global.id, init_point: response.body.init_point });
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// });

// module.exports = router;
