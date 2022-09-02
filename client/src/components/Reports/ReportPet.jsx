import React from "react";
import { useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./Reports.css";

export default function ReportPet() {
  const [input, setInput] = useState({
    checkbox1: "",
    description: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {}

  return (
    <div id="reportPet" className="fixed">
      <NavBar />
      <h1 className="flex justify-center font-semibold text-3xl mt-3">
        ¿Por qué desea reportar esta publicación?
      </h1>
      <div className="mt-8 px-8 max-w-lg self-center"></div>
      <form
        onSubmit={handleSubmit}
        className="bg-yellow-500 flex w-2/3 my-10 ml-60 flex-row border-2 border-black"
      >
        <div>
          <label className="font-light text-white text-xl">Comentarios</label>
          <textarea
            name="description"
            value={input.description}
            placeholder="Describa el motivo de su denuncia"
            onChange={(e) => handleChange(e)}
            className="w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent resize-none"
          />
        </div>
        <div>
          <button
            type="submit"
            className="py-2 px-4 my-4 w-full bg-yellow-900 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            Reportar publicación
          </button>
        </div>
      </form>
    </div>
  );
}
