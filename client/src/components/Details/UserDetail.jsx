import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "flowbite-react/lib/esm/components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
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

  console.log(userDetail);

  const [show, setShow] = useState(false);

  const onClick = () => {
    setShow(true);
  };

  const onClose = () => {
    setShow(false);
  };

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
    // <>
    //   <NavBar />
    //   <>
    //     <div className="rounded overflow-hidden border border-[#B99782] w-full bg-white my-12 md:mx-0 lg:mx-0">
    //       <div className="w-full grid grid-cols-3 justify-between p-3 border-b items-center  bg-gray-300">
    //         <div className="flex items-center">
    //           <img
    //             src={userDetail.image}
    //             className="w-96 h-30 bg-cover border-solid border-2 border-[#B99782] rounded-full "
    //             alt="imageuser"
    //           />
    //           <div className="grid m-4">
    //             {loggedUser._id === userDetail._id ? (
    //               <div className="flex">
    //                 <h1 className="text-5xl font-bold">
    //                   {userDetail.first_name + " " + userDetail.last_name}
    //                 </h1>
    //               </div>
    //             ) : (
    //               <h1 className="text-5xl font-bold">
    //                 {userDetail.first_name + " " + userDetail.last_name}
    //               </h1>
    //             )}

    //             <h3 className="text-2xl">{`"${userDetail.username}"`}</h3>
    //             <h3 className="text-2xl font-bold">
    //               Tel:{userDetail.telephone}
    //             </h3>
    //             <h3 className="text-2xl font-bold">
    //               Email: {userDetail.email}
    //             </h3>

    //             <h3 className="text-2xl ">{userDetail.about}</h3>
    //             {loggedUser._id !== userDetail._id ? (
    //               <div>
    //                 <button
    //                   onClick={() => chat()}
    //                   className="py-2 mt-5 ml-5 px-4 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
    //                 >
    //                   CHATEAR CON ESTE USUARIO
    //                 </button>
    //               </div>
    //             ) : (
    //               <></>
    //             )}
    //             <div>
    //               <Link to={`/reportuser`}>
    //                 <button className="py-2 px-4 my-2 mb-5 mr-2 w-full bg-yellow-900 hover:bg-yellow-700 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
    //                   DENUNCIAR USUARIO
    //                 </button>
    //               </Link>
    //             </div>
    //             <br />
    //             <div>
    //               {loggedUser._id === userDetail._id ? (
    //                 <div className="flex">
    //                   <Link to="/petregister">
    //                     <button className=" mt-5 ml-5 p-2 w-32 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
    //                       📝Crear nueva mascota
    //                     </button>
    //                   </Link>
    //                   <Link to="/interestedtraders">
    //                     <button className=" mt-5 ml-5 p-2 w-32 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
    //                       <h2 className="font-semibold">{`Traspasar mascotas`}</h2>
    //                     </button>
    //                   </Link>
    //                   <Link to="/updateuser">
    //                     <button className="py-2 mt-5 ml-5 px-4 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
    //                       ✏️Editar Perfil
    //                     </button>
    //                   </Link>

    //                   {userDetail.isAdmin === true ? (
    //                     <Link to="/admin">
    //                       <button className=" mt-5 ml-5 p-2  w-28 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
    //                         Vista de administrador
    //                       </button>
    //                     </Link>
    //                   ) : (
    //                     false
    //                   )}
    //                 </div>
    //               ) : (
    //                 <></>
    //               )}
    //             </div>
    //             {userDetail.place_latitude && userDetail.place_longitude ? (
    //               <div
    //                 ref={mapDiv}
    //                 style={{
    //                   //block: "w-full",
    //                   height: "20vw",
    //                   width: "30vw",
    //                   borderRadius: "10px",
    //                 }}
    //               />
    //             ) : null}
    //           </div>
    //         </div>
    //       </div>

    //       <div className="w-full mt-1 border-b  absolute  justify-center items-center bg-gray-100">
    //         <div className="w-full mt-1 border-b  absolute flex justify-center items-center bg-gray-500">
    //           <Link to="/tradepet">
    //             <button className="bg-green-900  hover:bg-green-500 text-white font-bold py-2 px-36 border border-yellow-700 rounded">
    //               <h2 className="font-semibold">
    //                 {" "}
    //                 {`🔔 Tienes ${loggedUser?.interestedUsers?.length} usuarios interesados en tus mascotas`}
    //               </h2>
    //             </button>
    //           </Link>
    //         </div>
    //         <div id="editPet" className="grid grid-cols-3 mt-10 place-content-center ">
    //           {userDetail.pets?.length ? (
    //             userDetail.pets.map((pets) => (
    //               <OwnedPet
    //                 key={pets._id}
    //                 idUser={userDetail._id}
    //                 idPet={pets._id}
    //                 namePet={pets.name}
    //                 imagePet={pets.image}
    //                 isAdopted={pets.isAdopted}
    //                 pets={userDetail.pets}
    //                 isDeleted={pets.deleted}
    //                 interestedUsers={userDetail.interestedUsers}
    //               ></OwnedPet>
    //             ))
    //           ) : (
    //             <h3  className="text-2xl font-bold">
    //               No hay mascotas que mostrar...
    //             </h3>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </>
    // </>
    <div className="h-screen">
      <NavBar />
      <Modal
        show={show}
        popup={true}
        onClose={onClose}
        class="bg-gray-800 bg-opacity-500"
      >
        <div className="pl-2 p-3 bg-yellow-600 rounded-md">
          <Modal.Header>
            <p className="text-white">{userDetail.first_name} {userDetail.last_name}</p>
          </Modal.Header>
        </div>
        <Modal.Body class="p-6">
          <div className="space-y-6">
            <div >
              <div >
                <div className="h-80">
                  <div className="h-1/4 flex items-center justify-center flex-col">
                    <div className="bg-white flex justify-center">
                      <h1 className="text-xl font-semibold">
                      📩 Email: {userDetail.email}
                      </h1>
                    </div>
                  </div>
                  <div className="h-1/4 flex items-center justify-center flex-col">
                    <div className="bg-white flex justify-center">
                      <h1 className="text-xl font-semibold">
                      📞Telefono: {userDetail.telephone ? userDetail.telephone : "No hay información detallada"}
                      </h1>
                    </div>
                  </div>
                  <div className="h-1/4 flex items-center justify-center flex-col">
                    <div className="bg-white flex justify-center">
                      <h1 className="text-xl font-semibold">
                      📍 Ubicación: {userDetail.place}
                      </h1>
                    </div>
                  </div>
                  <div className="h-1/4 flex items-center justify-center flex-col">
                    <div className="bg-white flex justify-center">
                      <h1 className="text-xl font-semibold">
                        Cuenta creada el: {userDetail.createdAt.slice(0, 10)}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <>
        <div className="lg:mx-36 my-12 h-4/5 rounded-xl bg-yellow-800">
          <div className="h-3/4">
            <div className="flex h-1/2">
              <img
                src="https://sergimateo.com/wp-content/2012/11/portadas-twitter-1.jpg"
                alt=""
                className="w-screen object-cover rounded-t-xl"
              />
              <div className="absolute lg:mt-24 lg:ml-24 mt-48 ml-4">
                <img
                  src={userDetail.image}
                  alt=""
                  className="w-32 h-32 lg:w-80 lg:h-80 bg-cover border-solid border-2 border-[#B99782] rounded-full"
                />
              </div>
            </div>
            <div className="h-1/2 flex">
              <div className="w-1/3"></div>
              <div className="w-2/3 flex">
                <div className="w-1/2 flex flex-col justify-around">
                  <div>
                    <h3 className="text-6xl text-white font-semibold">
                      {userDetail.first_name} {userDetail.last_name}
                    </h3>
                    <p className="font-semibold text-white">
                      ({userDetail.username})
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-400">
                      Descripción:{" "}
                      {userDetail.about
                        ? userDetail.about
                        : "Este usuario no ha aportado descripción aún"}
                    </h3>
                  </div>
                </div>
                <div className="w-1/2">
                  {userDetail.place_latitude && userDetail.place_longitude ? (
                    <div
                      ref={mapDiv}
                      style={{
                        //block: "w-full",
                        height: "14.5vw",
                        width: "27.6vw",
                        borderRadius: "10px",
                      }}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="h-1/5 flex">
            <div className="w-1/2 flex justify-center items-center mt-10">
              <h3 className="text-xl font-semibold">Mascotas del usuario</h3>
            </div>
            <div className="w-1/2 lg:flex lg:items-center lg:justify-around">
              {loggedUser._id !== userDetail._id ? (
                <div>
                  <button
                    onClick={() => chat()}
                    className="py-2 mt-5 ml-5 px-4 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                  >
                    Enviar mensaje
                  </button>
                </div>
              ) : (
                <></>
              )}
              {loggedUser._id === userDetail._id ? (
                <Link to="/updateuser">
                  <button className="py-2 mt-5 ml-5 px-4 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                    ✏️Editar Perfil
                  </button>
                </Link>
              ) : (
                false
              )}
              <Button
                onClick={() => {
                  onClick();
                }}
                class="py-2 mt-5 ml-5 px-4 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              >
                Más información
              </Button>
              <Link to={`/reportuser`}>
                <button className="py-2 mt-5 ml-5 px-4 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                  Denunciar
                </button>
              </Link>
            </div>
          </div>
          <div className="bg-yellow-700 mt-10 rounded-xl">
            <div id="editPet" className="grid grid-cols-3 place-content-center">
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
                  No hay mascotas que mostrar...
                </h3>
              )}
            </div>
          </div>
        </div>
      </>
    </div>
  ) : (
    <>
      <NavBar />
      <Loader />
    </>
  );
}
