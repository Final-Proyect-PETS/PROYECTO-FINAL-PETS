import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Button } from "flowbite-react/lib/esm/components";
import "./AdminView.css"

export default function AdminView() {

  const getUsers = useSelector((state) => state.users);

  const getPets = useSelector((state) => state.pets);

  const [show, setShow] = useState(false);

  const petsAdopted = getPets.filter((p) => p.isAdopted === true);

  const petsNotAdopted = getPets.filter((p) => p.isAdopted === false);

  const [user, setUser] = useState("");

  const userr = getUsers.filter((m) => m._id === user);

  const donatedUsers = getUsers.filter((m) => m.donations)

  const don = userr.map((d) => d.donations.map((d) => d.donationAmount))

  console.log(don);

  // const amount = donatedUsers.map((m) => m.donations.map((d) => d.donationAmount).reduce((prev, curr) => prev + curr))

  // console.log(amount)

  const onClick = () => {
    setShow(true);
  };

  const onClose = () => {
    setShow(false);
  };

  return (
    <div>
      <NavBar />
      {/* <div id="modal-component-container" className="fixed inset-0">
        <div className="modal-flex-container flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div id="toogle" className="modal-bg-container fixed inset-0 bg-gray-800 bg-opacity-75">

          </div>
          <div className="modal-space-container hidden sm:inline-block sm:align-middle sm:h-screen"></div>

          <div className="modal-container inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm: max-w-lg">
            <div className="modal-wrapper bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="modal-wrapper-flex sm:flex sm:items-start">
                <div className="modal-icon mx-auto flex-shrink-0 items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"></div>
                <div className="modal-content text-center mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg font-medium text-gray-900">Eliminar elemento</h3>
                  <div className="modal-text mt-2">
                    <p className="text-gray-500 text-sm">Seguro?</p>
                  </div>
                </div>

              </div>
            </div>
            <div className="modal-actions bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button className="w-full inline-flex justify-center rounded-md border border-transparent shadow-md px-4 py-2 bg-white font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm ">Aceptar</button>
            </div>
          </div>
        </div>
      </div> */}
      <Modal show={show} popup={true} onClose={onClose} class="bg-gray-800 bg-opacity-100">
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
                          Cuenta creada el:{" "}
                          {m.createdAt.slice(0, 10)} a las{" "}
                          {m.createdAt.slice(11, 19)}
                        </h1>
                      </div>
                      <div className="flex justify-center">
                        <h1>
                          Cuenta editada por ultima vez el:{" "}
                          {m.updatedAt.slice(0, 10)} a las{" "}
                          {m.updatedAt.slice(11, 19)}
                        </h1>
                      </div>
                    </div>
                    <div className=" h-2/4 flex">
                      <div className="w-1/2 h-full">
                        <div className="h-1/2 flex justify-center items-center">
                          <h3>Mascotas adoptadas: {m.pets.filter((m) => m.isAdopted === true).length}</h3>
                        </div>
                        <div className="h-1/2 flex justify-center items-center">
                          <h3>Mascotas en adopción: {m.pets.filter((m) => m.isAdopted === false).length}</h3>
                        </div>
                      </div>
                      <div className="w-1/2 h-full">
                        <div className="h-1/2 flex justify-center items-center">
                          <h3 className="text-center">Este usuario donó: {m.donations.length > 0 ? <p>{m.donations.length} veces</p> : m.donations.length === 1 ? <p>1 vez</p> : <p>Todavía no realizó donaciones</p>}</h3>
                        </div>
                        <div className="h-1/2 flex justify-center items-center">
                          <h3>Donado en total: ${m.donations.length > 0 ? m.donations.map((d) => d.donationAmount).reduce((prev, curr) => prev + curr) : 0}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white h-1/4 flex items-center justify-around">
                      <button class="py-2 px-4  bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-500 focus:ring-offset-indigo-200 text-white w-28 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "><Link to={"/users/" + m._id}>Perfil del usuario</Link></button>
                      <button class="py-2 px-4  bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-500 focus:ring-offset-indigo-200 text-white w-28 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">Editar usuario</button>
                      <button class="py-2 px-4  bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-500 focus:ring-offset-indigo-200 text-white w-28 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">Eliminar usuario</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
      </Modal >
      <div id="view-admin">
        <div className="w-full text-center p-5">
          <h3 className="text-6xl font-semibold italic text-gray-800">
            Happy Tails 
          </h3>
          <h3 className="text-2xl p-3 text-gray-800">
            Vista de administrador
          </h3>
        </div>

        <div className="flex h-screen">
          <div className="w-1/2">
            <div className="h-4/5">
              <div className="flex justify-center">
                <h3 className="text-2xl py-2 italic font-semibold text-gray-800">Usuarios Registrados</h3>
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
                        }{" "}
                        | Username: {u.username} | {u.email}{" "}
                      </div>{" "}
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
            <h3 className="text-2xl p-2 text-center italic font-semibold text-gray-800">Estadísticas</h3>
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
    </div>
  );
}
