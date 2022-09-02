import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getUserDetail,
  clearState,
  getPetDetail,
  chatWithUser,
} from "../../redux/Actions";
import NavBar from "../NavBar/NavBar";
import OwnedPet from "./OwnedPet";
import Loader from "./../Loaders/Loader";
import "./userDetailStyle.css";
import mapboxgl from "mapbox-gl";

export default function UserDetail() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearState());
    dispatch(getUserDetail(id));
    dispatch(getPetDetail(id));
  }, [dispatch, id]);

  const loggedUser = useSelector((state) => state.userProfile);
  const userDetail = useSelector((state) => state.userDetail);
  const mapDiv = useRef(null);

  useLayoutEffect(() => {
    createNewMap(userDetail.place_longitude, userDetail.place_latitude);
  }, [userDetail.place_latitude, userDetail.place_longitude]);

  function createNewMap(long, lat) {
    if (userDetail.place_latitude && userDetail.place_longitude) {
      new mapboxgl.Map({
        container: mapDiv.current, // container ID
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [long, lat], // starting position [lng, lat]
        zoom: 12, // starting zoom
        projection: "globe", // display the map as a 3D globe
      });
    }
  }

  function chat() {
    dispatch(
      chatWithUser({ senderId: loggedUser._id, receiverId: userDetail._id })
    ).then((e) => {
      navigate("/chat");
    });
  }

  mapboxgl.accessToken =
    "pk.eyJ1IjoicG9saW5vIiwiYSI6ImNsN2FtdWNybTB0bmk0MHNqZXZxMzM0OTYifQ.O2Y9sZnF-K1k_KhC8MzJbA";

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
                {loggedUser._id !== userDetail._id ? (
                  <div>
                    <button
                      onClick={() => chat()}
                      className="py-2 mt-5 ml-5 px-4 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                    >
                      CHATEAR CON ESTE USUARIO
                    </button>
                  </div>
                ) : (
                  <></>
                )}
                <div>
                  <Link to={`/reportuser`}>
                    <button className="py-2 px-4 my-2 mb-5 mr-2 w-full bg-yellow-900 hover:bg-yellow-700 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                      DENUNCIAR USUARIO
                    </button>
                  </Link>
                </div>
                <br />
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
                {userDetail.place_latitude && userDetail.place_longitude ? (
                  <div
                    ref={mapDiv}
                    style={{
                      //block: "w-full",
                      height: "20vw",
                      width: "30vw",
                      borderRadius: "10px",
                    }}
                  />
                ) : null}
              </div>
            </div>
          </div>

          <div className="w-full mt-1 border-b  absolute  justify-center items-center bg-gray-100">
            <div className="w-full mt-1 border-b  absolute flex justify-center items-center bg-gray-500">
              <Link to="/tradepet">
                <button className="bg-green-900  hover:bg-green-500 text-white font-bold py-2 px-36 border border-yellow-700 rounded">
                  <h2 className="font-semibold">
                    {" "}
                    {`🔔 Tienes ${loggedUser?.interestedUsers?.length} usuarios interesados en tus mascotas`}
                  </h2>
                </button>
              </Link>
            </div>
            <div id="editPet" className="grid grid-cols-3 mt-10 place-content-center ">
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
                <h3  className="text-2xl font-bold">
                  No hay mascotas que mostrar...
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
