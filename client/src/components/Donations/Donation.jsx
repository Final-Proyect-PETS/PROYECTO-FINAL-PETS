import React from "react";
import NavBar from "../NavBar/NavBar";
import "./Donations.css";
import { useSelector } from "react-redux";
import { getUserProfile, paymentMp } from "../../redux/Actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { notificationSwal } from "../../utils/notificationSwal";
//import { useLocation } from "react-router-dom";

export default function Donation() {
  const dispatch = useDispatch();

  const id = localStorage.getItem("id");
  const user = useSelector((state) => state.userProfile);

  const [input, setInput] = useState("");
  const [generating0, setGenerating0] = useState(false);
  const [generating1, setGenerating1] = useState(false);
  const [generating2, setGenerating2] = useState(false);
  const [generating3, setGenerating3] = useState(false);
  // const [disable0, setDisable0] = useState(false);
  const [disable1, setDisable1] = useState(false);
  const [disable2, setDisable2] = useState(false);
  const [disable3, setDisable3] = useState(false);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleClick(e) {
    e.preventDefault();
    switch (e.target.value) {
      case "100":
        setGenerating1(true);
        break;
      case "200":
        setGenerating2(true);
        break;
      case "500":
        setGenerating3(true);
        break;
      default:
        return null;
    }
    dispatch(paymentMp(user._id, e.target.value)).then((payment) => {
      const script = document.createElement("script");
      const attr_data_preference =
        document.createAttribute("data-preference-id");
      attr_data_preference.value = payment.payload.id;
      script.src =
        "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
      script.setAttributeNode(attr_data_preference);
      switch (e.target.value) {
        case "100":
          document.getElementById("form1").appendChild(script);
          setGenerating1(false);
          setDisable1(true);
          break;
        case "200":
          document.getElementById("form2").appendChild(script);
          setGenerating2(false);
          setDisable2(true);
          break;
        case "500":
          document.getElementById("form3").appendChild(script);
          setGenerating3(false);
          setDisable3(true);
          break;

        default:
          break;
      }
    });
  }

  function handleInput(e) {
    e.preventDefault();
    if (input.name && Number(input.name) > 0) {
      setGenerating0(true);
      dispatch(paymentMp(user._id, input.name))
        .then((payment) => {
          const script = document.createElement("script");
          const attr_data_preference =
            document.createAttribute("data-preference-id");
          attr_data_preference.value = payment.payload.id;
          script.src =
            "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
          script.setAttributeNode(attr_data_preference);
          document.getElementById("form0").appendChild(script);
        })
        .then(() => {
          setGenerating0(false);
        });
    } else if (input.name && isNaN(input.name)) {
      notificationSwal(
        "¡Ooops!",
        "Sólo se permiten números",
        "error",
        "Cancel"
      );
    } else if (!input.name) {
      notificationSwal(
        "¡Ooops!",
        "Debe ingresar el monto a donar",
        "error",
        "Cancel"
      );
    } else {
      notificationSwal(
        "¡Ooops!",
        "El monto a donar debe ser mayor a cero",
        "error",
        "Cancel"
      );
    }
  }
  
  return (
    <>
      <NavBar />
      <div id="donations" className="w-full">
        <div className="h-screen flex justify-center items-center flex-col backdrop-blur-sm">
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-6xl italic text-gray-800 flex justify-center font-semibold mb-3">
              Hola {user.first_name} {user.last_name}!
            </h3>
            <h2 className="text-center text-gray-800 text-2xl font-normal sm:text-2xl">
              Nosotros somos HappyTails!, una organización con la iniciativa de
              poder cuidar a nuestros amigos de 4 patas.
              <br />
              Cualquier donación hecha será aceptada con mucho amor y será
              destinada a mejorar la calidad de vida de los animales.
            </h2>
          </div>

          <div className="flex flex-col w-full max-w-md m-14">
            <div className="text-center mb-3">
              <h2 className="text-2xl text-gray-800">
                Podrás donar la cantidad que desees colocando el monto aquí:
              </h2>
            </div>
            <input
              type="text" maxLength="4"
              name="name"
              value={input.name}
              onChange={(e) => handleChange(e)}
              placeholder="Cantidad a donar"
              className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent mb-8"
            />
            <div>
              <div className="flex items-center mb-6 -mt-4 w-full">
                <button
                  type="submit"
                  className="py-2 px-4 w-full bg-yellow-900 hover:bg-yellow-800 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                  onClick={(e) => handleInput(e)}
                >
                  Generar orden de pago
                </button>
                <p className="text-xl text-gray-800 font-normal text-center p-2">
                  {generating0 ? "Generando orden..." : null}
                </p>
                <form id="form0" className="place-self-center"></form>
              </div>

              <div className="flex items-center mb-6 -mt-4 w-full">
                <button
                  value="100"
                  className="py-2 px-4 w-full bg-yellow-900 hover:bg-yellow-800 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                  onClick={(e) => handleClick(e)}
                  disabled={disable1}
                >
                  Generar orden de pago por 100 pesos
                </button>
                <p className="text-xl text-gray-800 font-normal text-center p-2">
                  {generating1 ? "Generando orden..." : null}
                </p>
                <form id="form1"></form>
              </div>
            </div>

            <div className="flex items-center mb-6 -mt-4 w-full">
              <button
                value="200"
                className="py-2 px-4 w-full bg-yellow-900 hover:bg-yellow-800 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                onClick={(e) => handleClick(e)}
                disabled={disable2}
              >
                Generar orden de pago por 200 pesos
              </button>
              <p className="text-xl text-gray-800 font-normal text-center p-2">
                {generating2 ? "Generando orden..." : null}
              </p>
              <form id="form2"></form>
            </div>
            <div className="flex items-center mb-6 -mt-4 w-full">
              <button
                value="500"
                className="py-2 px-4 w-full bg-yellow-900 hover:bg-yellow-800 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                onClick={(e) => handleClick(e)}
                disabled={disable3}
              >
                Generar orden de pago por 500 pesos
              </button>
              <p className="text-xl text-gray-800 font-normal text-center p-2">
                {generating3 ? "Generando orden..." : null}
              </p>

              <form id="form3"></form>
            </div>
            {/* {payment ? <Comprar data={payment} /> : null} */}
          </div>
        </div>
      </div>
    </>
  );
}
