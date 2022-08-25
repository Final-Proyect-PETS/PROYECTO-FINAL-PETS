const axios = require("axios");

class PaymentService {
  //crea un link de pago
  async createPayment() {
    const url = "https://api.mercadopago.com/checkout/preferences";

    const body = {
      //payer-email -> usuario comprador
      payer_email: "test_user_80969189@testuser.com",
      items: [
        {
          title: "Donación a Happy Tails",
          description: "",
          picture_url: "http://www.myapp.com/myimage.jpg",
          category_id: "category123",
          quantity: 1,
          //unidad de moneda dnd se encuentre la cuenta de MP asociada.
          unit_price: 10,
        },
      ],
      back_url: "https://locahost:3000/donations",

      // back_urls: {
      //   failure: "https://locahost:3000/donations",
      //   pending: "/pending",
      //   success: "/success"
      // }
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer APP_USR-3337857880360419-082317-ee4e1d4f9bb57743e23b718f2bb462ef-1185072042`,
      },
    });
    console.log(payment.data);
    return payment.data;
  }

  //crea una suscripcion
  async createSubscription() {
    const url = "https://api.mercadopago.com/preapproval";

    const body = {
      reason: "Suscripción de ejemplo",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 10,
        currency_id: "ARS",
      },
      //una vez hecho el pago esta la url de re-direccion
      back_url: "https://google.com.ar",
      //payer-email -> usuario comprador
      payer_email: "test_user_80969189@testuser.com",
    };

    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer APP_USR-3337857880360419-082317-ee4e1d4f9bb57743e23b718f2bb462ef-1185072042`,
      },
    });

    return subscription.data;
  }
}

module.exports = PaymentService;
