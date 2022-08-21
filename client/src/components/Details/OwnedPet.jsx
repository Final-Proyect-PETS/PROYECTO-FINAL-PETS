import React from "react";
import ubicacion from "../../assets/images/ubicacion.png";
import { Link } from "react-router-dom";
import styles from "./userDetailStyle.css";

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
}) {
  return (
    <>
      <Link to={"/pet/" + idPet}>
        <div className="flex items-center">
          <div className="py-4 px-4 flex">
            <div className=" flex justify-between p-3 border-b items-center bg-gray-200">
              {/* <div className="flex"></div> */}
              <div className="column">
                <div className="flex items-center">
                  <span className="text-2xl font-bold">{namePet}</span>
                </div>
                <span className="font-medium text-xs mx-3">
                  Ubicacion: {place}
                </span>
                <div className="flex items-center">
                  <Link to="/adopt/">
                    <button class="bg-yellow-500 hover:bg-green-700 text-white font-bold py-5 px-4 border border-yellow-700 rounded">
                      ADOPTAR
                    </button>
                  </Link>
                </div>
              </div>
              {/* <div className="flex items-center"></div> */}
            </div>

            <img
              className="w-60 h-40 bg-cover rounded"
              src={imagePet}
              alt="imagepet"
            />
          </div>
        </div>
      </Link>
    </>
  );
}
