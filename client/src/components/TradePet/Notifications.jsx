import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import SearchTrade from "../SearchBars/SearchTrade";
import { getAllUsers } from "../../redux/Actions/index";

import { Link, useNavigate } from "react-router-dom";
import AdopterCard from "./AdopterCard";
import InAdoptionCards from "./InAdoptionCards";
import "../LandingPage.css";
import NotificationCard from "./NotificationCard";
import { Toast, Dropdown } from "flowbite-react";

export default function Notifications() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.userProfile);

  function closeHandler(e) {
    e.preventDefault();
    console.log("click");
  }

  return (
    <div id="landing" className="w-full">
      <NavBar />
      <h1>{`Tienes ${
        loggedUser?.interestedUsers?.length === 1
          ? `${loggedUser?.interestedUsers?.length} notificacion sin leer`
          : `${loggedUser?.interestedUsers?.length} notificaciones sin leer`
      } `}</h1>

      <Dropdown class="bg-yellow-600 rounded-full" label={`🔔${loggedUser?.interestedUsers?.length}`}>
        <Dropdown.Header>
          <span className="block text-sm font-medium truncate">
            Notificaciones
          </span>
        </Dropdown.Header>

        {loggedUser?.interestedUsers?.length ? (
          loggedUser?.interestedUsers?.map((iUser) => (
            <Dropdown.Item>
              <Toast>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200">
                  <img
                    src={iUser[0].image}
                    className="h-10 w-10 rounded-full"
                  />
                </div>
                <div className="ml-3 text-sm font-normal">
                  <h1>
                    {iUser[0].first_name} {iUser[0].last_name} esta interesado
                    en {iUser[1].name}
                  </h1>
                </div>
                <button
                  className="text-yellow-500"
                  onClick={(e) => closeHandler(e)}
                >
                  <Toast.Toggle onClick={(e) => closeHandler(e)} />
                </button>
              </Toast>
            </Dropdown.Item>
          ))
        ) : (
          <>SIN NOTI</>
        )}

        <Dropdown.Divider />
        <Dropdown.Item>
          <Link to={"/notifications"}> Ver Todas</Link>
         </Dropdown.Item>
      </Dropdown>
    </div>
  );
}
