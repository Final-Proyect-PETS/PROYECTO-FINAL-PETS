import React from "react";
import NavBar from "../NavBar/NavBar";
import "../LandingPage.css";
import { useSelector } from "react-redux";
import { getUserProfile, paymentMp } from "../../redux/Actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { notificationSwal } from "../../utils/notificationSwal";
// import { useNavigate } from "react-router-dom";

export default function Donation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = localStorage.getItem("id");
  const user = useSelector((state) => state.userProfile);

  const payment = useSelector((state) => state.payment.id);
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(getUserProfile(id));
  }, [dispatch, id]);

  const [activeButton, setActive] = useState(true);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleClick(e) {
    e.preventDefault();
    console.log(e.target.value);
    dispatch(paymentMp(user._id, e.target.value));
    //por alguna razon, no tengo el payment una vez completada la action, viene despues, y por eso hace boludeces
    if (payment) {
      const script = document.createElement("script");
      const attr_data_preference =
        document.createAttribute("data-preference-id");
      attr_data_preference.value = payment;
      script.src =
        "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
      script.setAttributeNode(attr_data_preference);
      switch (e.target.value) {
        case "100":
          document.getElementById("form1").appendChild(script);
          break;
        case "200":
          document.getElementById("form2").appendChild(script);
          break;
        case "500":
          document.getElementById("form3").appendChild(script);
          break;

        default:
          break;
      }
    }
    // setActive(false)
  }

  function handleInput(e) {
    e.preventDefault();
    console.log(input);
    if (input.name && Number(input.name) > 0) {
      dispatch(paymentMp(user._id, input.name));
      //por alguna razon, no tengo el payment una vez completada la action, viene despues, y por eso hace boludeces
      if (payment) {
        const script = document.createElement("script");
        const attr_data_preference =
          document.createAttribute("data-preference-id");
        attr_data_preference.value = payment;
        script.src =
          "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
        script.setAttributeNode(attr_data_preference);
        document.getElementById("form0").appendChild(script);
      }
      // setActive(false)
    } else {
      notificationSwal(
        "¡Ooops!",
        "El monto a donar debe ser mayor a cero",
        "error",
        "Cancel"
      );
    }
  }

  //   const params = useLocation().search;
  //   const purchaseId = params.slice(params.indexOf('=') + 1, params.indexOf('&'));
  // const { token } = JSON.parse(window.localStorage.getItem('user'));

  return (
    <div id="landing" className="w-full">
      <div>
        <NavBar />
      </div>
      <div className="h-screen flex justify-center items-center flex-col pb-36 gap-24 backdrop-blur-sm">
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center items-center flex-col gap-5">
            <h1 className="text-6xl flex justify-center font-semibold">
              Hola {user.first_name} {user.last_name}!
            </h1>
            <h2 className="text-3xl font-semibold">
              Nosotros somos HappyTails!, una organización con la iniciativa de
              poder cuidar a nuestros amigos de 4 patas.
            </h2>
            <h2 className="text-2xl font-semibold">
              Cualquier donación hecha será aceptada con mucho amor y será
              destinada a mejorar la calidad de vida de los animales.
            </h2>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <h2 className="text-xl">
            Podes donar haciendo click en el siguiente botón:
          </h2>

          <input
            type="text"
            name="name"
            value={input.name}
            onChange={(e) => handleChange(e)}
            placeholder="Cantidad a donar"
          />
          <button
            type="submit"
            className="py-4 px-4 bg-yellow-900 hover:bg-yellow-900 focus:ring-yellow-600 focus:ring-offset-yellow-600 text-white w-44 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            onClick={(e) => handleInput(e)}
          >
            Generar orden de pago
          </button>

          <div>
            <form id="form0"></form>
          </div>
          <button
            value="100"
            className="py-4 px-4 bg-yellow-900 hover:bg-yellow-900 focus:ring-yellow-600 focus:ring-offset-yellow-600 text-white w-44 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            onClick={(e) => handleClick(e)}
            disabled={!activeButton}
          >
            Generar orden de pago por 100 pesos
          </button>
          <div>
            <form id="form1"></form>
          </div>
          <button
            value="200"
            className="py-4 px-4 bg-yellow-900 hover:bg-yellow-900 focus:ring-yellow-600 focus:ring-offset-yellow-600 text-white w-44 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            onClick={(e) => handleClick(e)}
            disabled={!activeButton}
          >
            Generar orden de pago por 200 pesos
          </button>
          <div>
            <form id="form2"></form>
          </div>
          <button
            value="500"
            className="py-4 px-4 bg-yellow-900 hover:bg-yellow-900 focus:ring-yellow-600 focus:ring-offset-yellow-600 text-white w-44 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            onClick={(e) => handleClick(e)}
            disabled={!activeButton}
          >
            Generar orden de pago por 500 pesos
          </button>
          <div>
            <form id="form3"></form>
          </div>

          {/* {payment ? <Comprar data={payment} /> : null} */}
        </div>
      </div>
    </div>
  );
}
