import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getPetByName,
  getUserByName,
  switchRenderAction,
} from "../../redux/Actions";
import { useSelector } from "react-redux";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("mascota"); //traiga
  dispatch(switchRenderAction(input));
  const [namePet, setNamePet] = useState("");
  const [nameUser, setNameUser] = useState("");
  const getPetNow = async () => dispatch(getPetByName(namePet));
  const getUserNow = async () => dispatch(getUserByName(nameUser));

  // const switchRender = useSelector((state) => state.switchRender);

  function handleToogle(e) {
    if (input === "mascota") {
      setInput("usuario");
      console.log(input, "VALUEusuario");
    } else {
      setInput("mascota");
      console.log(input, "VALUEmascota");
    }
    console.log(input, "estadoGLOBAL");
    dispatch(switchRenderAction(input));
  } //traiga

  function handleInputChange(e) {
    e.preventDefault();
    setNamePet(e.target.value);
    setNameUser(e.target.value);
    getPetNow(namePet);
    getUserNow(nameUser);
  }

  return (
    <div className="flex">
      <form>
        <input
          placeholder="Busca algo..."
          className="rounded-lg border-transparent appearance-none border border-gray-300"
          onChange={(e) => handleInputChange(e)}
        ></input>

        <label
          for="small-toggle"
          class="inline-flex relative items-center mb-5 cursor-pointer"
        >
          <input
            type="checkbox"
            value={input}
            id="small-toggle"
            class="sr-only peer"
            onChange={(e) => handleToogle(e)}
          />
          <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Mascotas/Usuarios
          </span>
        </label>

        {/* 
        <label
          htmlFor="default-toggle"
          className="inline-flex relative items-center cursor-pointer"
        >
          <input
            type="checkbox"
            value={input}
            id="default-toggle"
            className="sr-only peer"
            onChange={(e) => handleToogle(e)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Mascotas/Usuarios
          </span>
        </label> */}
      </form>
    </div>
  );
}
