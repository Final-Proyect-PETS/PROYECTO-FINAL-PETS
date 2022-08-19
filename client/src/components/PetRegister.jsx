import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postPet, getAllPets } from "../redux/Actions/index.js";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function RegisterPet() {
  const dispatch = useDispatch();

  const pets = useSelector((state) => state.pets);

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    id: "",
    name: "",
    image: "",
    type: "",
    description: "",
    size: "",
    age: "",
    vaccination: "",
    castrated: false,
    place: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function validate(input) {
    let errors = {};

    if (!input.id) errors.id = "El id es requerido!";

    if (input.name) {
      if (!/^[a-zA-Z]+$/.test(input.name)) {
        errors.name = "El nombre sólo puede tener letras!";
      } else if (input.name.length > 20) {
        errors.name = "El nombre no puede tener más de 20 caracteres!";
      }
    } else errors.name = "El nombre es requerido!";

    if (!input.image) errors.image = "La imagen es requerida!";

    if (!input.type) errors.type = "El tipo de mascota es requerido!";

    if (!input.description) errors.description = "La descripción es requerida!";

    if (!input.size) errors.size = "El tamaño es requerido!";

    if (input.age) {
      if (isNaN(input.age)) errors.age = "Sólo se permiten números";
      if (/[  +]$/.test(input.age)) errors.age = "Sólo se permiten números";
      if (!Number.isInteger(Number(input.age)))
        errors.age = "Sólo se permiten números enteros";
      if (parseInt(input.age) <= 0 || parseInt(input.age) > 25)
        errors.age = "La edad debe ser entre 1 y 25 años";
    } else errors.age = "La edad es requerida!";

    if (!input.vaccination)
      errors.vaccination = "La información sobre vacunas es requerida!";

    if (!input.castrated)
      errors.castrated = "La información sobre castración es requerida!";

    if (input.place) {
      if (!/^[a-zA-Z]+$/.test(input.place)) {
        errors.place = "La ubicación sólo puede tener letras!";
      } else if (input.place.length > 30) {
        errors.place = "La ubicación no puede tener más de 30 caracteres!";
      }
    } else errors.place = "La ubicación es requerida!";
    console.log(input);

    return errors;
  }

  const have = () => {
    if (
      errors.id ||
      errors.name ||
      errors.image ||
      errors.type ||
      errors.description ||
      errors.size ||
      errors.age ||
      errors.vaccination ||
      errors.castrated ||
      errors.place
    ) {
      return true;
    } else if (
      input.id &&
      input.name &&
      input.image &&
      input.type &&
      input.description &&
      input.size &&
      input.age &&
      input.vaccination &&
      input.castrated &&
      input.place
    ) {
      return false;
    } else {
      return "e";
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (have() === false) {
      let id = input.id;
      delete input.id;

      dispatch(postPet(id, input));

      setInput({
        id: "",
        name: "",
        image: "",
        type: "",
        description: "",
        size: "",
        age: 0,
        vaccination: "",
        castrated: false,
        place: "",
      });
    } else if (have() === "e") {
      alert("Faltan datos!");
    } else alert("Por favor, llena todo correctamente!");
  }

  let key = 0;
  function addKey() {
    return key++;
  }

  useEffect(() => {
    dispatch(getAllPets());
  }, [dispatch]);

  return (
    <div className="bg-gray-300">
      <div>
        <Link to="/home">
          <button>Go back home</button>
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-700 rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden"
      >
        <div className="flex">
          <h1>Registra tu mascota para adoptar!</h1>
        </div>
        <div>
          <label>ID Usuario</label>
          <input
            type="text"
            name="id"
            value={input.id}
            onChange={(e) => handleChange(e)}
            placeholder="Campo provisorio, volará cuando esté el login"
            className="rounded-lg border-transparent flex-1 appearance-none border border-red-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
          {errors.id && <p>{errors.id}</p>}
        </div>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={(e) => handleChange(e)}
            placeholder="Nombre de la mascota"
            className="rounded-lg border-transparent flex-1 appearance-none border border-red-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>Imagen de perfil</label>{" "}
          {/* Agregar que pueda agregar mas imagenes */}
          <input
            type="file"
            name="image"
            value={input.image}
            onChange={(e) => handleChange(e)}
            placeholder="Imagen de perfil"
          />
          {errors.image && <p>{errors.image}</p>}
        </div>
        <div>
          <label>Tipo de animal</label>
          <select name="type" onChange={(e) => handleChange(e)}>
            <option value="typeSelect" defaultValue hidden>
              Seleccione tipo
            </option>
            <option value="dog" key={addKey()}>
              Perro
            </option>
            <option value="cat" key={addKey()}>
              Gato
            </option>
            <option value="other" key={addKey()}>
              Otro
            </option>
          </select>
          {errors.type && <p>{errors.type}</p>}
        </div>
        <div>
          <label>Descripción</label>
          <textarea
            name="description"
            value={input.description}
            placeholder="Descripción"
            onChange={(e) => handleChange(e)}
          />
          {errors.description && <p>{errors.description}</p>}
        </div>
        <div>
          <label>Tamaño</label>
          <select name="size" onChange={(e) => handleChange(e)}>
            <option value="sizeSelect" defaultValue hidden>
              Seleccione tamaño
            </option>
            <option value="small" key={addKey()}>
              Chico
            </option>
            <option value="medium" key={addKey()}>
              Mediano
            </option>
            <option value="big" key={addKey()}>
              Grande
            </option>
          </select>
          {errors.size && <p>{errors.size}</p>}
        </div>
        <div>
          <label>Edad</label>
          <input
            type="text"
            name="age"
            value={input.age}
            onChange={(e) => handleChange(e)}
            placeholder="Edad"
            className="rounded-lg border-transparent flex-1 appearance-none border border-red-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
          {errors.age && <p>{errors.age}</p>}
        </div>
        <div>
          <label>¿Vacunado?</label>
          <select name="vaccination" onChange={(e) => handleChange(e)}>
            <option value="vaccinationSelect" defaultValue hidden>
              Seleccione opción
            </option>
            <option value="yes" key={addKey()}>
              Sí
            </option>
            <option value="no" key={addKey()}>
              No
            </option>
            <option value="unknown" key={addKey()}>
              No sé
            </option>
          </select>
          {errors.vaccination && <p>{errors.vaccination}</p>}
        </div>
        <div>
          <fieldset onChange={(e) => handleChange(e)}>
            <legend>¿Castrado?</legend>
            <div>
              <input type="radio" name="castrated" value={true} />{" "}
              {/*ver si soporta value={true} */}
              <label>Sí</label>
            </div>
            <div>
              <input type="radio" name="castrated" value={false} />
              <label>No</label>
            </div>
          </fieldset>
          {/* <label>Castrado</label>
          <select name="castrated" onChange={(e) => handleChange(e)}>
            <option value="castratedSelect" defaultValue hidden>
              Seleccione opción
            </option>
            <option value={true} key={addKey()}>
              Sí
            </option>
            <option value={false} key={addKey()}>
              No
            </option>
          </select> */}
          {errors.castrated && <p>{errors.castrated}</p>}
        </div>
        <div>
          <label>Ubicación</label>
          <input
            type="text"
            name="place"
            value={input.place}
            onChange={(e) => handleChange(e)}
            placeholder="Ubicación"
            className="rounded-lg border-transparent flex-1 appearance-none border border-red-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
          {errors.place && <p>{errors.place}</p>}
        </div>
        <div>
          <button type="submit">Crear</button>
        </div>
      </form>
    </div>
  );
}
