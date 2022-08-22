import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getPetByName,
  getUserByName,
  switchRenderAction,
} from "../../redux/Actions";


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
    } else {
      setInput("mascota");
    }
    dispatch(switchRenderAction(input));
  }

  function handleInputChange(e) {
    e.preventDefault();
    setNamePet(e.target.value);
    setNameUser(e.target.value);
    getPetNow(namePet);
    getUserNow(nameUser);
  }

  return (
    <div className="flex m-1.5 mx-6 px-10">
      <form>
        <input
          placeholder="Busca usuarios o mascotas..."
          className="rounded-lg border-transparent appearance-none border border-gray-300 p-2 w-full"
          onChange={(e) => handleInputChange(e)}
        ></input>

        <label
          for="small-toggle"
          className="inline-flex relative items-center mt-2 mx-4 cursor-pointer"
        >
          <input
            type="checkbox"
            value={input}
            id="small-toggle"
            className="sr-only peer"
            onChange={(e) => handleToogle(e)}
          />
          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-900"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
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
