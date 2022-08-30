import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom"



import { getUserProfile, getAllUsers, getPetDetail, emailAdopt, patchUsuer, patchInterestedUsers } from "../../redux/Actions";


import { useNavigate } from "react-router-dom";
import { notificationSwal } from "../../utils/notificationSwal.jsx";
import Swal from "sweetalert2";
import NavBar from "../NavBar/NavBar";


export default function AdoptForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();





  const loggedUser = useSelector((state) => state.userProfile);
  const petDetail = useSelector((state) => state.petDetail);
  const usersArray = useSelector((state) => state.users);
  const petOwner = petDetail.user.email;


  /* const [input, setInput] = useState({
    owner_email: petOwner,
    adopter_name: loggedUser.first_name + " " + loggedUser.last_name,
    adopter_username: loggedUser.username,
    adopter_email: loggedUser.email,
    adopter_telephone: loggedUser.telephone,
    message: "",
    link: `http://localhost:3000/users/${loggedUser._id}`,
  }); */
  /* useEffect(

    const loggedUser = useSelector((state) => state.userProfile)
    const petDetail = useSelector((state) => state.petDetail)
    const usersArray = useSelector((state) => state.users)
    const petOwner = petDetail.user.email
 
      */
     const [input, setInput] = useState({
        owner_email: petOwner,
        adopter_name: loggedUser.first_name + " " + loggedUser.last_name,   
        adopter_username: loggedUser.username,
        adopter_email: loggedUser.email,
        adopter_telephone: loggedUser.telephone,
        message: "",
        link: `http://localhost:3000/users/${loggedUser._id}`,
        pet_name: petDetail.name,
        ownerId: petDetail.user._id,
        userId: loggedUser._id,
        petId: petDetail._id,
        pet_interesed: petDetail.user.interestedUsers
      }); 
      /*
      const [currentUser, setCurrentUser] = useState({
        id: petDetail.user._id,
        first_name: petDetail.user.first_name,
        last_name: petDetail.user.last_name,
        username: petDetail.user.username,
        image: petDetail.user.image,
        email: petDetail.user.email,
        about: petDetail.user.about,
        telephone: petDetail.user.telephone,
        place: petDetail.user.place,
        about: petDetail.user.about,
        deleted: petDetail.user.deleted,
        interestedUsers: petDetail.user.interestedUsers,
      })
       useEffect(

        dispatch(getAllUsers()),
        dispatch(getUserProfile()),
        dispatch(getPetDetail())
      ) */

  /* function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  } */
  // const sendPatch = {
  //     id: petDetail.user._id,
  //     interestedUsers: loggedUser,
  // }
  // function handlerSubmit(ev){
  //     ev.preventDefault()
  //     dispatch(
  //         emailAdopt(input),
  //         patchUsuer(sendPatch)
  //     )
  // }

       function handleChange(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
    }

  
     /* function handlerSubmit(ev){
        ev.preventDefault()
        if (petDetail.user.interestedUsers !== loggedUser._id){
            dispatch(
                emailAdopt(),
                patchInterestedUsers(obj)
                )} 
                alert("Ya se mando una solicitud de adopcion")
        }  */  

    // const sendPatch = {
    //     id: petDetail.user._id,
    //     interestedUsers: loggedUser,
    // }
    // function handlerSubmit(ev){
    //     ev.preventDefault()
    //     dispatch(
    //         emailAdopt(input),
    //         patchUsuer(sendPatch)
    //     )  
    // }

  
  function handlerSubmit(ev) {
    ev.preventDefault();
    if (true) {
      Swal.fire({
        title: "¿Está seguro de que desea adoptar esta mascota?",
        // text: "Esta mascota se eliminará",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonText: "Sí",
      })
        .then((result) => {
          if (result.isConfirmed) {
            dispatch(patchInterestedUsers(input)).then((e) => {
              if (e === "OK") {
                notificationSwal(
                  "¡Enhorabuena!",
                  "El dueño recibio tu mensaje éxitosamente 👌",
                  "success",
                  "Ok"
                );
              } else {
                notificationSwal(
                  "¡Ooops!",
                  "Ya mandaste una solicitud de adopcion",
                  "error",
                  "Cancel"
                );
              }
            });
          } else {
            notificationSwal(
              "Operación cancelada",
              "La solicitud fue cancelada",
              "error",
              "Cancel"
            );
          }
        })
        .then(() => navigate("/home", { replace: true }));
    }

  }
   /*   function aaa (){
      console.log(petDetail.user.interestedUsers.filter(
        (e) => e[0]._id === loggedUser._id && e[1]._id === petDetail._id
      ).length)
   } */
  return (
    <>
      <NavBar />
      <div className="flex flex-col w-full mt-15 m-auto py-8 bg-amber-600 shadow sm:px-6 md:px-8 lg:px-10">
{/*       <button onClick={aaa}>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</button> */}
        <div className="flex items-center mt-8 px-18 max-w-lg self-center">
          <form
            className="flex flex-col justift-content"
            onSubmit={handlerSubmit}
          >
            {/* <button onClick={aaa}>console.log</button>   */}
            <div>
              <h1 className="text-5xl font-bold">
                Envia una notificación al dueño mostrando tu interés
              </h1>
            </div>
            <div className="flex flex-col mt-5 px-3 py-3 text-white bg-gray-500 rounded bg-opacity-50">
              <h1 className="  text-black">Nombre Completo:</h1>
              <h1 className="text-3xl font-bold">
                {loggedUser.first_name + " " + loggedUser.last_name}{" "}
              </h1>
            </div>
            <div className="flex flex-col mt-5 px-3 py-3 text-white bg-gray-500 rounded bg-opacity-50">
              <h1 className="  text-black">Usuario:</h1>
              <h1 className="text-3xl font-bold">{loggedUser.username}</h1>
            </div>
            <div className="flex flex-col mt-5 px-3 py-3 text-white bg-gray-500 rounded bg-opacity-50">
              <h1 className="  text-black">Email:</h1>
              <h1 className="text-3xl font-bold">{loggedUser.email}</h1>
            </div>

            <div className="flex flex-col mt-5 px-3 py-3 text-white bg-gray-500 rounded bg-opacity-50">
              <h1 className="  text-black">Telefono de contacto:</h1>
              <h1 className="text-3xl font-bold">{loggedUser.telephone}</h1>
            </div>

            <div className="flex flex-col mt-5 px-3 py-3 text-white bg-gray-500 rounded bg-opacity-50">
              <h1 className="  text-black">Tu Mensaje:</h1>

              <textarea
                className="rounded  text-black"
                name="message"
                value={input.message}
                placeholder="Mensaje para el dueño de la mascota..."
                onChange={(ev) => handleChange(ev)}
              ></textarea>
            </div>
            <div className="flex items-center ">
              <h3>¿Algun dato es incorrecto?</h3>
              <Link to="/updateuser">
                <button className="bg-yellow-900 ml-10 mr-1 mt-4 hover:bg-yellow-500 text-white font-bold py-2 px-2 border border-yellow-700 rounded">
                  Editar perfil→
                </button>
              </Link>
            </div>
            <div className="flex justify-content py-3">
              <button
                type="submit"
                className="bg-green-500 w-full hover:bg-yellow-500 text-white font-bold py-5 px-20 border border-yellow-700 rounded"
              >
                💌ENVIAR NOTIFICACIÓN DE ADOPCIÓN💌
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
