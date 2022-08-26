import React from "react";
import NavBar from "../NavBar/NavBar";
import { useSelector } from "react-redux";
import { getUserProfile, paymentMp } from "../../redux/Actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import "../LandingPage.css";
import { useState } from "react";

export default function Donation() {
  const dispatch = useDispatch();

  const id = localStorage.getItem("id");
  const user = useSelector((state) => state.userProfile);

  const payment = useSelector((state) => state.payment)

  useEffect(() => {
    dispatch(getUserProfile(id));
  }, [dispatch, id]);

  //setear el boton deshabilitado una vez clickeado
  const [activeButton, setActive] =useState(false)

  function handleClick(e) {
    e.preventDefault()
    dispatch(paymentMp(user.email));
    if (payment) {
        const script = document.createElement("script");
        const attr_data_preference = document.createAttribute("data-preference-id");
        attr_data_preference.value = payment;
        script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
        script.setAttributeNode(attr_data_preference);
        document.getElementById("form1").appendChild(script);
    }
    // setActive(false)
}

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
          <button className="py-4 px-4 bg-yellow-900 hover:bg-yellow-900 focus:ring-yellow-600 focus:ring-offset-yellow-600 text-white w-44 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          onClick={(e) => handleClick(e)} disabled={!activeButton}
          >
            Donar
          </button>
        </div>
      </div>
    </div>
  );
}
