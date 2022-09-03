import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Button } from "flowbite-react/lib/esm/components";
import { useDispatch } from "react-redux";
import { getUserDetail } from "../../redux/Actions";
import { getReportedPets, getReportedUsers } from "../../redux/Actions";
import "./AdminView.css";
import { useEffect } from "react";

export default function AdminView() {
  const getUsers = useSelector((state) => state.users);

  const getPets = useSelector((state) => state.pets);

  const reportedPets = useSelector((state) => state.reportedPets);

  const reportedUsers = useSelector((state) => state.reportedUsers);

  const [show, setShow] = useState(false);

  const petsAdopted = getPets.filter((p) => p.isAdopted === true);

  const petsNotAdopted = getPets.filter((p) => p.isAdopted === false);

  const [user, setUser] = useState("");

  const userr = getUsers.filter((m) => m._id === user);

  const donatedUsers = getUsers.filter((m) => m.donations);

  const don = userr.map((d) => d.donations.map((d) => d.donationAmount));

  const dispatch = useDispatch();

  console.log(don);

  // const amount = donatedUsers.map((m) => m.donations.map((d) => d.donationAmount).reduce((prev, curr) => prev + curr))

  // console.log(amount)

  const onClick = () => {
    setShow(true);
  };

  const onClose = () => {
    setShow(false);
  };

  useEffect(() => {
    dispatch(getReportedPets());
    dispatch(getReportedUsers());
  }, []);

  return (
    <div>
      <NavBar />
      <Modal
        show={show}
        popup={true}
        onClose={onClose}
        class="bg-gray-800 bg-opacity-100"
      >
        <div className="pl-2 p-3 bg-yellow-600 rounded-md">
          <Modal.Header>
            <p className="text-white">Datos del usuario</p>
          </Modal.Header>
        </div>
        <Modal.Body class="p-6">
          <div className="space-y-6">
            <div>
              {userr.map((m) => (
                <div>
                  <div className="bg-white flex pl-5">
                    <div className="w-1/4">
                      <img
                        src={m.image}
                        alt=""
                        className="rounded-full w-36 h-36"
                      />
                    </div>
                    <div className="flex flex-col bg-white w-3/4 justify-center items-center border-b-gray-500">
                      <div className="text-3xl">
                        {m.first_name} {m.last_name}
                      </div>
                      <div>{m.username}</div>
                      <div>{m.email}</div>
                      <div>{m.telephone}</div>
                      <div>{m.place}</div>
                    </div>
                  </div>
                  <div className="bg-white h-80">
                    <div className=" h-1/4 flex items-center justify-center flex-col">
                      <div className="bg-white flex justify-center">
                        <h1>
                          Cuenta creada el:
                          {m.createdAt.slice(0, 10)} a las
                          {m.createdAt.slice(11, 19)}
                        </h1>
                      </div>
                      <div className="flex justify-center">
                        <h1>
                          Cuenta editada por ultima vez el:
                          {m.updatedAt.slice(0, 10)} a las
                          {m.updatedAt.slice(11, 19)}
                        </h1>
                      </div>
                    </div>
                    <div className=" h-2/4 flex">
                      <div className="w-1/2 h-full">
                        <div className="h-1/2 flex justify-center items-center">
                          <h3>
                            Mascotas adoptadas:{" "}
                            {m.pets.filter((m) => m.isAdopted === true).length}
                          </h3>
                        </div>
                        <div className="h-1/2 flex justify-center items-center">
                          <h3>
                            Mascotas en adopción:{" "}
                            {m.pets.filter((m) => m.isAdopted === false).length}
                          </h3>
                        </div>
                      </div>
                      <div className="w-1/2 h-full">
                        <div className="h-1/2 flex justify-center items-center">
                          <h3 className="text-center">
                            Este usuario donó:{" "}
                            {m.donations.length > 0 ? (
                              <p>{m.donations.length} veces</p>
                            ) : m.donations.length === 1 ? (
                              <p>1 vez</p>
                            ) : (
                              <p>Todavía no realizó donaciones</p>
                            )}
                          </h3>
                        </div>
                        <div className="h-1/2 flex justify-center items-center">
                          <h3>
                            Donado en total: $
                            {m.donations.length > 0
                              ? m.donations
                                  .map((d) => d.donationAmount)
                                  .reduce((prev, curr) => prev + curr)
                              : 0}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white h-1/4 flex items-center justify-around">
                      <button class="py-2 px-4  bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-500 focus:ring-offset-indigo-200 text-white w-28 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                        <Link to={"/users/" + m._id}>Perfil del usuario</Link>
                      </button>
                      <button class="py-2 px-4  bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-500 focus:ring-offset-indigo-200 text-white w-28 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                        Editar usuario
                      </button>
                      <button class="py-2 px-4  bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-500 focus:ring-offset-indigo-200 text-white w-28 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                        Eliminar usuario
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div id="view-admin">
        <div className="w-full text-center p-5">
          <h3 className="text-6xl font-semibold italic text-gray-800">
            Happy Tails
          </h3>
          <h3 className="text-2xl p-3 text-gray-800">Vista de administrador</h3>
        </div>

        <div className="flex h-screen">
          <div className="w-1/2">
            <div className="h-4/5">
              <div className="flex justify-center">
                <h3 className="text-2xl py-2 italic font-semibold text-gray-800">
                  Usuarios Registrados
                </h3>
              </div>
              <div className="h-full pb-30 overflow-auto bg-[#685737] bg-opacity-80">
                <ol className="ml-4 mt-4 text-white font-medium">
                  {getUsers.map((u) => (
                    <li className="flex gap-3 ring-yellow-900 h-16 overflow-hidden items-center">
                      <div className="flex items-center h-12 w-4/5 flex-row overflow-hidden gap-3 p-4">
                        {
                          <img
                            src={u.image}
                            alt=""
                            className="w-8 h-8 rounded-full"
                          />
                        }
                        {
                          <Link to={"/users/" + u._id}>
                            {u.first_name} {u.last_name}
                          </Link>
                        }
                        | Username: {u.username} | {u.email}
                      </div>
                      <div className="w-2/5 flex justify-center">
                        <div>
                          <Button
                            onClick={() => {
                              onClick();
                              setUser(u._id);
                            }}
                            class="w-full bg-yellow-900 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                          >
                            Más información
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
          <div className="w-1/2 overflow-hidden text-white font-semibold">
            <h3 className="text-2xl p-2 text-center italic font-semibold text-gray-800">
              Estadísticas
            </h3>
            <div className="h-1/5 flex bg-[#685737] bg-opacity-90 text-white font-semibold">
              <div className="w-1/2 flex justify-center items-center">
                <div className="flex h-3/4 w-3/4 bg-yellow-600">
                  <div className="w-1/4 flex justify-center items-center">
                    <h3 className="text-2xl">{getUsers.length}</h3>
                  </div>
                  <div className="w-3/4 flex justify-center items-center">
                    <h3>Usuarios Totales</h3>
                  </div>
                </div>
              </div>
              <div className="w-1/2 flex justify-center items-center  ">
                <div className="flex h-3/4 w-3/4 bg-yellow-600">
                  <div className="w-1/4 flex justify-center items-center">
                    <h3 className="text-2xl">{getPets.length}</h3>
                  </div>
                  <div className="w-3/4 flex justify-center items-center">
                    <h3>Mascotas Totales</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-1/5 flex bg-[#685737] bg-opacity-90">
              <div className="w-1/2 flex justify-center items-center">
                <div className="flex h-3/4 w-3/4 bg-yellow-600">
                  <div className="w-1/4 flex justify-center items-center">
                    <h3 className="text-2xl">{petsAdopted.length}</h3>
                  </div>
                  <div className="w-3/4 flex justify-center items-center">
                    <h3>Mascotas Adoptadas</h3>
                  </div>
                </div>
              </div>
              <div className="w-1/2 flex justify-center items-center">
                <div className="flex h-3/4 w-3/4 bg-yellow-600">
                  <div className="w-1/4 flex justify-center items-center">
                    <h3 className="text-2xl">{petsNotAdopted.length}</h3>
                  </div>
                  <div className="w-3/4 flex justify-center items-center">
                    <h3>Mascotas en Adopción</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-1/5 flex bg-[#685737] bg-opacity-90">
              <div className="w-1/2 flex justify-center items-center">
                <div className="flex h-3/4 w-3/4 bg-yellow-600">
                  <div className="w-1/4 flex justify-center items-center">
                    <h3 className="text-2xl">{getUsers.length}</h3>
                  </div>
                  <div className="w-3/4 flex justify-center items-center">
                    <h3>Usuarios Totales</h3>
                  </div>
                </div>
              </div>
              <div className="w-1/2 flex justify-center items-center">
                <div className="flex h-3/4 w-3/4 bg-yellow-600">
                  <div className="w-1/4 flex justify-center items-center">
                    <h3 className="text-2xl">{getUsers.length}</h3>
                  </div>
                  <div className="w-3/4 flex justify-center items-center">
                    <h3>Usuarios Totales</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-1/5 flex bg-[#685737] bg-opacity-90">
              <div className="w-1/2 flex justify-center items-center ">
                <div className="flex h-3/4 w-3/4 bg-yellow-600">
                  <div className="w-1/4 flex justify-center items-center">
                    <h3 className="text-2xl">{donatedUsers.length}</h3>
                  </div>
                  <div className="w-3/4 flex justify-center items-center">
                    <h3>Personas donaron</h3>
                  </div>
                </div>
              </div>
              <div className="w-1/2 flex justify-center items-center">
                <div className="flex h-3/4 w-3/4 bg-yellow-600">
                  <div className="w-1/4 flex justify-center items-center">
                    <h3 className="text-xl">$7.304</h3>
                  </div>
                  <div className="w-3/4 flex justify-center items-center">
                    <h3>Recaudado</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/1">
        <div className="h-4/5">
          <div className="flex justify-center">
            <h3 className="text-2xl py-2 italic font-semibold text-gray-800">
              Denuncias de publicaciones
            </h3>
          </div>
          <div className="h-full pb-30 overflow-auto bg-[#685737] bg-opacity-80">
            <ol className="ml-4 mt-4 text-white font-medium">
              {reportedPets.map((p) => (
                <li className="flex gap-3 ring-yellow-900 h-16 overflow-hidden items-center">
                  <div className="flex items-center h-12 w-4/5 flex-row overflow-hidden gap-3 p-4">
                    ID Reporte: {`${p._id}`}| Denunciante:
                    {` ${p.informerFirstName} ${p.informerLastName}`}
                    {
                      <Link
                        to={`/users/${p.informerId}`}
                        class="py-2 px-1  bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-500 focus:ring-offset-indigo-200 text-white w-28 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                      >
                        VER PERFIL
                      </Link>
                    }
                    | Publicación denunciada:{" "}
                    {
                      <Link
                        to={`/pet/${p.reportedPetId}`}
                        class="py-2 px-1  bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-500 focus:ring-offset-indigo-200 text-white w-28 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                      >
                        VER PUBLICACION
                      </Link>
                    }{" "}
                    | Motivo de la denuncia: {p.reason}
                    <button class="py-2 px-4  bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-500 focus:ring-offset-indigo-200 text-white w-28 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                      ELIMINAR PUBLICACION
                    </button>
                    <button class="py-2 px-4  bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-500 focus:ring-offset-indigo-200 text-white w-28 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                      MARCAR RESUELTO
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <div className="w-1/1">
        <div className="h-4/5">
          <div className="flex justify-center">
            <h3 className="text-2xl py-2 italic font-semibold text-gray-800">
              Denuncias de usuarios
            </h3>
          </div>
          <div className="h-full pb-30 overflow-auto bg-[#685737] bg-opacity-80">
            <ol className="ml-4 mt-4 text-white font-medium">
              {reportedUsers.map((p) => (
                <li className="flex gap-3 ring-yellow-900 h-16 overflow-hidden items-center">
                  <div className="flex items-center h-12 w-4/5 flex-row overflow-hidden gap-3 p-4">
                    ID Reporte: {`${p._id}`}| Denunciante:
                    {` ${p.informerFirstName} ${p.informerLastName}`}
                    {
                      <Link
                        to={`/users/${p.informerId}`}
                        class="py-2 px-1  bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-500 focus:ring-offset-indigo-200 text-white w-28 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                      >
                        VER PERFIL
                      </Link>
                    }
                    | Usuario denunciado:{" "}
                    {` ${p.reportedFirstName} ${p.reportedLastName}`}
                    {
                      <Link
                        to={`/pet/${p.reportedUserId}`}
                        class="py-2 px-1  bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-500 focus:ring-offset-indigo-200 text-white w-28 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                      >
                        VER USUARIO
                      </Link>
                    }{" "}
                    | Motivo de la denuncia: {p.reason}
                    <button class="py-2 px-4  bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-500 focus:ring-offset-indigo-200 text-white w-28 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                      ELIMINAR USUARIO
                    </button>
                    <button class="py-2 px-4  bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-500 focus:ring-offset-indigo-200 text-white w-28 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                      MARCAR RESUELTO
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
