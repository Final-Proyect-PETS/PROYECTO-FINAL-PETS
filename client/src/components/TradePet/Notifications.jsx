import React from "react";
import { useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";
import "../LandingPage.css";
import "./Notification.css";

export default function Notifications() {

  const loggedUser = useSelector((state) => state.userProfile);
  const allUsers = useSelector((state) => state.users);
  const allPets = useSelector((state) => state.pets);

  let algo = loggedUser.interestedUsers.map(e => {
    return {
      user: allUsers.filter(a => a._id === e.interestedUser)[0],
      pet: allPets.filter(a => a._id === e.petId)[0],
      viewState: e.viewState
    }
  })

  return (
    <div className="w-full">
      <NavBar />
      <div id="notification-component" className="flex flex-col items-center">
        <span className="font-semibold text-2xl text-white py-5">Mis Notificaciones</span>

        {loggedUser?.interestedUsers?.length ? (
          algo?.map((iUser) => (
            iUser.viewState === false ?
              <div className="flex w-full p-10 my-2 items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 ">
                <div className="flex justify-between p-3 items-center">
                  <div className="flex items-center">
                    <div className="rounded-full h-8 w-8 flex items-center justify-center overflow-hidden mr-2">
                      <img src={iUser?.user?.image} alt="profilepic" />
                    </div>
                  </div>
                </div>
                <div className="font-normal text-gray-700 dark:text-gray-400">
                  {`${iUser?.user?.first_name} ${iUser?.user?.last_name} esta interesado en ${iUser?.pet?.name}`}
                </div>
                <Link to={`/users/${iUser?.user?._id}`} className="px-5">
                  <h3 className="font-semibold text-yellow-500 hover:text-yellow-800">Ver Perfil</h3>
                </Link>
              </div>
              : <></>
          ))
        ) : (
          <span className="text-2xl text-white mt-3">Sin notificaciones</span>
        )}
      </div>
    </div>
  );
}
