import React from "react";
import styles from "./NavBarStyle.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUserByName, getAllUsers } from "../../redux/Actions";

export default function NavBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const pets = useSelector((state) => state.pets);
  const getPetNow = async () => dispatch(getUserByName(name));

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
    if (dispatch(getUserByName(!name))) {
      setName("");
      dispatch(getAllUsers());
      //clearPage();
      alert("alerta de prueba");
    } else {
      dispatch(getUserByName(name));
    }
  }

  return (
    <ul>
      <li>
        {" "}
        <a>LOGOPETS AQUI!</a>
      </li>
      <Link to={"/home"}>
        <li>
          <a className="active" href="#home">
            Home
          </a>
        </li>
      </Link>
      <li>
        <a>Algo</a>
      </li>
      <Link to={"/about"}>
        <li>
          <a>About</a>
        </li>
      </Link>
      <li>
        {" "}
        <form className="searchBar" onSubmit={(e) => handleSubmit(e)}>
          <input
            className="searchInput"
            id="searchInput"
            type="text"
            placeholder="Introduce Texto..."
            value={name}
            onChange={(e) => handleInputChange(e)}
          />

          <button
            className="searchButton"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Buscar
          </button>
        </form>
      </li>
      <li><a>PROFILE logo</a></li>
    </ul>
  );

}
