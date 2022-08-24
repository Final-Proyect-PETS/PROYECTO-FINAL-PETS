import React from "react";
import { useState } from "react";
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
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.userProfile);
  const userDetail = useSelector((state) => state.userDetail);
  const allUsers = useSelector((state) => state.users);

  const [adopt, setAdopt] = useState({
    id: idPet,
    name: namePet,
    isAdopted: isAdopted,
  });

  function patchAdoptionHandler(e) {
    // e.preventDefault();

    console.log(adopt, "ADOPT INICIAL");

    if (adopt.isAdopted === "true" || adopt.isAdopted === true) {
      setAdopt({ id: idPet, name: "juan", isAdopted: false });
      console.log(adopt,"FALSE")
      dispatch(patchPet(adopt));
    }

    if (adopt.isAdopted === "false" || adopt.isAdopted === false) {
      setAdopt({ id: idPet, name: "Joaco", isAdopted: true });
      console.log(adopt,"TRUE")
      dispatch(patchPet(adopt));
    }
  }

  function changeIDHandler(e) {
    let idAdoptante = "6304e6e4a3b3fc85c8b4feeb"; //Lautaro

    idUser = idAdoptante;
    setAdopt({
      id: idPet,
      name: namePet,
      isAdopted: isAdopted,
      idUser: idAdoptante,
    });
    dispatch(patchPet(adopt));

    loggedUser.pets.push(idPet);
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
                adopt.isAdopted === "false" ? (
                  <div className="column items-center">
                    {/* <Link to="/tradepet/"> */}{" "}
                    {/* link de mierda -------------------------------------------------------------------------*/}
                    <button
                      on
                      onClick={(e) => changeIDHandler(e)}
                      className="bg-yellow-900 mr-4 mt-4 hover:bg-yellow-500 text-white font-bold py-2 px-4 border border-yellow-700 rounded"
                    >
                      TRASPASAR MASCOTA →
                    </button>
                    {/* </Link> */}
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
              ) : adopt.isAdopted === "false" ? (
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
