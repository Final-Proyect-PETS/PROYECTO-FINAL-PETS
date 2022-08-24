import React from "react";
import { useSelector } from "react-redux";
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
  const loggedUser = useSelector((state) => state.userProfile);
  const userDetail = useSelector((state) => state.userDetail);
  console.log(isAdopted, "Esta Adoptado?");

  return (
    <>
      <div className="flex items-center py-4 px-5 ">
        <div className=" flex border-2 border-yellow-700 rounded">
          <div className=" border-yellow-900 border-r-2  flex justify-between p-3 border items-center rounded bg-gray-300">
            <div className=" column items-center mb-4 mr-4 ml-4 ">
              <div className="flex justify-center">
                <span className="text-2xl font-bold ">{namePet}</span>
              </div>

              {""}
              {loggedUser._id === userDetail._id ? (
                isAdopted === false ? (
                  <div className="column items-center">
                    <Link to="/adopt/">
                      {" "}
                      {/* link de mierda -------------------------------------------------------------------------*/}
                      <button className="bg-yellow-900 mr-4 mt-4 hover:bg-yellow-500 text-white font-bold py-2 px-4 border border-yellow-700 rounded">
                        TRASPASAR MASCOTA →
                      </button>
                    </Link>
                    <Link to="/quitadopt/">
                      {" "}
                      {/* link de mierda*------------------------------------------------------------------- */}
                      <button className="bg-yellow-900 mt-4 hover:bg-red-700 text-white font-bold py-2 px-4 border border-yellow-700 rounded">
                        QUITAR DISPONIBILIDAD
                      </button>
                    </Link>
                  </div>
                ) : (
                  <Link to="/adopt/">
                    <button className="bg-yellow-900 mt-4 hover:bg-green-900 text-white font-bold py-2 px-4 border border-yellow-700 rounded">
                      PUBLICAR EN ADOPCION
                    </button>
                  </Link>
                )
              ) : isAdopted === false ? (
                <div className="column items-center">
                  <Link to="/adopt/">
                    {" "}
                    {/* link de mierda -------------------------------------------------------------------------*/}
                    <button className="bg-yellow-900 mr-4 mt-4 hover:bg-green-900 text-white font-bold py-2 px-4 border border-yellow-700 rounded">
                      ADOPTAR
                    </button>
                  </Link>
                </div>
              ) : (
                <Link to="/home">
                  <button className="bg-yellow-900 mt-4 hover:bg-yellow-500 text-white font-bold py-2 px-4 border border-yellow-700 rounded">
                    TENGO DUEÑO
                  </button>
                </Link>
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
