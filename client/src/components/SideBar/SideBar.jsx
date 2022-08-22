import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { filterByQuery } from "../../redux/Actions";
import SearchBar from "../SearchBar/SearchBar";

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
  });

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
  function handlerFilterByPlace(ev) {
    ev.preventDefault();
    dispatch(
      filterByQuery({
        ...filterParams,
        location: ev.target.value,
      })
    );
    setFilterParams({
      ...filterParams,
      location: ev.target.value,
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
    <div className="flex bg-amber-800 border-x-2 border-white flex-col w-3/4 h-screen items-center gap-7 shadow-2xl">
      <div className="border-y-2 border-white text-white text-xl w-full flex justify-center items-center h-12">
        <h1 className="font-normal italic">Menú</h1>
      </div>
      <SearchBar />
      {/*        <div className="bg-red-200 w-3/4 flex justify-center flex-col">
        <div className="flex justify-center">
          <h3 className="font-bold">Ordenar mascotas por edad</h3>
        </div>
        <div className="flex justify-center gap-1">
          <button name = "asc" value = "asc" onClick={(ev) => (ev)}>Ascendente</button> <p />
          <button name = "desc" value = "desc" onClick={(ev) => (ev)}>Descendente</button>
          <p />
        </div>
      </div> */}
      <div className="bg-gray-200 w-3/4 flex justify-center flex-col">
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
      <div className="bg-gray-200 w-3/4 flex justify-center flex-col">
        <select
          className="bg-gray-200 font-semibold p-2 flex"
          onChange={(ev) => handlerFilterVacciantion(ev)}
        >
          <option hidden>Vacunado?</option>
          <option value="yes">Si</option>
          <option value="no">No</option>
          <option value="unknown">No se</option>
        </select>
        <p />
      </div>
      <div className="bg-gray-200 w-3/4 flex justify-center flex-col">
        <select
          className="bg-gray-200 font-semibold p-2"
          onChange={(ev) => handlerFilterCastraed(ev)}
        >
          <option hidden>Castrado?</option>
          <option value="true">Si</option>
          <option value="false">No</option>
        </select>
        <p />
      </div>
      <div className="bg-gray-200 w-3/4 flex justify-center flex-col">
        <div className="flex justify-center">
          <h3 className="font-bold">Ubicación</h3>
        </div>
        <div className="flex justify-center gap-1">
          <button onClick={(ev) => handlerFilterByPlace(ev)}>Ubicación</button>
          <p />
        </div>
      </div>
      <div className="bg-gray-200 w-3/4 flex justify-center flex-col">
        <select
          className="bg-gray-200 font-semibold p-2"
          onChange={(ev) => handlerFilterTypePet(ev)}
        >
          <option hidden>TIPO DE MASCOTA</option>
          <option value="dog">Perros</option>
          <option value="cat">Gatos</option>
          <option value="other">Otros</option>
        </select>
        <p />
      </div>
      <div className="bg-gray-200 w-3/4 flex justify-center flex-col">
        <select
          className="bg-gray-200 font-semibold p-2"
          onChange={(ev) => handlerFilterBySize(ev)}
        >
          <option hidden>TAMAÑO DE LA MASCOTA</option>
          <option value="big">Grande</option>
          <option value="medium">Mediano</option>
          <option value="small">Pequeño</option>
        </select>
        <p />
      </div>
      <div className="bg-gray-200 w-3/4 flex justify-center flex-col">
        <select
          className="bg-gray-200 font-semibold p-2"
          onChange={(ev) => handlerFilterByAge(ev)}
        >
          <option hidden>EDAD DE LA MASCOTA</option>
          <option value="old">Anciano</option>
          <option value="adult">Adulto</option>
          <option value="young">Joven</option>
        </select>
      </div>
      <div className="bg-gray-200 w-3/4 flex justify-center flex-col">
        <select
          className="bg-gray-200 font-semibold p-2"
          onChange={(ev) => handlerFilterByGender(ev)}
        >
          <option hidden>GENERO DE LA MASCOTA</option>
          <option value="male">Macho</option>
          <option value="female">Hembra</option>
        </select>
      </div>
      <Link to="/petregister">
        <button className="py-2 px-4 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
          Crear nueva mascota
        </button>
      </Link>
    </div>
  );
}
