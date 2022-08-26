import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { getUserProfile, getAllUsers, getPetDetail, emailAdopt } from "../../redux/Actions";

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
        link: `http://localhost:3000/users/${loggedUser._id}`
      }); 
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
    function handlerSubmit(ev){
        ev.preventDefault()
        dispatch(
            emailAdopt(input)
        )
    }
      function aaa (){
        console.log(input)
    }  
    return (
        <div>
            <form onSubmit={handlerSubmit}>
              {/* <button onClick={aaa}>console.log</button>   */} 
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
                    <Link to="/updateuser">
                    <button>Editar</button>
                    </Link>
                </div>
                <div>
                    <button type="submit">ADOPTAR</button>
                </div>
            </form>
        </div>
    )
}