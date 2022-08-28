import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import SearchTrade from "../SearchBars/SearchTrade";
import { getAllUsers } from "../../redux/Actions/index";

import { useNavigate } from "react-router-dom";
import AdopterCard from "./AdopterCard";
import InAdoptionCards from "./InAdoptionCards";
import "../LandingPage.css";
import NotificationCard from "./NotificationCard";

export default function Notifications() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.userProfile);
  



  return (
    <div id="landing" className="w-full">
      <NavBar />
      <h1>
        Tienes {loggedUser?.interestedUsers?.length} notificaciones sin leer
      </h1>
      
      <>
        {loggedUser?.interestedUsers ? (
          loggedUser?.interestedUsers?.map((iUser) => (
            <NotificationCard iUser={iUser} />
          ))
        ) : (
          <>nada</>
        )}
      </>
    </div>
  );
}
