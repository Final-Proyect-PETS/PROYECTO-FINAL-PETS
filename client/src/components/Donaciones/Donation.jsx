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
import { useLocation } from "react-router-dom";

export default function Donation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = localStorage.getItem("id");
  const user = useSelector((state) => state.userProfile);
  const payment = useSelector((state) => state.payment.id);
  const [input, setInput] = useState("");
  const [generating0, setGenerating0] = useState(false);
  const [generating1, setGenerating1] = useState(false);
  const [generating2, setGenerating2] = useState(false);
  const [generating3, setGenerating3] = useState(false);
  const [disable0, setDisable0] = useState(false);
  const [disable1, setDisable1] = useState(false);
  const [disable2, setDisable2] = useState(false);
  const [disable3, setDisable3] = useState(false);

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

  const params = useLocation().search;
  console.log(params);
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
            Podés donar haciendo click en el siguiente botón:
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
          <div className="text-xl">
            {generating0 ? "Generando orden..." : null}
          </div>
          <div>
            <form id="form0"></form>
          </div>

          <button
            value="100"
            className="py-4 px-4 bg-yellow-900 hover:bg-yellow-900 focus:ring-yellow-600 focus:ring-offset-yellow-600 text-white w-44 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            onClick={(e) => handleClick(e)}
            disabled={disable1}
          >
            Generar orden de pago por 100 pesos
          </button>
          <div className="text-xl">
            {generating1 ? "Generando orden..." : null}
          </div>
          <div>
            <form id="form1"></form>
          </div>

          <button
            value="200"
            className="py-4 px-4 bg-yellow-900 hover:bg-yellow-900 focus:ring-yellow-600 focus:ring-offset-yellow-600 text-white w-44 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            onClick={(e) => handleClick(e)}
            disabled={disable2}
          >
            Generar orden de pago por 200 pesos
          </button>
          <div className="text-xl">
            {generating2 ? "Generando orden..." : null}
          </div>
          <div>
            <form id="form2"></form>
          </div>

          <button
            value="500"
            className="py-4 px-4 bg-yellow-900 hover:bg-yellow-900 focus:ring-yellow-600 focus:ring-offset-yellow-600 text-white w-44 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            onClick={(e) => handleClick(e)}
            disabled={disable3}
          >
            Generar orden de pago por 500 pesos
          </button>
          <div className="text-xl">
            {generating3 ? "Generando orden..." : null}
          </div>
          <div>
            <form id="form3"></form>
          </div>

          {/* {payment ? <Comprar data={payment} /> : null} */}
        </div>
      </div>
    </div>
  );
}
