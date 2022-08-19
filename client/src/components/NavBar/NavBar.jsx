import React from "react";
import { Link } from "react-router-dom";


export default function NavBar() {
  return (
    <section className="flex justify-center h-14">
      <div className="bg-orange-300 flex justify-between border-b-4 border-white w-screen justify-center content-around items-center px-4">
        <div className="flex">
          <h1 className="text-white text-2xl font-semibold">Happy Tails</h1>
        </div>
        <div className="flex w-80 justify-around">
          <Link to={"/home"}>
            <h2 className="text-black text-2xl font-semibold">Home</h2>
          </Link>
          <Link to={"/algo"}>
            <h2 className="text-black text-2xl font-semibold">Algo</h2>
          </Link>
          <Link to={"/about"}>
            <h2 className="text-black text-2xl font-semibold">About</h2>
          </Link>
        </div>

        <div className="flex gap-3 items-center">
          <p className="text-gray-50 font-semibold">Lautaro Martín</p>
          <img
            src="https://img.freepik.com/fotos-premium/hombre-caucasico-joven-persona-pared-blanca-apuntando-mano-camisa-blanco-orgulloso-confiado_1187-76423.jpg?w=740"
            alt="logo"
            width="9px"
            class="mx-auto object-cover rounded-full h-9 w-9 "
          />
        </div>
      </div>
    </section>
  );
}
