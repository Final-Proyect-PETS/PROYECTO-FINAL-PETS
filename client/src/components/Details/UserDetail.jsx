import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserDetail, clearState, getPetDetail } from "../../redux/Actions";
import NavBar from "../NavBar/NavBar";
import OwnedPet from "./OwnedPet";
import Loader from "./../Loaders/Loader";
import "./userDetailStyle.css";

export default function UserDetail() {
  let { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearState());
    dispatch(getUserDetail(id));
    dispatch(getPetDetail(id));
  }, [dispatch, id]);

  const loggedUser = useSelector((state) => state.userProfile);
  const userDetail = useSelector((state) => state.userDetail);

  return Object.keys(userDetail).length ? (
    <>
      <NavBar />
      <>
        <div className="rounded overflow-hidden border border-[#B99782] w-full bg-white my-12 md:mx-0 lg:mx-0">
          <div className="w-full grid grid-cols-3 justify-between p-3 border-b items-center  bg-gray-300">
            <div className="flex items-center">
              <img
                src={userDetail.image}
                className="w-96 h-30 bg-cover border-solid border-2 border-[#B99782] rounded-full "
                alt="imageuser"
              />
              <div className="grid m-4">
                {loggedUser._id === userDetail._id ? (
                  <div className="flex">
                    <h1 className="text-5xl font-bold">
                      {userDetail.first_name + " " + userDetail.last_name}
                    </h1>
                  </div>
                ) : (
                  <h1 className="text-5xl font-bold">
                    {userDetail.first_name + " " + userDetail.last_name}
                  </h1>
                )}

                <h3 className="text-2xl">{`"${userDetail.username}"`}</h3>
                <h3 className="text-2xl font-bold">
                  Tel:{userDetail.telephone}
                </h3>
                <h3 className="text-2xl font-bold">
                  Email: {userDetail.email}
                </h3>

                <h3 className="text-2xl ">{userDetail.about}</h3>
                <div>
                  {loggedUser._id === userDetail._id ? (
                    <div className="flex">
                      <Link to="/petregister">
                        <button className=" mt-5 ml-5 p-2 w-32 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                          📝Crear nueva mascota
                        </button>
                      </Link>
                      <Link to="/interestedtraders">
                        <button className=" mt-5 ml-5 p-2 w-32 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                          <h2 className="font-semibold">{`Traspasar mascotas`}</h2>
                        </button>
                      </Link>
                      <Link to="/updateuser">
                        <button className="py-2 mt-5 ml-5 px-4 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                          ✏️Editar Perfil
                        </button>
                      </Link>

                      {userDetail.isAdmin === true ? (
                        <Link to="/admin">
                          <button className=" mt-5 ml-5 p-2  w-28 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                            Vista de administrador
                          </button>
                        </Link>
                      ) : (
                        false
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full mt-1 border-b  absolute  justify-center items-center bg-gray-100">
            <div className="w-full mt-1 border-b  absolute flex justify-center items-center bg-gray-500">
              {loggedUser?._id === userDetail?._id ? (
                <Link to="/tradepet">
                  <button className="bg-green-900  hover:bg-green-500 text-white font-bold py-2 px-36 border border-yellow-700 rounded">
                    <h2 className="font-semibold">
                      {" "}
                      {`🔔 Tienes ${loggedUser?.interestedUsers?.length} usuarios interesados en tus mascotas`}
                    </h2>
                  </button>
                </Link>
              ) : (
                <>Mis Mascotas</>
              )}
            </div>
            <div className="grid grid-cols-3 mt-10 place-content-center ">
              {userDetail.pets?.length ? (
                userDetail.pets.map((pets) => (
                  <OwnedPet
                    key={pets._id}
                    idUser={userDetail._id}
                    idPet={pets._id}
                    namePet={pets.name}
                    imagePet={pets.image}
                    isAdopted={pets.isAdopted}
                    pets={userDetail.pets}
                    isDeleted={pets.deleted}
                    interestedUsers={userDetail.interestedUsers}
                  ></OwnedPet>
                ))
              ) : (
                <h3 className="text-2xl font-bold">
                  No hay mascotas que mostar...
                </h3>
              )}
            </div>
          </div>
        </div>
      </>
    </>
  ) : (
    <>
      <NavBar />
      <Loader />
    </>
  );
}
