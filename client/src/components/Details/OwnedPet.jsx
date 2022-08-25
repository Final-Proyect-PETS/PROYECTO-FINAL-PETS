import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { patchPet } from "../../redux/Actions";

export default function OwnedPet({
  idUser,
  idPet,
  namePet,
  imagePet,
  isAdopted,
  pets,
}) {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.userProfile);

  const [adopt, setAdopt] = useState({
    id: idPet,
    name: namePet,
    isAdopted: isAdopted,
  });
  const [changeId, setChangeId] = useState({
    idPetFromUserSchema: idPet, //sacado de userDetail.pets._id//
    idUserFromUserSchema: idUser, //sacado de userDetail._id
    isAdopted: isAdopted, //sacado de userDetail.pets.isAdopted
  });

  //---------------------------------------------------handler Cambiar Botones-----------------------------------------
  var payload = {
    id: idPet,
    name: namePet,
    isAdopted: isAdopted,
  };
  function patchAdoptionHandler(e) {
    e.preventDefault();

    if (adopt.isAdopted === true) {
      payload = { id: idPet, name: namePet, isAdopted: false };
      setAdopt({ id: idPet, name: namePet, isAdopted: false });
    } else {
      payload = { id: idPet, name: namePet, isAdopted: true };
      setAdopt({ id: idPet, name: namePet, isAdopted: true });
    }
    dispatch(patchPet(payload));
  }

  //-------------------------------------------------handler para cambiar mascota de usuario-------------------------------------------------------------------
  var payload2 = {
    id: idPet, //para patch de ruta /:id
  };

  function changeIDHandler(e) {
    // e.preventDefault();
    let idAdoptante = "6304e6e4a3b3fc85c8b4feeb"; //Lautaro
    //HACER NUEVA RUTA PATCH?????????????????
  }

  const userDetail = useSelector((state) => state.userDetail);
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
                adopt.isAdopted === false ? (
                  <div className="column items-center">
                    {/* <Link to="/tradepet"> */}
                    {/* link de mierda -------------------------------------------------------------------------*/}
                    <button
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
              ) : loggedUser._id !== userDetail._id &&
                adopt.isAdopted === false ? (
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
