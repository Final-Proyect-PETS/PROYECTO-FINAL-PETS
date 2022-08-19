import React from "react";
/* import { useState } from "react"; */
import { useDispatch } from "react-redux";
/* import { useSelector } from "react-redux"; */
/* import { filters } from "../../redux/reducer" */
import {
  filterByAge,
  sortAscAge,
  sortDescAge,
  sortAscCreated,
  sortDescCreated,
  filterByCastrated,
  filterBySize,
  filterByPlace,
  filterByVaccination,
  filterByType,
} from "../../redux/Actions";
import SearchBar from "../SearchBar/SearchBar";

export default function SideBar() {
  const dispatch = useDispatch();

  function handlerSortAscAge(ev) {
    ev.preventDefault();
    dispatch(sortAscAge(ev.target.value));
  }
  function handlerSortDescAge(ev) {
    ev.preventDefault();
    dispatch(sortDescAge(ev.target.value));
  }
  function handlerSortCreatedAsc(ev) {
    ev.preventDefault();
    dispatch(sortAscCreated(ev.target.value));
  }
  function handlerSortCreateDesc(ev) {
    ev.preventDefault();
    dispatch(sortDescCreated(ev.target.value));
  }
  function handlerFilterVacciantion(ev) {
    ev.preventDefault();
    dispatch(filterByVaccination(ev.target.value));
  }
  function handlerFilterCastraed(ev) {
    ev.preventDefault(ev);
    dispatch(filterByCastrated(ev.target.value));
  }
  function handlerFilterByPlace(ev) {
    ev.preventDefault();
    dispatch(filterByPlace(ev.target.value));
  }
  function handlerFilterTypePet(ev) {
    ev.preventDefault();
    dispatch(filterByType(ev.target.value));
  }
  function handlerFilterBySize(ev) {
    ev.preventDefault();
    dispatch(filterBySize(ev.target.value));
  }
  function handlerFilterByAge(ev) {
    ev.preventDefault();
    dispatch(filterByAge(ev.target.value));
  }
  return (
    <div className="flex bg-yellow-800 flex-col w-3/4 h-screen items-center gap-7 shadow-2xl">
     
      <div className="bg-gray-300 border border-b-black text-white text-2xl w-full flex justify-center items-center h-12">
 
        
        <h1 className="font-bold">DESCUBRIR</h1>
      </div>
      <SearchBar/>
      <div className="bg-gray-300 w-3/4 flex justify-center flex-col">
        <div className="flex justify-center">
          <h3 className="font-bold">Filtrar por edad</h3>
        </div>
        <div className="flex justify-center gap-1">
          <button onClick={(ev) => handlerSortAscAge(ev)}>ASC</button> <p />
          <button onClick={(ev) => handlerSortDescAge(ev)}>DESC</button>
          <p />
        </div>
      </div>
      <div className="bg-gray-300 w-3/4 flex justify-center flex-col">
        <div className="flex justify-center">
          <h3 className="font-bold">Publicado hace</h3>
        </div>
        <div className="flex justify-center gap-1">
          <button onClick={(ev) => handlerSortCreatedAsc(ev)}>Mas viejo</button>
          <p />
          <button onClick={(ev) => handlerSortCreateDesc(ev)}>Mas nuevo</button>
          <p />
        </div>
      </div>
      <div className="bg-gray-300 w-3/4 flex justify-center flex-col">
        <select className="bg-gray-300 font-bold" onChange={(ev) => handlerFilterVacciantion(ev)}>
          <option hidden>Vacunado?</option>
          <option value="yes">Si</option>
          <option value="no">No</option>
          <option value="unknown">No se</option>
        </select>
        <p />
      </div>
      <div className="bg-gray-300 w-3/4 flex justify-center flex-col">
        <select className="bg-gray-300 font-bold" onChange={(ev) => handlerFilterCastraed(ev)}>
          <option hidden>Castrado?</option>
          <option value="true">Si</option>
          <option value="false">No</option>
        </select>
        <p />
      </div>
      <div className="bg-gray-300 w-3/4 flex justify-center flex-col">
        <div className="flex justify-center">
          <h3 className="font-bold">Ubicación</h3>
        </div>
        <div className="flex justify-center gap-1">
          <button onClick={(ev) => handlerFilterByPlace(ev)}>Ubicación</button>
          <p />
        </div>
      </div>
      <div className="bg-gray-300 w-3/4 flex justify-center flex-col">
        <select className="bg-gray-300 font-bold" onChange={(ev) => handlerFilterTypePet(ev)}>
          <option hidden>TIPO DE MASCOTA</option>
          <option value="dog">Perros</option>
          <option value="cat">Gatos</option>
        </select>
        <p />
      </div>
      <div className="bg-gray-300 w-3/4 flex justify-center flex-col">
        <select className="bg-gray-300 font-bold" onChange={(ev) => handlerFilterBySize(ev)}>
          <option hidden>TAMAÑO DE LA MASCOTA</option>
          <option value="big">Grande</option>
          <option value="medium">Mediano</option>
          <option value="small">Pequeño</option>
        </select>
        <p />
      </div>
      <div className="bg-gray-300 w-3/4 flex justify-center flex-col">
        <select className="bg-gray-300 font-bold" onChange={(ev) => handlerFilterByAge(ev)}>
          <option hidden>EDAD DE LA MASCOTA</option>
          <option value="old">Anciano</option>
          <option value="adult">Adulto</option>
          <option value="young">Joven</option>
        </select>
      </div>
    </div>
  );
}
