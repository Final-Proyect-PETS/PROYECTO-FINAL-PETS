import React from "react";
import NavBar from "../NavBar/NavBar";
import "./Blog.css";
import { useSelector } from "react-redux";
import { getAllUsers, getAllPets, patchUsuer } from "../../redux/Actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  Card,
  CardProps,
  Button,
  Label,
  TextInput,
  Checkbox,
  Textarea,
} from "flowbite-react";
import perronaranja from "../../assets/images/perronaranja.png";
import cachita from "../../assets/images/carpi.png";
import paradonar from "../../assets/images/paradonar.jpg";
import carpi from "../../assets/images/cachita.png";
import goldenpaw from "../../assets/images/goldenpaw.png";
import goldenblackgif from "../../assets/images/goldenblackgif.gif";
import diamantepaw from "../../assets/images/diamantepaw.png";
import amarillobaño from "../../assets/images/amarillobaño.png";
import { useState } from "react";

export default function Blog() {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.userProfile);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  const allUsers = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getAllPets());
  }, [dispatch]);
  const allPets = useSelector((state) => state.pets);
  var donator = allUsers.filter((user) => user?.donations?.length >= 1);
  var adopted = allPets.filter((pet) => pet?.isAdopted === true);
  var blogger = allUsers.filter((user) => user?.blogmessage?.length >= 1);
 
 const [input,setInput]= useState()
 
 function handleChange(e){
  setInput(e.target.value)
  console.log(input)
 }
  function onSubmitHandler(e) {
    e.preventDefault()
    let payload = {
      id: loggedUser._id,
      blogmessage: input,
    };
 dispatch(patchUsuer(payload))

console.log(payload)
  }

  return (
    <>
      <NavBar />

      <div id="blog" className="column w-screen h-screen justify-center">
        {/* MAIN CARROUSEL------------------------------------------------------------------------------------------- */}
        <div className="h-3/4 w-full bg-yellow-900  flex justify-center ">
          <Carousel>
            <a href="http://localhost:3000/home">
              <img alt="blog" src={perronaranja} className="w-screen" />
            </a>
            <a href="http://localhost:3000/donations">
              <img alt="blog" src={paradonar} className="w-screen" />
            </a>

            <a href="http://localhost:3000/home">
              <img alt="blog" src={carpi} className="w-screen  " />
            </a>
            <a href="http://localhost:3000/home">
              <img alt="blog" src={amarillobaño} className="w-screen" />
            </a>
            <a href="http://localhost:3000/home">
              <img alt="blog" src={cachita} className="w-screen  " />
            </a>
          </Carousel>
        </div>
        <hr className="border" />{" "}
        {/* ----------------------------------------------------------------------------hr */}
        <div>
          {" "}
          {/*card descripcion*/}
          <Card class="opacity-80 bg-yellow-900">
            <h5 className="text-2xl font-bold tracking-tight text-white dark:text-white">
              Conocé a tu próximo amigo
            </h5>
            <p className="font-normal text-gray-100 dark:text-gray-100">
              Con Happy Tails vas a encontrar una nueva manera de descubrir
              personas y mascotas que quieren lo mismo que vos.
            </p>
            <p className="font-normal text-gray-100 dark:text-gray-100">
              Te consideramos muy importante para lograr un cambio justo.
              Nuestros equipo ayuda activamente a refugios y animales en
              situación de calle, gracias a tu aporte podemos seguir haciendolo.
            </p>
            <div>
              <Link to="/donations">
                <Button class=" mt-5 ml-5 p-2 w-32 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                  Donar
                  <svg /* svg es la flecha del boton, pued volar */
                    className="ml-2 -mr-1 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </Link>
              <Link to="/home">
                <Button class=" mt-5 ml-5 p-2 w-48 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                  Conocer mascotas
                  <svg /* svg es la flecha del boton, pued volar */
                    className="ml-2 -mr-1 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </Link>
            </div>
          </Card>
        </div>
        <hr className="border" />
        {/* --------------------------------------------------------------------------------------------------------hr */}
        <div className="flex flex-col-3 w-screen ">
          <div className="flex max-w-sm m-2">
            {/* CARD DE INPUT MENSAJE */}
            <Card>
              <form  onSubmit={e=>onSubmitHandler(e)} className="flex flex-col gap-4">
                <div>
                  <div className="mb-2 block">
                    <p className="font-normal text-black dark:text-gray-100">
                      Compartenos tu experiencia aquí para que otros usuarios se
                      animen a dejar su huella.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="area" value="Mensaje:" />
                  </div>
                  <input
                    id="area"
                    type="text"
                    onChange={(e) => handleChange(e)}
                    required={true}
                    sizing="lg"
                  />
                </div>

                <Button
                  class="flex justify-center bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                  type="submit"
                 
                >
                  Postear
                </Button>
              </form>
            </Card>
          </div>
          <div className="max-w-sm  p-3 mb-2 mt-2">
            <Card class="bg-gray-100 rounded">
              <div className="mb-1 flex flex-end items-center  justify-between">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  Comentarios de la comunidad 💌
                </h5>

                <Link
                  to={`/mydonations/${loggedUser._id}`}
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Ver Todos
                </Link>
              </div>
              <div className="flow-root">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {blogger?.map((user) => (
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="shrink-0">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.image}
                            alt="Neil image"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                            {user.username}
                          </p>
                          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                            {user.blogmessage}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
          {/* CARRUSEL YA ADOPTADOS */}
          <div className=" flex m-2 h-72 w-1/3 bg-yellow-900 rounded opacity-90">
            <div className=" m-1 flex flex-col justify-center">
              <h5 className=" justify-center m-3 text-3xl font-bold leading-none text-white dark:text-white">
                Mas de {adopted?.length - 1} mascotas adoptadas a la fecha
              </h5>
              <Link to="/home">
                <Button class="m-3 w-48 bg-green-600 hover:bg-green-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                  <h5 className=" justify-center text-2xl font-bold leading-none text-white dark:text-white">
                    Buscar Mascota
                  </h5>
                </Button>
              </Link>
            </div>
            <Carousel className="rounded">
              {adopted?.map((adopt) => (
                <img
                  alt="adoptedPet"
                  src={adopt.image}
                  className="w-96 rounded"
                />
              ))}
            </Carousel>
          </div>
        </div>
        <hr className="border" />
        {/* hr--------------------------------------------------------------------------------- */}
        <div className="flex flex-col-3 p-2 ">
          <div className="max-w-sm  p-3 mb-2 mt-2">
            <Card class="bg-gray-100 rounded">
              <div className="mb-1 flex flex-end items-center  justify-between">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  Ultimas donaciones🎉
                </h5>

                <Link
                  to={`/mydonations/${loggedUser._id}`}
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Ver mis donaciones
                </Link>
              </div>
              <div className="flow-root">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {donator?.map((don) => (
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="shrink-0">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={don.image}
                            alt="Neil image"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                            {don.username}
                          </p>
                          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                            {don.place}
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          {`$ ${
                            don?.donations[don?.donations?.length - 1]
                              ?.donationAmount
                          }`}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
          <div></div>
          <div className="max-w-sm p-3 mb-2 mt-2">
            <Card>
              <div className="mb-1 flex items-center justify-between">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  🔥Usuarios destacados
                </h5>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Ver Todos
                </a>
              </div>

              <ul className="my-4 space-y-2   ">
                {donator?.map((don) =>
                  don?.donations?.length > 3 ? (
                    <li>
                      <a
                        href="#"
                        className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                      >
                        <img
                          className="h-8 w-8 rounded-full"
                          src={don.image}
                          alt="PERFIL"
                        />
                        <span className="ml-3 flex-1 whitespace-nowrap">
                          {don.username}
                        </span>
                        <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                          Platino
                        </span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={goldenblackgif}
                          alt="Neil image"
                        />
                      </a>
                    </li>
                  ) : (
                    false
                  )
                )}

                {donator?.map((don) =>
                  don?.donations?.length > 1 && don?.donations?.length < 3 ? (
                    <li>
                      <a
                        href="#"
                        className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                      >
                        <img
                          className="h-8 w-8 rounded-full"
                          src={don.image}
                          alt="PERFIL"
                        />
                        <span className="ml-3 flex-1 whitespace-nowrap">
                          {don.username}
                        </span>
                        <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                          Diamante
                        </span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={diamantepaw}
                          alt="Neil image"
                        />
                      </a>
                    </li>
                  ) : (
                    false
                  )
                )}
                {donator?.map((don) =>
                  don?.donations?.length === 1 ? (
                    <li>
                      <a
                        href="#"
                        className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                      >
                        <img
                          className="h-8 w-8 rounded-full"
                          src={don.image}
                          alt="PERFIL"
                        />
                        <span className="ml-3 flex-1 whitespace-nowrap">
                          {don.username}
                        </span>
                        <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                          Oro
                        </span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={goldenpaw}
                          alt="goldenpaw"
                        />
                      </a>
                    </li>
                  ) : (
                    false
                  )
                )}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
