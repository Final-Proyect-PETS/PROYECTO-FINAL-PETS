import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"

import { getUserProfile, getAllUsers, getPetDetail, emailAdopt, patchUsuer, patchInterestedUsers } from "../../redux/Actions";

import { useNavigate } from "react-router-dom";
import {notificationSwal} from "../../utils/notificationSwal.jsx";
import Swal from "sweetalert2";


export default function AdoptForm(){

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const loggedUser = useSelector((state) => state.userProfile)
    const petDetail = useSelector((state) => state.petDetail)
    const usersArray = useSelector((state) => state.users)
    const petOwner = petDetail.user.email
 

     const [input, setInput] = useState({
        owner_email: petOwner,
        adopter_name: loggedUser.first_name + " " + loggedUser.last_name,   
        adopter_username: loggedUser.username,
        adopter_email: loggedUser.email,
        adopter_telephone: loggedUser.telephone,
        message: "",
        link: `http://localhost:3000/users/${loggedUser._id}`,
        pet_name: petDetail.name,
      }); 
      
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
      /* useEffect(
        dispatch(getAllUsers()),
        dispatch(getUserProfile()),
        dispatch(getPetDetail())
      ) */
       function handleChange(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
    }

    const obj = {
        ownerId: petDetail.user._id,
        userId: loggedUser._id
    }
     function handlerSubmit(ev){
        ev.preventDefault()
        if (petDetail.user.interestedUsers !== loggedUser._id){
            dispatch(
                emailAdopt(),
                patchInterestedUsers(obj)
                )} 
                alert("Ya se mando una solicitud de adopcion")
        }   

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

    function handlerSubmit(ev){
        ev.preventDefault()
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
                dispatch(emailAdopt(input)).then((e) => {
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
                      "No se pudo eliminar la mascota, intente mas tarde",
                      "error",
                      "Cancel"
                    );
                  }
                });
              } else {
                notificationSwal(
                  "Operación cancelada",
                  "Mascota no Adoptada",
                  "error",
                  "Cancel"
                );
              }
            })
            .then(() => navigate("/home", { replace: true }));
        } 
    }
    //   function aaa (){
    //     console.log(input)
    // }  

    return (
        <div>
            <form onSubmit={handlerSubmit}>
                <div>
                    <span>Nombre de Usuario: {loggedUser.username}</span>
                </div>
                <div>
                    <span>Nombre: {loggedUser.first_name} <span>{loggedUser.last_name}</span></span>
                </div>
                <div>
                    <span>Email: {loggedUser.email}</span>
                </div>
                <div>
                    <span>Telefono: {loggedUser.telephone}</span>
                </div>
                <div>
                    <textarea name = "message" value= {input.message} placeholder="Mensaje para el dueño de la mascota" onChange={(ev) => handleChange (ev)}>

                    </textarea>
                </div>
                <div>
                    <h3>¿Algun dato es incorrecto?</h3>
                    <Link to="/petDetail.user">
                    <button>Editar</button>
                    </Link>
                </div>
                <div>
                    <button  type="submit">ADOPTAR</button>
                </div>
            </form>
        </div>
    )
}