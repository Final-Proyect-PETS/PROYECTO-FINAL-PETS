const mercadopago = require("mercadopago");
const { Router } = require("express");
const verifyToken = require("../utils/middlewares/validateToken");
const router = Router();
const User = require("../models/users");

router.get("/:idDonor/:donationAmount", verifyToken, async (req, res, next) => {
  // const id_compra = req.query.id
  const { idDonor, donationAmount } = req.params;

  const id_orden = 1;

  // Agrega credenciales
  mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN,
  });

  try {
    const oneUser = await User.findOne({ _id: idDonor });
    console.log(oneUser);
    let preference = {
      items: [
        {
          title: "Donación a Happy Tails",
          description: "",
          picture_url: "https://cdn-icons-png.flaticon.com/512/194/194279.png",
          category_id: "category123",
          quantity: 1,
          unit_price: Number(donationAmount),
        },
      ],
      external_reference: `${id_orden}`, //`${new Date().valueOf()}`,
      back_urls: {
        success: `http://localhost:3001/feedback/${idDonor}/${donationAmount}`,
        failure: `http://localhost:3001/feedback/${idDonor}/${donationAmount}`,
        pending: `http://localhost:3001/feedback/${idDonor}/${donationAmount}`,
      },
      payer: {
        name: oneUser.first_name,
        surname: oneUser.last_name,
        //email: oneUser.email,
        email: "test_user_80969189@testuser.com",
      },
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
  } catch (error) {
    next(error);
  }
});

module.exports = router;
