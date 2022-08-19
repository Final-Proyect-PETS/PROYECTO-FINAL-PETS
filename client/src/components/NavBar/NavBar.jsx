import React from "react";
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
    <section className="flex justify-center h-14">
      <div className="bg-orange-300 flex justify-between border-b-4 border-white w-screen justify-center content-around items-center px-4">
        <div className="flex">
          <h1 className="text-white text-2xl font-semibold">Happy Tails</h1>
        </div>
        <div className="flex w-80 justify-around">
          <Link to={"/home"}>
            <h2 className="text-black text-2xl font-semibold">Home</h2>
          </Link>
          <Link to={"/algo"}>
            <h2 className="text-black text-2xl font-semibold">Algo</h2>
          </Link>
          <Link to={"/about"}>
            <h2 className="text-black text-2xl font-semibold">About</h2>
          </Link>
        </div>
        <div className="flex">
          <form>
            <input placeholder="Busca algo..." className="rounded-lg border-transparent appearance-none border border-gray-300"></input>
            <button className="bg-white rounded-lg border-transparent appearance-none border border-gray-300">Buscar</button>
          </form>
        </div>
        <div className="flex gap-3 items-center">
          <p className="text-gray-50 font-semibold">Lautaro Martín</p>
          <img src="https://img.freepik.com/fotos-premium/hombre-caucasico-joven-persona-pared-blanca-apuntando-mano-camisa-blanco-orgulloso-confiado_1187-76423.jpg?w=740" alt="logo" width="9px" class="mx-auto object-cover rounded-full h-9 w-9 "/>
        </div>
      </div>
    </section>
  );

}

{/* <ul>
      <li>
        {" "}
        <a>LOGOPETS AQUI!</a>
      </li>
      <Link to={"/home"}>
        <li>
          <a className="" href="#home">
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
        <form className="" onSubmit={(e) => handleSubmit(e)}>
          <input
            className=""
            id="searchInput"
            type="text"
            placeholder="Introduce Texto..."
            value={name}
            onChange={(e) => handleInputChange(e)}
          />

          <button
            className=""
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Buscar
          </button>
        </form>
      </li>
      <li><a>PROFILE logo</a></li>
    </ul> */}
