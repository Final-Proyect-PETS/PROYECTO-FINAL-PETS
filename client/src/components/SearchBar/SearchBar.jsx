import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getPetByName, getAllUsers } from "../../redux/Actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const pets = useSelector((state) => state.pets);
  const getPetNow = async () => dispatch(getPetByName(name));

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    getPetNow(name);

    // dispatch(clearPage());
    // console.log(name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    getPetNow(name);
    if (dispatch(getPetByName(!name))) {
      setName("");
      dispatch(getAllUsers());
      //clearPage();
      alert("alerta de prueba");
    } else {
      dispatch(getPetByName(name));
    }
  }
  return (
    <div className="flex">
      <form>
        <input
          placeholder="Busca algo..."
          className="rounded-lg border-transparent appearance-none border border-gray-300"
          onChange={(e) => handleInputChange(e)}
        ></input>
        <button className="bg-white rounded-lg border-transparent appearance-none border border-gray-300">
          Buscar
        </button>
      </form>
    </div>
  );
}
