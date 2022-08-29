import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ubicacion from "../../assets/images/ubicacion.png";
export default function InAdoptionCard({
  key,
  idUser,
  idPet,
  namePet,
  imagePet,
  isAdopted,
  place,
  gender,
  size,
  type,
  age,
  pets,
}) {
  return (
    <>
      <div
        id={idPet}
        className="rounded overflow-hidden border border-[#B99782] w-full bg-white my-2 md:mx-0 lg:mx-0"
      >
        <div className="w-full flex justify-between p-3 border-b items-center bg-yellow-500">
          <div className="flex items-center">
            <img
              className="w-20 h-20 bg-cover "
              src={imagePet}
              alt="imagepet"
            />
            <h1 className="ml-2 font-bold text-5x1 mr-4">{namePet}</h1>
          </div>

          <div className="flex items-center">
            <div className="text-sm flex">
              <img
                src={ubicacion}
                alt="ubicacion"
                width="16px"
                className="rounded" 
              />
              <span className="font-medium text-xs mx-3">
                {place ? place : `"Sin ubicación registrada"`}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <span className="ml-2 font-bold text-xs">Edad: {age}</span>
          <span className="ml-2 font-bold text-xs">
            Género: {gender === "female" ? "Hembra" : "Macho"}
          </span>
          <span className="ml-2 font-bold text-xs">
            Tamaño:{" "}
            {size === "big"
              ? "Grande"
              : size === "medium"
              ? "Mediano"
              : "Chico"}
          </span>

          {/* <span className="ml-2 font-bold text-xs">📧E-mail: {email}</span> */}
        </div>
      </div>
    </>
  );
}
