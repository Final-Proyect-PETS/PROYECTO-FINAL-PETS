import React from "react";
import styles from "./NavBarStyle.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getSomethingByName, getAllPets } from "../../redux/Actions/actions";

export default function NavBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const pets = useSelector((state) => state.pets);
  const getPetNow = async () => dispatch(getSomethingByName(name));

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
    if (dispatch(getSomethingByName(!name))) {
      setName("");
      dispatch(getAllPets());
      //clearPage();
      alert("alerta de prueba");
    } else {
      dispatch(getSomethingByName(name));
    }
  }

  return (
    <ul>
     <li>  <a>
          LOGOPETS AQUI!
        </a></li>
      <li>
    
        <a className="active" href="#home">
          Home
        </a>
      </li>
      <li>
        <a href="#news">Algo</a>
      </li>
      <li>
        <a href="#about">About</a>
      </li>
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
    </ul>
  );

  {
    /*   
      <div>
      <form className="searchbutton" onSubmit={(e) => handleSubmit(e)}>
        <input
          className="searchInput"
          id="searchInput"
          type="text"
          placeholder="Introduce Texto..."
          value={name}
          onChange={(e) => handleInputChange(e)}
        />
        <button
          className="searchbutton"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Buscar
        </button>
      </form>
      </div>
      <button>About Us</button> */
  }
}
