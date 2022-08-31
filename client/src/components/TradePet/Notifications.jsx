import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import SearchTrade from "../SearchBars/SearchTrade";
import { getUserProfile ,viewing} from "../../redux/Actions/index";
import { Link, useNavigate } from "react-router-dom";
import "../LandingPage.css";
import { Toast, Dropdown } from "flowbite-react";
import { patchUsuer } from "../../redux/Actions/index";
import { useState } from "react";

export default function Notifications() {

  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.userProfile);
  const allUsers = useSelector((state) => state.users);
  const allPets = useSelector((state) => state.pets);
  
  let bell = loggedUser?.interestedUsers?.filter(e => e.viewState === false).length;

  function closeHandler(e) {
    e.preventDefault();
    let payload = {
      id: loggedUser._id, //dueño
      interestedId: e.target.value,
      petId: e.target.name, // interestedUsers: [{usuariointeresado}{mascotaquequiero},FALSO],
    };
    dispatch(viewing(payload))
    dispatch(getUserProfile(loggedUser._id))
  }

  let algo = loggedUser.interestedUsers.map(e => {
    return {
      user : allUsers.filter(a => a._id === e.interestedUser)[0],
      pet : allPets.filter(a => a._id === e.petId)[0],
      viewState : e.viewState
    }
  }
)

  return (

    <div id="landing" className="w-full">
      <NavBar />
      <div className="flex flex-col items-center">
        <h2>Componente en construccion</h2>
        <h1>
            { bell > 1 ? `tienes ${bell} notificaciones sin leer` : bell === 1 ? `tienes 1 notificacion sin leer` : `sin notificaciones`}
        </h1>
        {loggedUser?.interestedUsers?.length ? (
          algo.map((iUser) => (
            iUser.viewState === false ? 
            <Toast key={iUser.user._id}>
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200">
                <img src={iUser.user.image} className="h-10 w-10 rounded-full" />
              </div>
              <div className="ml-3 text-sm font-normal">
                <h1>{`${iUser.user.first_name} ${iUser.user.last_name} esta interesado en ${iUser.pet.name}`}</h1>
                <button
                  value={iUser.user._id}
                  name={iUser.pet._id}
                  className="text-yellow-500"
                  onClick={(e) => closeHandler(e)}
                >
                Marcar como leida
                </button>
                <Link to={`/users/${iUser.user._id}`}>
                  <h1 className="text-yellow-500">Ver Perfil</h1>
                </Link>
              </div>
              <Toast.Toggle/>
            </Toast>
             : <></>
          ))
        ) : (
          <>SIN NOTI</>
        )}
      </div>
    </div>
  );
}
