import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { filterByQuery } from "../../redux/Actions";
import SearchBar from "../SearchBars/SearchBar";

export default function SideBar() {
  const dispatch = useDispatch();
  const [filterParams, setFilterParams] = useState({
    age: "all",
    creation_date: "asc",
    vaccinated: "all",
    castrated: "all",
    location: "all",
    pet_type: "all",
    pet_size: "all",
    gender: "all",
    is_adopted: "all",
  });
  function handlerFilterIsAdopted(ev) {
    ev.preventDefault();
    dispatch(
      filterByQuery({
        ...filterParams,
        is_adopted: ev.target.value,
      })
    );
    setFilterParams({
      ...filterParams,
      is_adopted: ev.target.value,
    });
  }
  function handlerFilterPublicationAge(ev) {
    ev.preventDefault();
    dispatch(
      filterByQuery({
        ...filterParams,
        creation_date: ev.target.value,
      })
    );
    setFilterParams({
      ...filterParams,
      creation_date: ev.target.value,
    });
  }
  function handlerFilterVacciantion(ev) {
    ev.preventDefault();
    dispatch(
      filterByQuery({
        ...filterParams,
        vaccinated: ev.target.value,
      })
    );
    setFilterParams({
      ...filterParams,
      vaccinated: ev.target.value,
    });
  }
  function handlerFilterCastraed(ev) {
    ev.preventDefault();
    dispatch(
      filterByQuery({
        ...filterParams,
        castrated: ev.target.value,
      })
    );
    setFilterParams({
      ...filterParams,
      castrated: ev.target.value,
    });
  }

  function handlerFilterTypePet(ev) {
    ev.preventDefault();
    dispatch(
      filterByQuery({
        ...filterParams,
        pet_type: ev.target.value,
      })
    );
    setFilterParams({
      ...filterParams,
      pet_type: ev.target.value,
    });
  }
  function handlerFilterBySize(ev) {
    ev.preventDefault();
    dispatch(
      filterByQuery({
        ...filterParams,
        pet_size: ev.target.value,
      })
    );
    setFilterParams({
      ...filterParams,
      pet_size: ev.target.value,
    });
  }
  function handlerFilterByAge(ev) {
    ev.preventDefault();
    dispatch(
      filterByQuery({
        ...filterParams,
        age: ev.target.value,
      })
    );
    setFilterParams({
      ...filterParams,
      age: ev.target.value,
    });
  }
  function handlerFilterByGender(ev) {
    ev.preventDefault();
    dispatch(
      filterByQuery({
        ...filterParams,
        gender: ev.target.value,
      })
    );
    setFilterParams({
      ...filterParams,
      gender: ev.target.value,
    });
  }
  return (
    <div className="flex bg-yellow-500 border-x-2 border-white flex-col w-3/4 h-screen items-center gap-4 shadow-2xl mt-20">
      <div className="border-y-2 border-white text-white text-xl w-full flex justify-center items-center h-12">
        <h1 className="font-normal italic">Menú</h1>
      </div>
      <SearchBar />


      <div className="w-3/4 flex justify-center flex-col">
        <select
          className="bg-gray-200 font-semibold p-2 rounded-lg flex-1 appearance-none w-full py-2 px-4 text-gray-800 placeholder-white text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-yellow-800"
          onChange={(ev) => handlerFilterVacciantion(ev)}
        >
          <option hidden>Vacunado</option>
          <option value="yes">Si</option>
          <option value="no">No</option>
          <option value="unknown">No se</option>
        </select>
        <p />
      </div>
      <div className="w-3/4 flex justify-center flex-col">
        <select
          className="bg-gray-200 font-semibold p-2 rounded-lg flex-1 appearance-none w-full py-2 px-4 text-gray-800 placeholder-white text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-yellow-800"
          onChange={(ev) => handlerFilterCastraed(ev)}
        >
          <option hidden>Castrado</option>
          <option value="true">Si</option>
          <option value="false">No</option>
        </select>
        <p />
      </div>
      <div className="w-3/4 flex justify-center flex-col">
        <select
          className="bg-gray-200 font-semibold p-2 rounded-lg flex-1 appearance-none w-full py-2 px-4 text-gray-800 placeholder-white text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-yellow-800"
          onChange={(ev) => handlerFilterTypePet(ev)}
        >
          <option hidden>Búsqueda por tipo</option>
          <option value="dog">Perros</option>
          <option value="cat">Gatos</option>
          <option value="other">Otros</option>
        </select>
        <p />
      </div>
      <div className="w-3/4 flex justify-center flex-col">
        <select
          className="bg-gray-200 font-semibold p-2 rounded-lg flex-1 appearance-none w-full py-2 px-4 text-gray-800 placeholder-white text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-yellow-800"
          onChange={(ev) => handlerFilterBySize(ev)}
        >
          <option hidden>Búsqueda por tamaño</option>
          <option value="big">Grande</option>
          <option value="medium">Mediano</option>
          <option value="small">Pequeño</option>
        </select>
        <p />
      </div>
      <div className="w-3/4 flex justify-center flex-col">
        <select
          className="bg-gray-200 font-semibold p-2 rounded-lg flex-1 appearance-none w-full py-2 px-4 text-gray-800 placeholder-white text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-yellow-800"
          onChange={(ev) => handlerFilterByAge(ev)}
        >
          <option hidden>Búsqueda por edad</option>
          <option value="old">Anciano</option>
          <option value="adult">Adulto</option>
          <option value="young">Joven</option>
        </select>
      </div>
      <div className="w-3/4 flex justify-center flex-col">
        <select
          className="bg-gray-200 font-semibold p-2 rounded-lg flex-1 appearance-none w-full py-2 px-4 text-gray-800 placeholder-white text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-yellow-800"
          onChange={(ev) => handlerFilterByGender(ev)}
        >
          <option hidden>Búsqueda por género</option>
          <option value="male">Macho</option>
          <option value="female">Hembra</option>
        </select>
      </div>
      <div className="w-3/4 flex justify-center flex-col">
        <select
          className="bg-gray-200 font-semibold p-2 rounded-lg flex-1 appearance-none w-full py-2 px-4 text-gray-800 placeholder-white text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-yellow-800"
          onChange={(ev) => handlerFilterIsAdopted(ev)}
        >
          <option hidden>Estado de adopción</option>
          <option value="yes">Adoptados</option>
          <option value="no">Aún sin hogar</option>
        </select>
      </div>
      <div className="w-3/4 flex justify-center flex-col">
        <div className="flex justify-center">
          <h3 className="font-bold">Antiguedad de publicaciones</h3>
        </div>
        <div className="flex justify-center gap-1">
          <button
            name="desc"
            value="desc"
            onClick={(ev) => handlerFilterPublicationAge(ev)}
          >
            Mas antigua
          </button>
          <p />
          <button
            name="asc"
            value="asc"
            onClick={(ev) => handlerFilterPublicationAge(ev)}
          >
            Mas reciente
          </button>
          <p />
        </div>
      </div>
      <Link to="/petregister">
        <button className="py-2 px-4 bg-yellow-700 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
          📝 Crear nueva mascota
        </button>
      </Link>
    </div>
  );
}
