import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { patchPet } from "../../redux/Actions";

export default function InAdoptionCard({
  idUser,
  idPet,
  namePet,
  imagePet,
  isAdopted,
  pets,
}) {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.userProfile);
  console.log(namePet, "LOGGEDDETAIL");

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

  const userDetail = useSelector((state) => state.userProfile);
  return (
    <>
      <div className="flex items-center py-2 px-5 ">
        <div className=" flex border-2 border-yellow-700 rounded">
          <div className=" border-yellow-900 border-r-2  flex justify-between p-3 border items-center rounded bg-gray-300">
            <div className=" column items-center mb-4 mr-4 ml-4 ">
              <div className="flex justify-center">
                <span className="text-2xl font-bold ">{namePet}</span>
              </div>
            </div>
          </div>
         
            <img
              className="w-60 h-40 bg-cover "
              src={imagePet}
              alt="imagepet"
            />
         
        </div>
      </div>
    </>
  );
}
