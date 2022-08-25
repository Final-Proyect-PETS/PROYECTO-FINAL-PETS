import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getUserByName } from "../../redux/Actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [nameUser, setNameUser] = useState("");
  const getUserNow = async () => dispatch(getUserByName(nameUser));

  function handleInputChange(e) {
    e.preventDefault();
    setNameUser(e.target.value);
    getUserNow(nameUser);
    // console.log(e.target.value,"ETV")
    // console.log(namePet, "inputState");//va uno atrasado//console.log para juancito------------------------------------------------------------
  }

  return (
    <div className="flex m-1.5 px-10">
      <form>
        <input
          placeholder="Buscar usuario adoptante"
          className="rounded-lg border-transparent appearance-none border border-gray-300 p-2 w-full"
          onChange={(e) => handleInputChange(e)}
        />
      </form>
    </div>
  );
}
