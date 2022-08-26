import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { getUserProfile, getAllUsers, getPetDetail, emailAdopt, patchUsuer, patchInterestedUsers } from "../../redux/Actions";

export default function AdoptForm(){

    const dispatch = useDispatch()

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