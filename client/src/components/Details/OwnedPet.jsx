import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPetDetail, patchPet } from "../../redux/Actions";
import { useNavigate } from "react-router-dom";
import { notificationSwal } from "../../utils/notificationSwal.jsx";
import Swal from "sweetalert2";
import "../LandingPage.css";
import { Tooltip } from "flowbite-react/lib/esm/components";

export default function OwnedPet({
  idUser,
  idPet,
  namePet,
  imagePet,
  isAdopted,
  isDeleted,
  interestedUsers,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedUser = useSelector((state) => state.userProfile);
  const userDetail = useSelector((state) => state.userDetail);

  //---------------------------------------------------handler Cambiar Botones----------------------------------------------
  const [adopt, setAdopt] = useState({
    id: idPet,
    name: namePet,
    isAdopted: isAdopted,
  });

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

  //-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-DELETE-x-x-x-x-x-x-x--x-x-x-x-x-x-x-x-x-x-x-x-x-

  const [deleted, setDeleted] = useState({
    id: idPet,
    deleted: isDeleted,
  });
  var payloadDelete = {
    id: idPet,
    deleted: isDeleted,
  };

  function deleteHandler(e) {
    e.preventDefault();
    setDeleted({
      id: idPet,
      deleted: true,
    });
    payloadDelete = {
      id: idPet,
      deleted: true,
    };
    // dispatch(patchPet(payloadDelete));

    if (true) {
      Swal.fire({
        title: "¿Está seguro de que desea eliminar esta mascota?",
        text: "Esta mascota se eliminará",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonText: "Sí",
      })
        .then((result) => {
          if (result.isConfirmed) {
            dispatch(patchPet(payloadDelete)).then((e) => {
              if (e === "OK") {
                notificationSwal(
                  "¡Enhorabuena!",
                  "Mascota eliminada con éxito",
                  "success",
                  "Ok"
                );
              } else {
                notificationSwal(
                  "¡Ooops!",
                  "No se pudo eliminar la mascota, intente mas tarde",
                  "error",
                  "Cancel"
                );
              }
            });
          } else {
            notificationSwal(
              "Operación cancelada",
              "Mascota no eliminada",
              "error",
              "Cancel"
            );
          }
        })
        .then(() => navigate(`/home`, { replace: true }));
    } //oponer sweet
  }
  //editar handler-------------------------------------------------------------
  function fillUpdateHandler(e) {
    e.preventDefault();
    dispatch(getPetDetail(idPet)) .then(() => navigate(`/updatepet`, { replace: true }));
  }

  return (
    <div className="flex items-center py-4 px-5 ">
      <div className=" flex border-2 border-yellow-700 rounded">
        <div className=" border-yellow-900 border-r-2  flex justify-between  border items-center rounded bg-gray-300">
          <div className=" column items-center mb-4 mr-4 ml-4 ">
            {loggedUser._id === userDetail._id ? (
              <div className="flex justify-center p-1">
                <Tooltip content="Borrar mascota" placement="bottom">
                  <button
                    onClick={(e) => deleteHandler(e)}
                    className="bg-red-600 m-1 hover:bg-red-700 text-white font-bold py- px-1 border border-yellow-700 rounded"
                  >
                    ✖️
                  </button>
                </Tooltip>
                <Tooltip content="Editar mascota" placement="top">
                  <button
                    onClick={(e) => fillUpdateHandler(e)}
                    className="bg-yellow-600 m-1 hover:bg-yellow-700 text-white font-bold py- px-1 border border-yellow-700 rounded"
                  >
                    📝
                  </button>
                </Tooltip>
              </div>
            ) : (
              <></>
            )}

            {/* <span className="text-2xl font-bold ">{namePet}</span> */}
            <div className="flex justify-center">
              <span className="text-2xl font-bold ">{namePet}</span>
            </div>

            {loggedUser._id === userDetail._id ? (
              adopt.isAdopted === false && deleted.deleted === false ? (
                <div className="flex flex-col justify-content items-center">
                  <div className="flex  justify-content items-center"></div>
                  <div className="flex">
                    <button
                      onClick={(e) => patchAdoptionHandler(e)}
                      className="bg-red-900 mt-4 hover:bg-red-600 text-white font-bold py-2 px-3 border border-yellow-700 rounded"
                    >
                      ⛔ PARAR ADOPCION
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col justify-content items-center">
                  <button
                    onClick={(e) => patchAdoptionHandler(e)}
                    className="bg-green-900 mt-4 hover:bg-green-600 opacity-80 text-white font-bold py-2 px-3 border border-yellow-700 rounded"
                  >
                    ✔️ INICIAR ADOPCIÓN
                  </button>
                </div>
              )
            ) : loggedUser._id !== userDetail._id &&
              adopt.isAdopted === false &&
              deleted.deleted === false ? (
              <div className="flex flex-col items-center">
                <Link to={`/pet/${idPet}`}>
                  {/* link de mierda -------------------------------------------------------------------------*/}
                  <button className="bg-green-900 mr-4 mt-3 hover:bg-green-600 text-white font-bold  px-4 border border-yellow-700 rounded">
                    <h2 className="font-semibold"> ¡Mascota en adopcion!</h2>
                    <h2 className=""> VER PERFIL</h2>
                  </button>
                </Link>
              </div>
            ) : (
              <Link to={`/pet/${idPet}`}>
                <button className="bg-yellow-900 mt-4 hover:bg-yellow-500 text-white font-bold py-2 px-4 border border-yellow-700 rounded">
                  VER PERFIL
                </button>
              </Link>
            )}
          </div>
        </div>
        <Link to={"/pet/" + idPet}>
          <img className="w-60 h-40 bg-cover " src={imagePet} alt="imagepet" />
        </Link>
      </div>
    </div>
  );
}
