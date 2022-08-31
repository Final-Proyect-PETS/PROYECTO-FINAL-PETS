import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import SearchTrade from "../SearchBars/SearchTrade";
import { getAllUsers, notViewed, viewed ,viewing} from "../../redux/Actions/index";

import { Link, useNavigate } from "react-router-dom";
import "../LandingPage.css";
import { Toast, Dropdown } from "flowbite-react";
import { patchUsuer } from "../../redux/Actions/index";
import { useState } from "react";

export default function Notifications() {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.userProfile);
  var notView = [];
  var view = [];
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  const allUsers = useSelector((state) => state.users);
  var matched = allUsers?.filter((user) => user._id === loggedUser._id);
  matched[0]?.interestedUsers?.map((iUser) => {
    if (iUser[2] === false) notView.push(iUser); //esto se puede simplificar
  });



  var bell = loggedUser?.interestedUsers?.length;


  function closeHandler(e) {

    e.preventDefault();
    var payload = {
      id: loggedUser._id, //dueño
      interestedId: e.target.value,
      petId: e.target.name, // interestedUsers: [{usuariointeresado}{mascotaquequiero},],
    };

    console.log(payload)
    dispatch(viewing(payload))
    bell = bell - 1;

  }

  return (
    <div id="landing" className="w-full">
      <NavBar />
      <div className="flex flex-col items-center">
        {" "}
        <h2>Componente en construccion</h2>
        <h1>
          {`Tienes ${
          notView.length <= 1
              ? `${notView.length} notificacion sin leer`
              : `${notView.length} notificaciones sin leer`
          } `}
        </h1>
        {loggedUser?.interestedUsers?.length ? (
          notView.map((iUser) => (
            <Toast /* key={iUser[0]._id} */>
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200">
                <img src={iUser[0].image} className="h-10 w-10 rounded-full" />
              </div>
              <div className="ml-3 text-sm font-normal">
                {/* <h1>{iUser[2] === false ? "No leida" : "truew"}</h1> */}
                <h1>
                  {iUser[0].first_name} {iUser[0].last_name} esta interesado en{" "}
                  {iUser[1].name}
                </h1>
                <button
                  value={iUser[0]._id}
                  name={iUser[1]._id}
                  className="text-yellow-500"
                  onClick={(e) => closeHandler(e)}
                >
                  Marcar como leida
                </button>
                <Link to={`/users/${iUser[0]._id}`}>
                  <h1 className="text-yellow-500">Ver Perfil</h1>
                </Link>
              </div>
              <Toast.Toggle />
            </Toast>
          ))
        ) : (
          <>SIN NOTI</>
        )}
      </div>
    </div>
  );
}
