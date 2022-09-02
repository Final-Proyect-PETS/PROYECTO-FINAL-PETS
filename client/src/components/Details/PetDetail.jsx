import React, { useLayoutEffect, useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getPetDetail, clearStatePet } from "../../redux/Actions";
import NavBar from "../NavBar/NavBar";
import Loader from "./../Loaders/Loader";
import { Carousel } from "flowbite-react";
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import mapboxgl from "mapbox-gl";

export default function PetDetail() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const petDetail = useSelector((state) => state.petDetail);
  const loggedUser = useSelector((state) => state.userProfile);
  const mapDiv = useRef(null);

  useEffect(() => {
    dispatch(clearStatePet());
    dispatch(getPetDetail(id));
  }, [dispatch, id]);

  useLayoutEffect(() => {
    createNewMap(petDetail.place_longitude, petDetail.place_latitude);
  }, [petDetail.place_latitude, petDetail.place_longitude]);

  function createNewMap(long, lat) {
    if (petDetail.place_latitude && petDetail.place_longitude) {
      new mapboxgl.Map({
        container: mapDiv.current, // container ID
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [long, lat], // starting position [lng, lat]
        zoom: 12, // starting zoom
        projection: "globe", // display the map as a 3D globe
      });
    }
  }

  mapboxgl.accessToken =
    "pk.eyJ1IjoicG9saW5vIiwiYSI6ImNsN2FtdWNybTB0bmk0MHNqZXZxMzM0OTYifQ.O2Y9sZnF-K1k_KhC8MzJbA";

  return Object.keys(petDetail).length ? (
    <div>
      <NavBar />
      <h2 className="flex justify-center font-semibold text-3xl mt-3">
        Detalles 🐶
      </h2>

      <div className="flex w-2/3 my-10 ml-60 flex-row border-2 border-black">
        <div>
          <FacebookShareButton
            url={`https://www.happytails.com/pet/${petDetail._id}`}
            quote={"Adoptame"}
            hashtag={"#happytails"}
          >
            <FacebookIcon size={40} />
          </FacebookShareButton>
        </div>
        <div>
          <EmailShareButton
            subject="Quiero que me adoptes"
            body={`Adoptame en https://www.happytails.com/pet/${petDetail._id}`}
          >
            <EmailIcon size={40} />
          </EmailShareButton>
        </div>

        <div className="flex flex-col w-1/2 m-3 items-center gap-3">
          {loggedUser._id === petDetail.user._id ? (
            <Link to="/updatepet">
              <button className="py-2 px-4 my-4 w-full bg-yellow-900 hover:bg-yellow-600 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                📝Editar mascota
              </button>
            </Link>
          ) : (
            <></>
          )}
          <div className="h-56 w-72 bg-yellow-900 rounded ">
            <Carousel className="rounded">
              <img
                src={petDetail?.image}
                alt="imagen mascota"
                // width="500px"
                className="w-96"
              />
              {petDetail?.imagePool?.map((image) => (
                <img alt={image} src={image} className="w-96 rounded" />
              ))}
            </Carousel>
          </div>
          <h2 className="font-semibold">
            Descripción: {petDetail.description}
          </h2>
        </div>

        <div className="flex flex-col w-1/2">
          <div className="flex flex-col items-center w-full h-1/3 justify-center">
            <h2 className="font-semibold text-2xl">{petDetail.name}</h2>
            <h2 className="font-semibold">
              Dueño:{" "}
              {petDetail.user.first_name + " " + petDetail.user.last_name}
            </h2>
            <h3 className="font-semibold">{`Vivo en ${petDetail.place}`}</h3>
            {petDetail.place_latitude && petDetail.place_longitude ? (
              <div
                ref={mapDiv}
                style={{
                  //block: "w-full",
                  height: "40vw",
                  width: "28vw",
                  borderRadius: "10px",
                }}
              />
            ) : null}
          </div>
          <div className="flex flex-wrap w-full h-1/2 justify-center items-center border-y border-black">
            <div className="w-1/2 h-1/2 flex justify-center items-center border-b">
              <h3 className="font-semibold">
                Tamaño:{" "}
                {petDetail.size === "big"
                  ? "Grande"
                  : petDetail.size === "medium"
                  ? "Mediano"
                  : "Chico"}
              </h3>
            </div>
            <div className="w-1/2 h-1/2 flex justify-center items-center border-b">
              <h3 className="font-semibold">
                ¿Está vacunado?:{" "}
                {petDetail.vaccination === "yes"
                  ? "Sí"
                  : petDetail.vaccination === "no"
                  ? "No"
                  : "No se sabe"}
              </h3>
            </div>
            <h3 className="absolute flex justify-center items-center font-semibold">
              Género: {petDetail.gender === "female" ? "Hembra" : "Macho"}
            </h3>
            <div className="w-1/2 h-1/2 flex justify-center items-center border-t">
              <h3 className="font-semibold">Edad: {petDetail.age} años</h3>
            </div>
            <div className="w-1/2 h-1/2 flex justify-center items-center border-t">
              <h3 className="font-semibold mr-10">
                Castrado: {petDetail.castrated === true ? "Si" : "No"}
              </h3>
            </div>
          </div>
          <div className="flex justify-center items-center h-1/5">
            {loggedUser._id !== petDetail.user._id ? (
              petDetail.isAdopted === true ? (
                <div className="flex space-between">
                  <Link to={`/users/${petDetail.user._id}`}>
                    <button className="py-2 px-4 my-4 mr-2 w-full bg-yellow-900 hover:bg-yellow-700 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                      PERFIL DEL DUEÑO
                    </button>
                  </Link>
                  {/* { <Link to={`/adopt/${petDetail._id}`}>
                  <button className="py-2 px-4 my-4 w-full ml-2 bg-yellow-900 hover:bg-green-700 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                    LO QUIERO!
                  </button>
                </Link> } */}
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <h2 className="font-semibold text mt-5">
                    {" "}
                    "ESTA MASCOTA ESTA BUSCANDO NUEVO DUEÑO!"
                  </h2>
                  <div className="flex space-between">
                    <Link to={`/reportpet`}>
                      <button className="py-2 px-4 my-2 mb-5 mr-2 w-full bg-yellow-900 hover:bg-yellow-700 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                        DENUNCIAR PUBLICACION
                      </button>
                    </Link>
                    <Link to={`/users/${petDetail.user._id}`}>
                      <button className="py-2 px-4 my-2 mb-5 mr-2 w-full bg-yellow-900 hover:bg-yellow-700 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                        PERFIL DEL DUEÑO
                      </button>
                    </Link>
                    <Link to={`/adopt/${petDetail._id}`}>
                      <button className="py-2 px-4 my-2 mb-5  w-full ml-2 bg-green-900 hover:bg-green-600 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                        LO QUIERO!
                      </button>
                    </Link>
                  </div>
                </div>
              )
            ) : (
              <>
                <h2 className="font-semibold text">
                  ESTA MASCOTA TE PERTENECE! Quieres
                  {petDetail.isAdopted === false
                    ? " quitarla de adopción?"
                    : " ponerla en adopción?"}
                </h2>

                <Link to={`/users/${petDetail.user._id}`}>
                  <button className="py-2 px-3 my-4 mr-8  w-full bg-yellow-900 hover:bg-green-700 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                    📝 CAMBIAR ESTADO
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>
      <NavBar />
      <Loader />
    </>
  );
}
