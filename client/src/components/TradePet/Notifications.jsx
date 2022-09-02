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

  let interest = loggedUser?.interestedUsers?.map((e) => {
    return {
      user: allUsers?.filter((a) => a._id === e.interestedUser)[0],
      pet: allPets?.filter((a) => a._id === e.petId)[0],
      viewState: e.viewState,
      esIntrest: true,
    };
  });

  let like = loggedUser?.likesPets?.map((e) => {
    return {
      user: allUsers?.filter((a) => a._id === e.userId)[0],
      pet: allPets?.filter((a) => a._id === e.petId)[0],
      viewState: e.support,
      esLike: true,
    };
  });

  let notis = [interest, like];
  let notisFlat = notis.flat().sort(() => {
    return Math.random() - 0.5;
  });

  let vistas = notisFlat?.filter((noti) => noti?.viewState === true);
  let noVistas = notisFlat?.filter((noti) => noti?.viewState === false);

  return (
    <div id="notification-component" className="w-full h-full ">
      <NavBar />
      <div className="flex flex-col items-center ">
        {noVistas?.length === 1 ? (
          <span className="font-semibold text-3xl text-black py-5">
            {`Tienes ${noVistas?.length} notificacion sin leer`}
          </span>
        ) : noVistas?.length > 1 ? (
          <span className="font-semibold text-3xl text-black py-5">
            {`Tienes ${noVistas?.length} notificaciones sin leer`}
          </span>
        ) : (
          <>
            <span className="font-semibold text-3xl text-black py-5">
              {`No tienes notificaciones !`}
            </span>
          </>
        )}
      </div>

      <div className="flex flex-col items-center">
        <div>
          {notisFlat?.length ? (
            notisFlat?.map((iUser) =>
              iUser?.viewState === false && iUser?.esIntrest === true ? (
                <div className="flex w-full p-8 my-2 items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 ">
                  <div className="flex justify-between p-3 items-center">
                    <div className="flex items-center">
                      <div className="rounded-full h-8 w-8 flex items-center justify-center overflow-hidden mr-2">
                        <img src={iUser?.user?.image} alt="profilepic" />
                      </div>
                    </div>
                  </div>
                  <div className="font-normal text-gray-700 dark:text-gray-400">
                    {`❕❔ ${iUser?.user?.first_name} ${iUser?.user?.last_name} esta interesado en ${iUser?.pet?.name}`}
                  </div>
                  <Link to={`/users/${iUser?.user?._id}`} className="px-5">
                    <h3 className="font-semibold text-yellow-500 hover:text-yellow-800">
                      Ver Perfil
                    </h3>
                  </Link>
                </div>
              ) : iUser?.viewState === false && iUser?.esLike === true ? (
                <div className="flex w-full p-8 my-2 items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 ">
                  <div className="flex justify-between p-3 items-center">
                    <div className="flex items-center">
                      <div className="rounded-full h-8 w-8 flex items-center justify-center overflow-hidden mr-2">
                        <img src={iUser?.user?.image} alt="profilepic" />
                      </div>
                    </div>
                  </div>
                  <div className="font-normal text-gray-700 dark:text-gray-400">
                    {`🤎 ${iUser?.user?.first_name} ${iUser?.user?.last_name} le ha gustado ${iUser?.pet?.name}`}
                  </div>
                  <Link to={`/users/${iUser?.user?._id}`} className="px-5">
                    <h3 className="font-semibold text-yellow-500 hover:text-yellow-800">
                      Ver Perfil
                    </h3>
                  </Link>
                </div>
              ) : (
                <></>
              )
            )
          ) : (
            <span className="text-2xl text-white mt-3"></span>
          )}
        </div>
        <div className="bg-yellow-500 rounded opacity-80 w-1/2 flex flex-col justify-center">
          <span className="font-semibold p-3 text-2xl text-white py-5">
            ¿Te gustaria publicar una foto nueva de tu mascota para que
            otros usuarios puedan verla?
          </span>
          <div className="flex flex-col justify-content items-center ">
            <Link to={`/users/${loggedUser._id}`}>
              <button
                onClick={(e) => e}
                className="bg-green-600 mt-4 p-3 m-2 hover:bg-green-800  text-white font-bold py-2 px-3 border border-yellow-700 rounded"
              >
                EDITAR MASCOTAS 📝
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
