const mercadopago = require("mercadopago");
const { Router } = require("express");
const verifyToken = require("../utils/middlewares/validateToken")
const router = Router();

router.get("/:email", verifyToken, (req, res, next) => {
    // const id_compra = req.query.id
    
    const id_orden = 1;
    // cargamos el carrito de la bd
    const carrito = [
      {
        title: "Donación a Happy Tails",
        description: "",
        picture_url: "https://cdn-icons-png.flaticon.com/512/194/194279.png",
        category_id: "category123",
        quantity: 1,
        //unidad de moneda dnd se encuentre la cuenta de MP asociada.
        unit_price: 100,
      },
    ];
  
    // Agrega credenciales
    mercadopago.configure({
      access_token: process.env.ACCESS_TOKEN,
    });
  
    const items_ml = carrito;
    // Crea un objeto de preferencia
    let preference = {
      items: items_ml,
      external_reference: `${id_orden}`, //`${new Date().valueOf()}`,
      back_url: "https://locahost:3000/donations",
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
          init_point: response.body.init_point 
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  });
  
  module.exports = router