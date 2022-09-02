import React from "react";
import NavBar from "../NavBar/NavBar";
import Cards from "./Cards";
import SideBar from "../SideBar/SideBar";
import "./../LandingPage.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Home() {
  const navigate = useNavigate();

  const loggedUser = useSelector((state) => state.userProfile);

  const verifyData = () => {
    if (!loggedUser?.telephone || !loggedUser.username) {
      Swal.fire({
        title: "DATOS",
        icon: "question",
        text: "Por favor completa tus datos",
      }).then(() => navigate("/missingdata", { replace: true }));
    }
  };

  function handley(e) {
    setTimeout(verifyData(), 5000);
    ///FUNCION DE CHRIS
  }
  return (
    <section onClick={(e) => handley(e)}>
      <section className="fixed w-screen">
        <NavBar />
      </section>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <section className="flex w-1/3 fixed">
            <SideBar />
          </section>
          <section className="flex w-full bg-white justify-center mt-9">
            <Cards />
          </section>
        </div>
      </div>
    </section>
  );
}
