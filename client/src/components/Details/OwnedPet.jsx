import React from "react";
import { useDispatch, useSelector } from "react-redux";
//import ubicacion from "../../assets/images/ubicacion.png";
import { Link } from "react-router-dom";
import { patchPet } from "../../redux/Actions";
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
  const allUsers = useSelector((state) => state.users);

  const dispatch = useDispatch();

  function patchAdoptionHandler(e) {
    console.log(isAdopted, "IS ADOPTED TRAIDA");

    let payload = { id: idPet, name: namePet, isAdopted: isAdopted };
    if (isAdopted === "true" || isAdopted === true) {
      payload = { id: idPet, name: "lucas", isAdopted: "false" };

      console.log(payload.isAdopted, "PAYLOAD");
    }

    if (isAdopted === "false" || isAdopted === false) {
      payload = { id: idPet, name: "luquita", isAdopted: "true" };
    }
    dispatch(patchPet(payload));
  }

  return (
    <>
      <div className="flex items-center py-4 px-5 ">
        <div className=" flex border-2 border-yellow-700 rounded">
          <div className=" border-yellow-900 border-r-2  flex justify-between p-3 border items-center rounded bg-gray-300">
            <div className=" column items-center mb-4 mr-4 ml-4 ">
              <div className="flex justify-center">
                <span className="text-2xl font-bold ">{namePet}</span>
              </div>

              {loggedUser._id === userDetail._id ? (
                isAdopted === false ? (
                  <div className="column items-center">
                    <Link to="/tradepet/">
                      {" "}
                      {/* link de mierda -------------------------------------------------------------------------*/}
                      <button className="bg-yellow-900 mr-4 mt-4 hover:bg-yellow-500 text-white font-bold py-2 px-4 border border-yellow-700 rounded">
                        TRASPASAR MASCOTA →
                      </button>
                    </Link>
                    {/* <Link to="/quitadopt/"> */}{" "}
                    {/* link de mierda*------------------------------------------------------------------- */}
                    <button
                      onClick={(e) => patchAdoptionHandler(e)}
                      className="bg-yellow-900 mt-4 hover:bg-red-700 text-white font-bold py-2 px-4 border border-yellow-700 rounded"
                    >
                      QUITAR DISPONIBILIDAD
                    </button>
                    {/* </Link> */}
                  </div>
                ) : (
                  <button
                    onClick={(e) => patchAdoptionHandler(e)}
                    className="bg-yellow-900 mt-4 hover:bg-green-900 text-white font-bold py-2 px-4 border border-yellow-700 rounded"
                  >
                    PUBLICAR EN ADOPCION
                  </button>
                )
              ) : isAdopted === false ? (
                <div className="column items-center">
                  <Link to="/adopt/">
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
