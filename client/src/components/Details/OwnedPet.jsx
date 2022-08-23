import React from "react";
//import ubicacion from "../../assets/images/ubicacion.png";
import { Link } from "react-router-dom";
//import styles from "./userDetailStyle.css";

export default function OwnedPet({
  idUser,
  first_name,
  last_name,
  imageUser,
  idPet,
  namePet,
  imagePet,
  place,
  size,
  gender,
  isAdopted,
}) {
  console.log(isAdopted, "Esta Adoptado?");
  return (
    <>
      <div className="flex items-center py-4 px-4 ">
        <div className=" flex border-2 border-yellow-700 rounded">
          <div className=" border-yellow-900 border-r-2  flex justify-between p-3 border items-center rounded bg-gray-300">
            <div className=" column items-center mb-4 mr-4 ml-4 ">
              <div className="">
                <span className="text-2xl font-bold m-4">{namePet}</span>
              </div>

              {/* <span className="font-medium text-xs mx-3">
                Ubicacion: {place}
              </span> */}
              {isAdopted === true ? (
                isAdopted === true ? (
                  <div className="flex items-center">
                    <Link to="/adopt/">
                      <button className="bg-yellow-900 mt-4 hover:bg-green-700 text-white font-bold py-5 px-4 border border-yellow-700 rounded">
                        ADOPTAR
                      </button>
                    </Link>
                  </div>
                ) : (
                  <></>
                )
              ) : (
                <div className="flex items-center">
                  <Link to="formulario de adopcion">
                    <button className="bg-yellow-900 mt-4 hover:bg-red-700 justify-center text-white font-bold py-2 px-4 border border-yellow-700 rounded">
                      OFRECER MASCOTA
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <Link to={"/pet/" + idPet}>
            <img
              className="w-60 h-40 bg-cover "
              src={imagePet}
              alt="imagepet"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
