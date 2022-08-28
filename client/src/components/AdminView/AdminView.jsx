import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Button } from "flowbite-react/lib/esm/components";

export default function AdminView() {
  const getUsers = useSelector((state) => state.users);

  const getPets = useSelector((state) => state.pets);

  const [show, setShow] = useState(false);

  const petsAdopted = getPets.filter((p) => p.isAdopted === true);

  const petsNotAdopted = getPets.filter((p) => p.isAdopted === false);

  const [user, setUser] = useState("");

  const userr = getUsers.filter((m) => m._id === user);

  console.log(userr);

  const onClick = () => {
    setShow(true);
  };

  const onClose = () => {
    setShow(false);
  };

  return (
    <div>
      <NavBar />

      <div className="flex h-screen pt-20">
        <div className="w-1/2 overflow-hidden border border-r-black">
          <div className="h-1/4 bg-gray-200 flex justify-center items-center flex-col border border-b-black">
            <h3 className="text-6xl">HappyTails</h3>
            <h3 className="text-2xl">Admin View</h3>
          </div>
          <div className="h-3/4">
            <div className="flex justify-center">
              <h3>Usuarios</h3>
            </div>
            <div className="h-full overflow-auto">
              <ol className="">
                {getUsers.map((u) => (
                  <li className="flex border gap-3 border-b-black h-16 overflow-hidden items-center">
                    <div className="flex items-center bg-gray-200 h-8 w-3/5 flex-row overflow-hidden gap-3">
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
                      | {u.username} | {u.email}{" "}
                    </div>{" "}
                    <div className="w-2/5 bg-gray-500 flex justify-center">
                      <div>
                        <Button
                          onClick={() => {
                            onClick();
                            setUser(u._id);
                          }}
                        >
                          Info
                        </Button>
                        <Modal show={show} onClose={onClose}>
                          <Modal.Header>Datos del usuario</Modal.Header>
                          <Modal.Body>
                            <div className="space-y-6">
                              <div>
                                {userr.map((m) => (
                                  <div>
                                    <div className="bg-gray-200 flex">
                                      <div className="bg-red-200 w-1/4">
                                        <img
                                          src={m.image}
                                          alt=""
                                          className="w-36 h-36 rounded-full"
                                        />
                                      </div>
                                      <div className="flex flex-col bg-gray-500 w-3/4 justify-center items-center">
                                        <div className="text-2xl">
                                          {m.first_name} {m.last_name}
                                        </div>
                                        <div>{m.username}</div>
                                        <div>{m.email}</div>
                                        <div>{m.telephone}</div>
                                      </div>
                                    </div>
                                    <div className="bg-gray-200 h-56">
                                      <h3>asd</h3>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </Modal.Body>
                          {/* <Modal.Footer>
                            <Button show={show} onClose={onClose}>
                                Volver
                            </Button>
                          </Modal.Footer> */}
                        </Modal>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        <div className="w-1/2 overflow-hidden">
          <div className="h-1/5 flex justify-center items-center border border-b-black ">
            <h3 className="text-3xl">Estadisticas</h3>
          </div>
          <div className="h-1/5 flex">
            <div className="w-1/2 flex justify-center items-center">
              <div className="flex h-3/4 w-3/4">
                <div className="w-1/4 border border-b-black border-r-black flex justify-center items-center">
                  <h3 className="text-2xl">{getUsers.length}</h3>
                </div>
                <div className="w-3/4 border border-t-black flex justify-center items-center">
                  <h3>Usuarios Totales</h3>
                </div>
              </div>
            </div>
            <div className="w-1/2 flex justify-center items-center  ">
              <div className="flex h-3/4 w-3/4">
                <div className="w-1/4 border border-b-black border-r-black flex justify-center items-center">
                  <h3 className="text-2xl">{getPets.length}</h3>
                </div>
                <div className="w-3/4 border border-t-black flex justify-center items-center">
                  <h3>Mascotas Totales</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="h-1/5 flex">
            <div className="w-1/2 flex justify-center items-center">
              <div className="flex h-3/4 w-3/4">
                <div className="w-1/4 border border-b-black border-r-black flex justify-center items-center">
                  <h3 className="text-2xl">{petsAdopted.length}</h3>
                </div>
                <div className="w-3/4 border border-t-black flex justify-center items-center">
                  <h3>Mascotas Adoptadas</h3>
                </div>
              </div>
            </div>
            <div className="w-1/2 flex justify-center items-center">
              <div className="flex h-3/4 w-3/4">
                <div className="w-1/4 border border-b-black border-r-black flex justify-center items-center">
                  <h3 className="text-2xl">{petsNotAdopted.length}</h3>
                </div>
                <div className="w-3/4 border border-t-black flex justify-center items-center">
                  <h3>Mascotas en Adopción</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="h-1/5 flex">
            <div className="w-1/2 flex justify-center items-center">
              <div className="flex h-3/4 w-3/4">
                <div className="w-1/4 border border-b-black border-r-black flex justify-center items-center">
                  <h3 className="text-2xl">{getUsers.length}</h3>
                </div>
                <div className="w-3/4 border border-t-black flex justify-center items-center">
                  <h3>Usuarios Totales</h3>
                </div>
              </div>
            </div>
            <div className="w-1/2 flex justify-center items-center">
              <div className="flex h-3/4 w-3/4">
                <div className="w-1/4 border border-b-black border-r-black flex justify-center items-center">
                  <h3 className="text-2xl">{getUsers.length}</h3>
                </div>
                <div className="w-3/4 border border-t-black flex justify-center items-center">
                  <h3>Usuarios Totales</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="h-1/5 flex">
            <div className="w-1/2 flex justify-center items-center">
              <div className="flex h-3/4 w-3/4">
                <div className="w-1/4 border border-b-black border-r-black flex justify-center items-center">
                  <h3 className="text-2xl">83</h3>
                </div>
                <div className="w-3/4 border border-t-black flex justify-center items-center">
                  <h3>Personas donaron</h3>
                </div>
              </div>
            </div>
            <div className="w-1/2 flex justify-center items-center">
              <div className="flex h-3/4 w-3/4">
                <div className="w-1/4 flex border border-b-black border-r-black justify-center items-center">
                  <h3 className="text-xl">$7.304</h3>
                </div>
                <div className="w-3/4 border border-t-black flex justify-center items-center">
                  <h3>Recaudado</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
