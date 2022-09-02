import React, { useLayoutEffect, useRef } from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPets, postPet, postImage } from "../redux/Actions/index.js";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { notificationSwal } from "../utils/notificationSwal.jsx";
import MapboxAutocomplete from "react-mapbox-autocomplete";
import mapboxgl from "mapbox-gl";

export default function RegisterPet() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      dispatch(getAllPets());
    };
  });

  const id = localStorage.getItem("id");
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState("");
  const [imagePool, setImagePool] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingImagePool, setLoadingImagePool] = useState(false);
  const [placeSelect, setPlaceSelect] = useState(false);

  const mapDiv = useRef(null);

  const [input, setInput] = useState({
    id: id,
    name: "",
    image: "",
    imagePool: [],
    type: "",
    description: "",
    size: "",
    age: "",
    vaccination: "",
    castrated: false,
    gender: "",
    place: "",
    place_longitude: "",
    place_latitude: "",
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

  async function handleImage(e) {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "pretty");
    data.append("folder", "Images");
    setLoadingImage(true);
    dispatch(postImage(data)).then((e) => {
      setImage(e.payload);
      setInput({
        ...input,
        image: e.payload,
      });
      setErrors(
        validate({
          ...input,
          image: e.payload,
        })
      );
      setLoadingImage(false);
    });
  }

  async function handleImagePool(e) {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "pretty");
    data.append("folder", "Images");
    setLoadingImagePool(true);
    dispatch(postImage(data)).then((e) => {
      setImagePool(e.payload);
      setInput({
        ...input,
        imagePool: [...input.imagePool, e.payload],
      });
      setErrors(
        validate({
          ...input,
          imagePool: [...input.imagePool, e.payload],
        })
      );
      setLoadingImagePool(false);
    });
  }

  function validate(input) {
    let errors = {};

    if (!input.id) errors.id = "El id es requerido!";

    if (input.name) {
      if (!/^[a-zA-Z\s]+$/.test(input.name)) {
        errors.name = "El nombre sólo puede tener letras!";
      } else if (input.name.length > 20) {
        errors.name = "El nombre no puede tener más de 20 caracteres!";
      }
    } else errors.name = "El nombre es requerido!";

    if (!input.image) errors.image = "La imagen es requerida!";

    if (!input.imagePool.length)
      errors.imagePool = "Por lo menos una imagen extra requerida!";

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

    if (!input.gender)
      errors.gender = "La información sobre castración es requerida!";

    // if (input.place) {
    //   if (!/^[a-zA-Z0-9\s]+$/.test(input.place)) {
    //     errors.place = "La ubicación sólo puede tener letras y/o números!";
    //   } else if (input.place.length > 30) {
    //     errors.place = "La ubicación no puede tener más de 30 caracteres!";
    //   }
    // } else errors.place = "La ubicación es requerida!";

    return errors;
  }

  const have = () => {
    if (
      errors.id ||
      errors.name ||
      errors.image ||
      errors.imagePool ||
      errors.type ||
      errors.description ||
      errors.size ||
      errors.age ||
      errors.vaccination ||
      errors.castrated ||
      errors.gender ||
      errors.place
    ) {
      return true;
    } else if (
      input.id &&
      input.name &&
      input.image &&
      input.imagePool &&
      input.type &&
      input.description &&
      input.size &&
      input.age &&
      input.vaccination &&
      input.castrated &&
      input.gender &&
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
      Swal.fire({
        title: "¿Está seguro de que desea crear esta mascota?",
        text: "Esta mascota se publicará en adopción",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonText: "Sí",
      }).then((result) => {
        if (result.isConfirmed) {
          let id = input.id;
          delete input.id;
          dispatch(postPet(id, input)).then((e) => {
            if (e === "Mascota creada correctamente") {
              notificationSwal(
                "¡Enhorabuena!",
                "Mascota creada con éxito",
                "success",
                "Ok"
              );
              navigate("/home");
            } else {
              notificationSwal(
                "¡Ooops!",
                "No se pudo crear la mascota, intente mas tarde",
                "error",
                "Cancel"
              );
            }
          });
        } else {
          notificationSwal(
            "Operación cancelada",
            "Mascota no creada",
            "error",
            "Cancel"
          );
        }
      });

      setInput({
        id: "",
        name: "",
        image: "",
        imagePool: [],
        type: "",
        description: "",
        size: "",
        age: 0,
        vaccination: "",
        castrated: false,
        gender: "",
        place: "",
        place_longitude: "",
        place_latitude: "",
      });
      setImage("");
    } else if (have() === "e") {
      notificationSwal(
        "¡Faltan datos!",
        "Complete todos los campos obligatorios",
        "error",
        "Cancel"
      );
    } else
      notificationSwal(
        "¡Hay errores!",
        "Corríjalos por favor",
        "error",
        "Cancel"
      );
  }

  function handleDelete(event) {
    setInput({
      ...input,
      imagePool: input.imagePool.filter((e) => e !== event),
    });
    setErrors(
      validate({
        ...input,
        imagePool: input.imagePool.filter((e) => e !== event),
      })
    );
  }

  let key = 0;
  function addKey() {
    return key++;
  }

  function _suggestionSelect(result, lat, long) {
    setInput({
      ...input,
      place: result,
      place_longitude: long,
      place_latitude: lat,
    });
    setPlaceSelect(true);
    //if (placeSelect)
    createNewMap(long, lat);
  }
  const mapAccess = {
    mapboxApiAccessToken:
      "pk.eyJ1Ijoiam9uc2VuIiwiYSI6IkR6UU9oMDQifQ.dymRIgqv-UV6oz0-HCFx1w",
  };

  useLayoutEffect(() => {
    //if (placeSelect)
    createNewMap(input.place_longitude, input.place_latitude);
  }, [placeSelect]);

  function createNewMap(long, lat) {
    if (placeSelect) {
      new mapboxgl.Map({
        container: mapDiv.current, // container ID
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [long, lat], // starting position [lng, lat]
        zoom: 12, // starting zoom
        projection: "globe", // display the map as a 3D globe
      });
    }
  }

  mapboxgl.accessToken =
    "pk.eyJ1IjoicG9saW5vIiwiYSI6ImNsN2FtdWNybTB0bmk0MHNqZXZxMzM0OTYifQ.O2Y9sZnF-K1k_KhC8MzJbA";

  return (
    <div className="flex flex-col w-full mt-15 m-auto py-8 bg-amber-600 rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
      <div className="self-center mb-6 text-xl font-normal text-white sm:text-2xl">
        Registra tu mascota para adoptar
      </div>

      <div className="mt-8 px-8 max-w-lg self-center">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="font-light text-white text-xl">Nombre</label>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={(e) => handleChange(e)}
              placeholder="Nombre de la mascota"
              className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-black placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
            />
            {errors.name && (
              <p className="font-bold text-red-700 text-center p-2">
                {errors.name}
              </p>
            )}

          </div>
          <div>
            <label className="font-light text-white text-xl">
              Imagen de perfil
            </label>
            <input
              type="file"
              name="image"
              accept=".jpg, .png, .jpeg"
              onChange={(e) => handleImage(e)}
              className="w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
            {loadingImage ? (
              <h3 className="font-light text-white text-xl self-center">
                Cargando imagen...
              </h3>
            ) : (
              <img src={image} alt="" className="max-w-xs" />
            )}
            {errors.image && (
              <p className="font-bold text-red-700 text-center p-2">
                {errors.image}
              </p>
            )}
          </div>
          <div>
            <label className="font-light text-white text-xl">
              Más imágenes
            </label>
            <input
              type="file"
              name="imagePool"
              accept=".jpg, .png, .jpeg"
              onChange={(e) => handleImagePool(e)}
              className="w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />

            <div className="font-light text-white text-xl">
              {loadingImagePool ? (
                <h3>Cargando imagen...</h3>
              ) : (
                input.imagePool.map((el) => (
                  <div key={addKey()}>
                    <button
                      key={el.id}
                      type="button"
                      onClick={() => handleDelete(el)}
                      className="px-2 border-4 rounded-lg font-bold text-yellow-900 border-yellow-900"
                    >
                      x
                    </button>
                    <img src={el} alt="" width="300px" />
                  </div>
                ))
              )}
            </div>
            {errors.imagePool && (
              <p className="font-bold text-red-700 text-center p-2">
                {errors.imagePool}
              </p>
            )}
          </div>
          <div>
            <label className="font-light text-white text-xl">
              Tipo de mascota
            </label>
            <select
              name="type"
              onChange={(e) => handleChange(e)}
              className="bg-gray-50 border border-gray-300 text-gray-400 text-base rounded-lg focus:ring-yellow-800 focus:border-transparent focus:outline-none focus:ring-2 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-yellow-800 dark:focus:border-transparent"
            >
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
            {errors.type && (
              <p className="font-bold text-red-700 text-center p-2">
                {errors.type}
              </p>
            )}
          </div>
          <div>
            <label className="font-light text-white text-xl">Descripción</label>
            <textarea
              name="description"
              value={input.description}
              placeholder="Descripción"
              onChange={(e) => handleChange(e)}
              className="w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent resize-none"
            />
            {errors.description && (
              <p className="font-bold text-red-700 text-center p-2">
                {errors.description}
              </p>
            )}
          </div>
          <div>
            <label className="font-light text-white text-xl">Tamaño</label>
            <select
              name="size"
              onChange={(e) => handleChange(e)}
              className="bg-gray-50 border border-gray-300 text-gray-400 text-base rounded-lg focus:ring-yellow-800 focus:border-transparent focus:outline-none focus:ring-2 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-yellow-800 dark:focus:border-transparent"
            >
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
            {errors.size && (
              <p className="font-bold text-red-700 text-center p-2">
                {errors.size}
              </p>
            )}
          </div>
          <div>
            <label className="font-light text-white text-xl">Edad</label>
            <input
              type="text"
              name="age"
              value={input.age}
              onChange={(e) => handleChange(e)}
              placeholder="Edad"
              className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
            />
            {errors.age && (
              <p className="font-bold text-red-700 text-center p-2">
                {errors.age}
              </p>
            )}
          </div>
          <div>
            <label className="font-light text-white text-xl">¿Vacunado?</label>
            <span>
              <select
                name="vaccination"
                className="bg-gray-50 border border-gray-300 text-gray-400 text-base rounded-lg focus:ring-yellow-800 focus:border-transparent focus:outline-none focus:ring-2 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-yellow-800 dark:focus:border-transparent"
                onChange={(e) => handleChange(e)}
              >
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
            </span>
            {errors.vaccination && (
              <p className="font-bold text-red-700 text-center p-2">
                {errors.vaccination}
              </p>
            )}
          </div>
          <div>
            <fieldset onChange={(e) => handleChange(e)}>
              <legend className="font-light text-white text-xl">
                ¿Castrado?
              </legend>
              <span className="p-3">
                <input
                  type="radio"
                  name="castrated"
                  value={true}
                  className="w-4 h-4 mx-4 text-yellow-600 bg-white ring-1 ring-yellow-900  focus:ring-yellow-900"
                />
                <label className="font-light text-white text-xl">Sí</label>
              </span>
              <span className="p-16">
                <input
                  type="radio"
                  name="castrated"
                  value={false}
                  className="w-4 h-4 mx-4 text-yellow-600 bg-white ring-1 ring-yellow-900  focus:ring-yellow-900"
                />
                <label className="font-light text-white text-xl">No</label>
              </span>
            </fieldset>
            {errors.castrated && (
              <p className="font-bold text-red-700 text-center p-2">
                {errors.castrated}
              </p>
            )}
          </div>
          <div>
            <fieldset onChange={(e) => handleChange(e)}>
              <legend className="font-light text-white text-xl">Género</legend>
              <span className="p-3">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className="w-4 h-4 mx-4 text-yellow-600 bg-white ring-1 ring-yellow-900  focus:ring-yellow-900"
                />
                <label className="font-light text-white text-xl">Hembra</label>
              </span>
              <span className="p-3">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className="w-4 h-4 mx-4 text-yellow-600 bg-white ring-1 ring-yellow-900  focus:ring-yellow-900"
                />
                <label className="font-light text-white text-xl">Macho</label>
              </span>

            </fieldset>
            {errors.gender && (
              <p className="font-bold text-red-700 text-center p-2">
                {errors.gender}
              </p>
            )}
          </div>
          <div>
            <label className="font-light text-white text-xl">Ubicación</label>
            {/* <input
              type="text"
              name="place"
              value={input.place}
              onChange={(e) => handleChange(e)}
              placeholder="Ubicación"
              className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
            /> */}
            <MapboxAutocomplete
              publicKey={mapAccess.mapboxApiAccessToken}
              inputClass="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
              onSuggestionSelect={_suggestionSelect}
              resetSearch={false}
              placeholder={
                !input.place ? "Escriba su ciudad" : "Modifique ciudad"
              }
            />
            {input.place && (
              <p className="font-light text-white text-xl">{input.place}</p>
            )}
            {errors.place && (
              <p className="font-bold text-red-700 text-center p-2">
                {errors.place}
              </p>
            )}
          </div>
          {input.place ? (
            <div
              ref={mapDiv}
              style={{
                block: "w-full",
                height: "15vw",
                borderRadius: "10px",
              }}
            />
          ) : null}
          <div>
            <button
              type="submit"
              className="py-2 px-4 my-4 w-full bg-yellow-900 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            >
              Crear
            </button>
          </div>
        </form>

        <Link to="/home">
          <button className="py-2 px-4 w-full bg-yellow-900 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
            Regresar
          </button>
        </Link>
      </div>
    </div>
  );
}
