import React from "react";
import NavBar from "../NavBar/NavBar";
import "./Blog.css";
import { useSelector } from "react-redux";

import {
  getAllUsers,
  getAllPets,
  getUserProfile,
  patchUsuer,
} from "../../redux/Actions";
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
import broncepaw from "../../assets/images/broncepaw.gif";
import goldenpaw from "../../assets/images/goldenpaw.gif";
import goldenblackgif from "../../assets/images/goldenblackgif.gif";
import diamantepaw from "../../assets/images/diamantepaw.gif";
import amarillobaño from "../../assets/images/amarillobaño.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Blog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.userProfile);
  const allUsers = useSelector((state) => state.users);
  const allPets = useSelector((state) => state.pets);
  var donator = allUsers.filter((user) => user?.donations?.length >= 1);
  var adopted = allPets.filter((pet) => pet?.isAdopted === true);
  var blogger = allUsers.filter((user) => user?.blogmessage?.length >= 1);
  const [input, setInput] = useState();
  const id = localStorage.getItem("id");

  //RANKING DONACIONES-----------------------------------------------------------
  let rankingdonations = donator?.sort(
    (a, b) => a?.donations?.length - b?.donations?.length
  );

  let ranking1donator = rankingdonations[rankingdonations?.length - 1];
  let ranking2donator = rankingdonations[rankingdonations?.length - 2];
  let ranking3donator = rankingdonations[rankingdonations?.length - 3];
  let ranking4donator = rankingdonations[rankingdonations?.length - 4];
  let ranking5donator = rankingdonations[rankingdonations?.length - 5];

  //RANKING LIKES-----------------------------------------------------------
  let likedPets = allPets?.filter((pet) => pet?.likes?.length);
  let rankingPets = likedPets?.sort(
    (a, b) => a?.likes?.length - b?.likes.length
  );

  let ranking1likes = rankingPets[rankingPets?.length - 1];
  let ranking2likes = rankingPets[rankingPets?.length - 2];
  let ranking3likes = rankingPets[rankingPets?.length - 3];
  let ranking4likes = rankingPets[rankingPets?.length - 4];
  let ranking5likes = rankingPets[rankingPets?.length - 5];

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllPets());
    dispatch(getUserProfile(id));
  }, [dispatch, id]);

  function handleChange(e) {
    setInput(e.target.value);
  }
  function onSubmitHandler(e) {
    // e.preventDefault();
    let payload = {
      id: loggedUser._id,
      blogmessage: input,
    };

    dispatch(patchUsuer(payload)).then(navigate("/blog", { replace: true }));
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
        <hr className="border" />
        {/* -HR---------------CONOCENOS--------------------------------------------------hr */}
        <div class="opacity-90 bg-yellow-900 ">
          <Card class="opacity-80 bg-yellow-900 flex justify-center">
            <h5 className="text-2xl font-bold tracking-tight text-white dark:text-white">
              Conoce a tus próximos amigos
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
        {/* hr-----------------------------CARROUSEL-------------------------------------------------- */}
        <div className="bg-yellow-900 flex justify-center  opacity-90">
          <h5 className="flex justify-center m-2 text-4xl font-bold leading-none text-white dark:text-white">
            🤎 Mas de {adopted?.length - 1} mascotas adoptadas a la fecha
          </h5>
        </div>
        <div className="w-screen h-1/4 bg-yellow-900  opacity-90 flex justify-center ">
          <Carousel>
            {adopted?.map((adopt) => (
              <img alt="adoptedPet" src={adopt.image} className="w-96 h-72" />
            ))}
          </Carousel>
        </div>

        <div className=" w-screen bg-yellow-900 rounded opacity-90">
          <Link to="/home" className="group flex justify-center rounded-full">
            <Button class="m-3 w-48 bg-green-600 hover:bg-green-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
              <h5 className=" justify-center text-2xl font-bold leading-none text-white dark:text-white">
                Buscar una Mascota
              </h5>
            </Button>
          </Link>
        </div>
        <hr className="border" />
        {/* --HR------------CHATITO------------------------------------------------------------------------------------------hr */}

        <div className="lg:flex gap-4 opacity-90 bg-yellow-900 lg:justify-center lg:m-25">
          <div className="w-96  flex justify-center">
            <Card class="opacity-80 bg-yellow-900 flex justify-center">
              <form
                onSubmit={(e) => onSubmitHandler(e)}
                className="flex flex-col gap-2"
              >
                <h5 className="text-2xl font-bold tracking-tight text-white dark:text-white">
                  Juntos podemos
                </h5>
                <p className="font-normal text-gray-100 dark:text-gray-100">
                  Compartenos tu experiencia aquí para que otros usuarios se
                  animen a dejar su huella.
                </p>

                <div>
                  <div>
                    <div className="m-1 block">
                      <Label
                        htmlFor="area"
                        value="Mensaje:"
                        class="text-white"
                      />
                    </div>
                    <input
                      className="rounded-lg flex-1 appearance-none border border-gray-300 w-3/4 p-1 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
                      id="area"
                      type="text"
                      onChange={(e) => handleChange(e)}
                      required={true}
                      sizing="lg"
                    />
                  </div>

                  <Button
                    class="flex justify-center m-2 w-1/2 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                    type="submit"
                  >
                    Postear
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          <div className=" w-96 flex justify-center">
            <Card class="bg-gray-100  m-2 rounded">
              <div className="mb-1 flex ">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  Últimos mensajes 💌
                </h5>

                <Link
                  to={`/home`}
                  className="text-sm font-medium text-yellow-600 hover:underline dark:text-yellow-500"
                >
                  Ver Todos
                </Link>
              </div>

              <ul className=" divide-y divide-gray-200 dark:divide-gray-700">
                {blogger?.slice(0, 5).map((user) => (
                  <li className="py-3 px-4 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="shrink-0">
                        <Link
                          to={`/users/${user._id}`}
                          className="group flex items-center rounded-full"
                        >
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.image}
                            alt="image"
                          />
                        </Link>
                      </div>
                      <div className="min-w-0 flex-1">
                        <Link
                          to={`/users/${user._id}`}
                          className="group flex items-center rounded-full"
                        >
                          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                            {user.username}
                          </p>
                        </Link>
                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                          {user.blogmessage}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <hr className="border" />
        </div>
        <hr className="border" />
        {/* hr--------------------------------------------------------------------------------- */}
        {/* -----------------------------TOPS-----------------------------------------------hr */}

        <div className="lg:column gap-4 opacity-90 bg-yellow-900 lg:justify-center ">
          <div className="p-5">
            <h5 className="text-5xl text-center font-bold tracking-tight text-white dark:text-white">
              🏆 Top Tails 🏆
            </h5>
          </div>

          <div className="opacity-90 bg-yellow-900 p-3  flex flex-col lg:flex-row  justify-center">
            <div className=" flex justify-center">
              <Card>
                <div className=" flex flex-end justify-between">
                  <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    🥇 Ranking de Likes
                  </h5>
                  {/* <Link
                    to="/home"
                    className="text-sm font-medium text-yellow-600 hover:underline dark:text-yellow-500"
                  >
                    Ver Todos
                  </Link> */}
                </div>
                <ul className="  space-y-2   ">
                  <li>
                    <Link
                      to={`/pet/${ranking1likes?._id}`}
                      className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                    >
                      <img
                        className="h-8 w-8 rounded-full"
                        src={ranking1likes?.image}
                        alt=""
                      />
                      <span className="ml-3 flex-1 whitespace-nowrap">
                        {ranking1likes?.name}
                      </span>
                      <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        Platino
                      </span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={goldenblackgif}
                        alt="paw"
                      />
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={`/pet/${ranking2likes?._id}`}
                      className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                    >
                      <img
                        className="h-8 w-8 rounded-full"
                        src={ranking2likes?.image}
                        alt=""
                      />
                      <span className="ml-3 flex-1 whitespace-nowrap">
                        {ranking2likes?.name}
                      </span>
                      <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        Diamante
                      </span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={diamantepaw}
                        alt="paw"
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/pet/${ranking3likes?._id}`}
                      className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                    >
                      <img
                        className="h-8 w-8 rounded-full"
                        src={ranking3likes?.image}
                        alt=""
                      />
                      <span className="ml-3 flex-1 whitespace-nowrap">
                        {ranking3likes?.name}
                      </span>
                      <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        Diamante
                      </span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={goldenpaw}
                        alt="paw"
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/pet/${ranking4likes?._id}`}
                      className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                    >
                      <img
                        className="h-8 w-8 rounded-full"
                        src={ranking4likes?.image}
                        alt=""
                      />
                      <span className="ml-3 flex-1 whitespace-nowrap">
                        {ranking4likes?.name}
                      </span>
                      <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        Bronce
                      </span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={broncepaw}
                        alt="paw"
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/pet/${ranking5likes?._id}`}
                      className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                    >
                      <img
                        className="h-8 w-8 rounded-full"
                        src={ranking5likes?.image}
                        alt=""
                      />
                      <span className="ml-3 flex-1 whitespace-nowrap">
                        {ranking5likes?.name}
                      </span>
                      <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        Bronce
                      </span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={broncepaw}
                        alt="paw"
                      />
                    </Link>
                  </li>
                </ul>
              </Card>
            </div>

            <div className=" mx-3 p-3 flex justify-center">
              <Card>
                <div className="flex items-center justify-between">
                  <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    🔥 Usuarios destacados
                  </h5>
                  {/* <Link
                    to="/home"
                    className="text-sm font-medium text-yellow-600 hover:underline dark:text-yellow-500"
                  >
                    Ver Todos
                  </Link> */}
                </div>

                <ul className=" space-y-2   ">
                  <li>
                    <Link
                      to={`/users/${ranking1donator?._id}`}
                      className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                    >
                      <img
                        className="h-8 w-8 rounded-full"
                        src={ranking1donator?.image}
                        alt=""
                      />
                      <span className="ml-3 flex-1 whitespace-nowrap">
                        {ranking1donator?.username}
                      </span>
                      <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        Platino
                      </span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={goldenblackgif}
                        alt="paw"
                      />
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={`/users/${ranking2donator?._id}`}
                      className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                    >
                      <img
                        className="h-8 w-8 rounded-full"
                        src={ranking2donator?.image}
                        alt=""
                      />
                      <span className="ml-3 flex-1 whitespace-nowrap">
                        {ranking2donator?.username}
                      </span>
                      <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        Diamante
                      </span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={diamantepaw}
                        alt="paw"
                      />
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={`/users/${ranking3donator?._id}`}
                      className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                    >
                      <img
                        className="h-8 w-8 rounded-full"
                        src={ranking3donator?.image}
                        alt=""
                      />
                      <span className="ml-3 flex-1 whitespace-nowrap">
                        {ranking3donator?.username}
                      </span>
                      <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        Oro
                      </span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={goldenpaw}
                        alt="paw"
                      />
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={`/users/${ranking4donator?._id}`}
                      className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                    >
                      <img
                        className="h-8 w-8 rounded-full"
                        src={ranking4donator?.image}
                        alt=""
                      />
                      <span className="ml-3 flex-1 whitespace-nowrap">
                        {ranking4donator?.username}
                      </span>
                      <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        Bronce
                      </span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={broncepaw}
                        alt="paw"
                      />
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={`/users/${ranking5donator?._id}`}
                      className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                    >
                      <img
                        className="h-8 w-8 rounded-full"
                        src={ranking5donator?.image}
                        alt=""
                      />
                      <span className="ml-3 flex-1 whitespace-nowrap">
                        {ranking5donator?.username}
                      </span>
                      <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        Bronce
                      </span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={broncepaw}
                        alt="paw"
                      />
                    </Link>
                  </li>
                </ul>
              </Card>
            </div>

            <div className=" flex justify-center">
              <Card>
                <div className=" flex flex-end justify-between">
                  <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    🎉 Últimas Donaciones
                  </h5>

                  <Link
                    to={`/mydonations/${loggedUser._id}`}
                    className="text-sm font-medium text-yellow-600 hover:underline dark:text-yellow-500"
                  >
                    Ver mis donaciones
                  </Link>
                </div>
                <div className="flow-root">
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {donator
                      ?.reverse()
                      .slice(0, 5)
                      .map((don) => (
                        <li className="p-2 sm:p-2">
                          <div className="flex items-center space-x-4">
                            <Link
                              to={`/users/${don._id}`}
                              className="group flex items-center rounded-full"
                            >
                              <div className="shrink-0">
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src={don.image}
                                  alt=""
                                />
                              </div>
                            </Link>
                            <div className="min-w-0 flex-1">
                              <Link
                                to={`/users/${don._id}`}
                                className="group flex items-center rounded-full"
                              >
                                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                  {don.username}
                                </p>
                              </Link>
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
          </div>
        </div>
        {/* hr--------------------------------------------------------------------------------------------------------------- */}
      </div>
    </>
  );
}
