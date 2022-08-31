import React from "react";
import NavBar from "../NavBar/NavBar";
import "./Blog.css";
import { useSelector } from "react-redux";
import { getAllUsers, getAllPets } from "../../redux/Actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { Carousel, Card } from "flowbite-react";
import cachita from "../../assets/images/carpi.png";
import carpi from "../../assets/images/cachita.png";
import goldenpaw from "../../assets/images/goldenpaw.png";
import goldenblackgif from "../../assets/images/goldenblackgif.gif";
import diamantepaw from "../../assets/images/diamantepaw.png";
import amarillobaño from "../../assets/images/amarillobaño.png";
import { Link } from "react-router-dom";
import { Footer } from "flowbite-react";

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

  return (
    <>
      <NavBar />
      {/*      <hr className="border" /> */}
      <div id="blog" className="column w-screen justify-center">
        <div className="h-3/4 w-full bg-yellow-900  flex justify-center ">
          <Carousel>
            <a href="http://localhost:3000/home">
              <img alt="blog" src={amarillobaño} className="w-screen" />
            </a>

            <a href="http://localhost:3000/home">
              <img alt="blog" src={carpi} className="w-screen  " />
            </a>
            <a href="http://localhost:3000/home">
              <img alt="blog" src={cachita} className="w-screen  " />
            </a>
          </Carousel>
        </div>
        <hr className="border" />
        <div>
          <h1>COMPARTI TU EXPERIENCIA CON NOSOTROS perrito malvado</h1>
        </div>

        <hr className="border" />
        <div className="flex flex-col-3 p-2 ">
          <div className="max-w-sm p-3 mb-2 mt-2">
            <Card>
              <div className="mb-1 flex flex-end items-center justify-between">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  Ultimas donaciones🎉
                </h5>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Ver Todas
                </a>
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
                          {
                            don?.donations[don.donations.length - 1]
                              ?.donationAmount
                          }
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

              <ul className="my-4 space-y-2">
                {donator?.map((don) =>
                  don?.donations.length > 3 ? (
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
                  don?.donations.length > 1 && don?.donations.length < 3 ? (
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
                  don?.donations.length === 1 ? (
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
