import React from "react";
import NavBar from "../NavBar/NavBar";
import "../LandingPage.css";
import { useSelector } from "react-redux";
import { getUserProfile, paymentMp } from "../../redux/Actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Comprar from "../Comprar";
import { useState } from "react";
import axios from "axios";

export default function Donation() {
  const dispatch = useDispatch();

  const id = localStorage.getItem("id");
  const user = useSelector((state) => state.userProfile);
  // const datos = {
  //   id: "1185045553-e4b1aa23-63df-4e0d-9891-5759052319c5",
  //   init_point:
  //     "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=1185045553-e4b1aa23-63df-4e0d-9891-5759052319c5",
  // };

  //objeto
  const payment = useSelector((state) => state.payment.id); //id, init_point

  useEffect(() => {
    dispatch(getUserProfile(id));
  }, [dispatch, id]);
  const [datos, setDatos] = useState("");

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3001/mercadopago`)
  //     .then((data) => {
  //       setDatos(data.data);
  //       console.info("Contenido de data:", data);
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  function handleClick() {
    dispatch(paymentMp());
    //window.location.replace(pay);
    // navigate(pay, { replace: true })

    //.then(window.open(payment, "_self", "width=300, height=300"));
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
          <button
            className="py-4 px-4 bg-yellow-900 hover:bg-yellow-900 focus:ring-yellow-600 focus:ring-offset-yellow-600 text-white w-44 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            onClick={(e) => handleClick(e)}
          >
            Generar orden de pago por 10 pesos
          </button>
          {payment ? <Comprar data={payment} /> : null}

          {/* <Comprar data={datos} /> */}

          {/* <Comprar data={payment}/> */}
        </div>
      </div>
    </div>
  );
}
