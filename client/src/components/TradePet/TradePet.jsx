import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import SearchTrade from "../SearchBars/SearchTrade";
import { getAllUsers, tradePet } from "../../redux/Actions/index";
import { useNavigate } from "react-router-dom";
import AdopterCard from "./AdopterCard";
import InAdoptionCards from "./InAdoptionCards";
import "../LandingPage.css";
import { Accordion } from "flowbite-react";
import { notificationSwal } from "../../utils/notificationSwal.jsx";
import Swal from "sweetalert2";

export default function TradePet() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  const getUsers = useSelector((state) => state.users);
  const loggedUser = useSelector((state) => state.userProfile);
  console.log(loggedUser.pets);
  const [data, setData] = useState({
    userId: "",
    petId: "",
    ownerId: loggedUser._id,
  });

  const iUser = loggedUser.interestedUsers
  const futuresPets = []
  function adopterHandler(e) {
    console.log(e.target.value, "ADOPTER");
    setData({ ...data, userId: e.target.value });
  }
  for (let i = 0; i < iUser.length; i++) {
    for (let x = 0; x < iUser[i].length; x++) {
      if (iUser[i][x]._id === data.userId) {
        futuresPets.push(iUser[i][x + 1])
        /*  for (let z = 0; z < i.length; z++){
          if (iUser[i][x] !== iUser[i][x + 1] || iUser[i][x + 1] !== iUser[i][x])
         } */
      }
    }

  }

  function petHandler(e) {
    console.log(e.target.value, "PET");
    setData({ ...data, petId: e.target.value });
  }

  function submitHandler(e) {
    // dispatch(tradePet(data));
    // navigate("/home", { replace: true });
    // e.preventDefault();
    // setDeleted({
    //   id: idPet,
    //   deleted: true,
    // });
    // payloadDelete = {
    //   id: idPet,
    //   deleted: true,
    // };
    // dispatch(patchPet(payloadDelete));

    if (true) {
      Swal.fire({
        title: "¿Está seguro de que desea dar en adopción esta mascota?",
        text: "Esta mascota se enviará a otro usuario",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonText: "Sí",
      })
        .then((result) => {
          if (result.isConfirmed) {
            dispatch(tradePet(data)).then((e) => {
              if (e === "OK") {
                notificationSwal(
                  "¡Ooops!",
                  "No se pudo enviar la mascota, intente mas tarde",
                  "error",
                  "Cancel"
                );
              } else {
                notificationSwal(
                  "¡Enhorabuena!",
                  "Mascota enviada con éxito",
                  "success",
                  "Ok"
                );
              }
            });
          } else {
            notificationSwal(
              "Operación cancelada",
              "Mascota no enviada",
              "error",
              "Cancel"
            );
          }
        })
        .then(() => navigate(`/users/${loggedUser._id}`, { replace: true }));
    } //oponer sweet
  }

  let interesados = []
  for (let i = 0; i < iUser.length; i++) {
    for (let j = 0; j < getUsers.length; j++) {
      for (let x = 0; x < iUser[i].length; x++) {
        if (iUser[i][x]._id === getUsers[j]._id) {
          interesados.push(iUser[i][x])
          /*  for (let z = 0; z < i.length; z++){
            if (iUser[i][x] !== iUser[i][x + 1] || iUser[i][x + 1] !== iUser[i][x])
           } */
        }
      }
    }
  }
  const petsInteresados = []
  for (let i = 0; i < iUser.length; i++) {
    for (let j = 0; j < loggedUser.pets.length; j++) {
      for (let x = 0; x < iUser[i].length; x++) {
        if (iUser[i][x]._id === loggedUser.pets[j]._id) {
          petsInteresados.push(iUser[i][x])
          /*  for (let z = 0; z < i.length; z++){
            if (iUser[i][x] !== iUser[i][x + 1] || iUser[i][x + 1] !== iUser[i][x])
           } */
        }
      }
    }
  }

  /*         function handlerDeleted (){
            for (let i = 0; i < iUser.length; i++){
              for(let j = 0; j < interesados.length; j++){ 
                for(let x = 0; x < iUser[i].length; x++){
                  if(iUser[i][x]._id === data.userId){
                    let deleteData = iUser[i].filter((e => e[x] !== data.userId))
                      dispatch(patchUsuer(deleteData))
                    /*  for (let z = 0; z < i.length; z++){
                      if (iUser[i][x] !== iUser[i][x + 1] || iUser[i][x + 1] !== iUser[i][x])
                     } 
                   }
                 }
               } 
             }
        }
   */
  return (
    <div id="landing" className="w-full">
      <NavBar />

      <div className="flex flex-col   opacity-95  mt-2 place-content-center rounded ">
        <div className="px-1 flex justify-center rounded">
          <div className=" w-1/2 rounded bg-yellow-900">
            <div className="rounded">
              {" "}
              {/* <div className="  h-1/3 rounded"></div> */}
              <Accordion
                alwaysOpen={false} /* arrowIcon={HiOutlineArrowCircleDown} */
              >
                <Accordion.Panel>
                  <Accordion.Title>
                    <div className="rounded">
                      <h1 className="text-2xl font-bold text-red-700 opacity-100">
                        Paso 1-Selecciona el usuario a quien darás tu mascota
                        (nuevo dueño).
                      </h1>
                    </div>
                  </Accordion.Title>
                  <Accordion.Content>
                    <SearchTrade />
                    <div className="flex justify-center mt-1 h-full">
                      <div className="overflow-auto">
                        <ol className="h-52">
                          <form className=" ">
                            {interesados?.length > 0 ? (
                              interesados.map((user) => (
                                <li className="flex flex-col-2  gap-3 h-18 w-98 mr-2 py-1 overflow-hidden items-center rounded">
                                  {/* <div className="flex items-center bg-gray-200 h-8 w-3/5 flex-row overflow-hidden gap-3"> */}
                                  <input
                                    className="w-10 h-10 ml-2 text-green-600 bg-yellow-800 border-yellow-500 dark:ring-offset-yellow-800  dark:bg-yellow-700 dark:border-yellow-600"
                                    key={user._id + "1"}
                                    type="radio"
                                    name="adopter"
                                    id={user._id}
                                    value={user._id}
                                    onChange={(e) => adopterHandler(e)}
                                  />

                                  <AdopterCard
                                    key={user._id}
                                    _id={user._id}
                                    first_name={user.first_name}
                                    last_name={user.last_name}
                                    username={user.username}
                                    image={user.image}
                                    email={user.email}
                                    about={user.about}
                                    telephone={user.telephone}
                                    pets={user.pets}
                                    place={user.place}
                                  />
                                  <button>X</button>
                                  {/* </div> */}
                                </li>
                              ))
                            ) : (
                              <div>
                                Todavia no hay adoptadores.... Puedes buscarlos
                              </div>
                            )}
                          </form>
                        </ol>
                      </div>
                    </div>
                  </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                  <Accordion.Title>
                    <div>
                      <h1 className="text-2xl font-bold text-yellow-300">
                        Paso 2-Selecciona la mascota que quieres dar en
                        adopcion.
                      </h1>
                    </div>
                  </Accordion.Title>
                  <Accordion.Content>
                    <div className="flex justify-center py-5 h-full">
                      <div className="overflow-auto">
                        <ol className="h-52">
                          <form action="">
                            {futuresPets?.length ? (
                              futuresPets.map((pets) => (
                                <li className="flex flex-col-2  gap-3 h-18 w-98 mr-2 py-1 overflow-hidden items-center rounded">
                                  <input
                                    key={pets._id + "1"}
                                    className="w-10 h-10 ml-2 text-green-600 bg-yellow-800 border-yellow-500 dark:ring-offset-yellow-800  dark:bg-yellow-700 dark:border-yellow-600"
                                    type="radio"
                                    name="pets"
                                    id={pets._id}
                                    value={pets._id}
                                    onChange={(e) => petHandler(e)}
                                  />

                                  <InAdoptionCards
                                    key={pets._id}
                                    idUser={loggedUser._id}
                                    idPet={pets._id}
                                    namePet={pets.name}
                                    imagePet={pets.image}
                                    isAdopted={pets.isAdopted}
                                    place={pets.place}
                                    gender={pets.gender}
                                    size={pets.size}
                                    type={pets.type}
                                    age={pets.age}
                                    pets={loggedUser.pets}
                                  />
                                </li>
                              ))
                            ) : (
                              <div>
                                Paso 2 incompleto :C
                              </div>
                            )}
                          </form>
                        </ol>
                      </div>
                    </div>
                  </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                  <Accordion.Title>
                    <div>
                      <h1 className="text-2xl font-bold text-green-500">
                        Paso3- Verifica la información
                      </h1>
                    </div>
                  </Accordion.Title>
                  <Accordion.Content>
                    <div className="flex justify-center">
                      <button
                        className="opacity-100 bg-green-900 mt-4 hover:bg-green-500 text-white font-bold py-6 px-1 border border-yellow-700 rounded"
                        onClick={(e) => submitHandler(e)}
                      >
                        ENVIAR MASCOTA CON SU NUEVO DUEÑO
                      </button>
                    </div>
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>
              <div className=" mt-2 ">
                {/* <form>
                  {getUsers?.length > 0 ? (
                    getUsers.map((user) => (
                      <div className="flex bg-gray-600 mt-2">
                        <input
                          className="w-10 h-10 text-green-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                          key={user._id + "1"}
                          type="radio"
                          name="adopter"
                          id={user._id}
                          value={user._id}
                          onChange={(e) => adopterHandler(e)}
                        />
                        <AdopterCard
                          key={user._id}
                          _id={user._id}
                          first_name={user.first_name}
                          last_name={user.last_name}
                          username={user.username}
                          image={user.image}
                          email={user.email}
                          about={user.about}
                          telephone={user.telephone}
                          pets={user.pets}
                          place={user.place}
                        />
                      </div>
                    ))
                  ) : (
                    <>
                      <NavBar />
                      <Loader />
                    
                    </>
                  )}
                </form> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}