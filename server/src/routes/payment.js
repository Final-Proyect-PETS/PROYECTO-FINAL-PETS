require("dotenv").config();
const mercadopago = require("mercadopago");
const { Router } = require("express");
const verifyToken = require("../utils/middlewares/validateToken");
const router = Router();
const User = require("../models/users");
const axios = require("axios");

router.get("/:idDonor/:donationAmount", verifyToken, async (req, res, next) => {
  const { idDonor, donationAmount } = req.params;

  const id_orden = 1;

  // Agrega credenciales
  mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN,
  });

  try {
    const oneUser = await User.findOne({ _id: idDonor });
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
        success: `http://localhost:3001/linkpayment/feedback/${idDonor}/${donationAmount}`,
        failure: `http://localhost:3001/linkpayment/feedback/${idDonor}/${donationAmount}`,
        pending: `http://localhost:3001/linkpayment/feedback/${idDonor}/${donationAmount}`,
      },
      payer: {
        name: oneUser.first_name,
        surname: oneUser.last_name,
        // email: oneUser.email,           // no olvidarse de descomentar este email, el de abajo esta hardcodeado
        email: "test_user_80969189@testuser.com",
      },
    };

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

router.get("/feedback/:idDonor/:donationAmount", async (req, res, next) => {
  const { payment_id } = req.query;
  const { idDonor } = req.params; //el donationAmount que traigo por params en esta ruta no lo estoy usando, pero si se lo saco, se rompe todo y no se por qué
  try {
    let donationDetail = await axios.get(
      `https://api.mercadopago.com/v1/payments/${payment_id}/?access_token=${process.env.ACCESS_TOKEN}`
    );
    const { date_approved, status, status_detail, transaction_amount } =
      donationDetail.data;
    if (status === "approved" && status_detail === "accredited") {
      const oneUser = await User.findOne({ _id: idDonor });
      oneUser.donations.push({
        paymentId: payment_id,
        date: date_approved,
        status: status,
        statusDetail: status_detail,
        donationAmount: transaction_amount,
      });
      await oneUser.save();
      return res.redirect("http://localhost:3000/donationsuccessful");
    }
    if (status === "in_process" || status === "pending")
      return res.redirect("http://localhost:3000/donationpending");
    if (status === "rejected")
      return res.redirect("http://localhost:3000/donationcancelled");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
