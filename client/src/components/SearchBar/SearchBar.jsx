import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPetByName, getUserByName } from "../../redux/Actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [namePet, setNamePet] = useState("");
  const [nameUser, setNameUser] = useState("");
  const getPetNow = async () => dispatch(getPetByName(namePet));
  const getUserNow = async () => dispatch(getUserByName(nameUser));

  function handleInputChange(e) {
    e.preventDefault();
    setNamePet(e.target.value);
    setNameUser(e.target.value);
    getPetNow(namePet);
    getUserNow(nameUser);
    // console.log(nameUser,"NAMEUSER")
  }
  // console.log(namePet,"NAMEPET")

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   getPetNow(namePet);
  //   if (dispatch(getPetByName(!namePet))) {
  //     setNamePet("");
  //     dispatch(getAllUsers());
  //     //clearPage();
  //     alert("alerta de prueba");
  //   } else {
  //     dispatch(getPetByName(namePet));
  //   }
  // }
  return (
    <div className="flex">
      <form>
        <input
          placeholder="Busca algo..."
          className="rounded-lg border-transparent appearance-none border border-gray-300"
          onChange={(e) => handleInputChange(e)}
        ></input>
        <button className="bg-white rounded-lg border-transparent appearance-none border border-gray-300">
          Resetear Filtros
        </button>
      </form>
    </div>
  );
}
