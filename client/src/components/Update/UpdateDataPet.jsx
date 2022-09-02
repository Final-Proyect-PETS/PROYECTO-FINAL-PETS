import React, { useLayoutEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { patchPet, postImage, getPetDetail } from "../../redux/Actions/index";
import { useDispatch, useSelector } from "react-redux";
import { notificationSwal } from "../../utils/notificationSwal.jsx";
import { Link } from "react-router-dom";
import MapboxAutocomplete from "react-mapbox-autocomplete";
import mapboxgl from "mapbox-gl";

function validateFrom(input) {
  let errors = {};
  if (input.name) {
    if (!/^[a-zA-Z]+$/.test(input.name)) {
      errors.name = "El nombre sólo puede tener letras!";
    } else if (input.name.length > 20) {
      errors.name = "El nombre no puede tener más de 20 caracteres!";
    }
  } else errors.name = "El nombre es requerido!";

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

  if (input.place) {
    if (input.place.length > 30) {
      errors.place = "La ubicación no puede tener más de 30 caracteres!";
    }
  } else errors.place = "La ubicación es requerida!";

  return errors;
}

export default function UpdatePet() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const upDatePet = useSelector((state) => state.petDetail);
  const [image, setImage] = useState("");
  const [imagePool, setImagePool] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingImagePool, setLoadingImagePool] = useState(false);
  const [errors, setErrors] = useState({});
  const [placeSelect, setPlaceSelect] = useState(true);
  const mapDiv = useRef(null);
  const [input, setInput] = useState({
    id: upDatePet._id,
    name: upDatePet.name,
    image: upDatePet.image,
    imagePool: upDatePet.imagePool,
    type: upDatePet.type,
    description: upDatePet.description,
    size: upDatePet.size,
    age: upDatePet.age,
    vaccination: upDatePet.vaccination,
    castrated: upDatePet.castrated,
    place: upDatePet.place,
    place_longitude: upDatePet.place_longitude,
    place_latitude: upDatePet.place_latitude,
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validateFrom({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleChangeSelect(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validateFrom({
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
        validateFrom({
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
        validateFrom({
          ...input,
          imagePool: [...input.imagePool, e.payload],
        })
      );
      setLoadingImagePool(false);
    });
  }

  function handleUpDate(e) {
    e.preventDefault();
    dispatch(patchPet(input)).then((e) => {
      if (e === "OK") {
        notificationSwal(
          "¡Enhorabuena!",
          "La mascota se modificó con éxito",
          "success",
          "Ok"
        );
        setInput({
          id: upDatePet._id,
          name: upDatePet.name,
          image: upDatePet.image,
          imagePool: upDatePet.imagePool,
          type: upDatePet.type,
          description: upDatePet.description,
          size: upDatePet.size,
          age: upDatePet.age,
          vaccination: upDatePet.vaccination,
          castrated: upDatePet.castrated,
          place: upDatePet.place,
          place_longitude: upDatePet.place_longitude,
          place_latitude: upDatePet.place_latitude,
        });
        navigate(`/pet/${upDatePet._id}`);
      } else {
        notificationSwal(
          "¡Oooops!",
          "No se pudo modificar la mascota",
          "warning",
          "Cancel"
        );
      }
    });
  }

  function handleDelete(event) {
    setInput({
      ...input,
      imagePool: input.imagePool.filter((e) => e !== event),
    });
    setErrors(
      validateFrom({
        ...input,
        imagePool: input.imagePool.filter((e) => e !== event),
      })
    );
  }

  let key = 0;
  function addKey() {
    return key++;
  }

  function _suggestionSelect(result, lat, long, text) {
    console.log(result, lat, long, text);
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
    createNewMap(upDatePet.place_longitude, upDatePet.place_latitude);
  }, [placeSelect]);

  function createNewMap(long, lat) {
    if (placeSelect) {
      console.log(mapDiv);
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
      <div className="self-center mb-6 text-xl font-normal text-white sm:text-2xl dark:text-white">
        Edita los datos de tu mascota
      </div>
      <div className="mt-8 px-8 max-w-lg self-center">
        <form onSubmit={(e) => handleUpDate(e)}>
          <div>
            <label className="font-light text-white text-xl">Nombre</label>
            <input
              type="text"
              name="name"
              placeholder={input.name}
              onChange={(e) => handleChange(e)}
              className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
            />
            {errors.name && (
              <p className="font-bold text-red-700 text-center p-2">
                {errors.name}
              </p>
            )}
            <div>
              <label className="font-light text-white text-xl">
                Imagen de perfil
              </label>

              <input
                type="file"
                name="image"
                accept=".jpg, .png, .jpeg"
                onChange={(e) => handleImage(e)}
                className="rounded-lg flex-1 appearance-none w-full py-2 px-4 bg-amber-600  text-white placeholder-white text-sm focus:outline-none focus:border-transparent"
              />
              {loadingImage ? (
                <h3 className="font-light text-white text-xl">
                  Cargando imagen...
                </h3>
              ) : (
                <img src={image || input.image} alt="" width="300px" />
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
                className="self-center rounded-lg flex-1 appearance-none w-full py-2 px-4 bg-amber-600  text-white placeholder-white text-sm focus:outline-none focus:border-transparent"
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
            <label className="font-light text-white text-xl">
              Tipo de mascota{" "}
            </label>
            <select
              name="type"
              onChange={(e) => handleChangeSelect(e)}
              className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
            >
              <option
                value="dog"
                selected={input.type === "dog" ? true : false}
              >
                Perro
              </option>
              <option
                value="cat"
                selected={input.type === "cat" ? true : false}
              >
                Gato
              </option>
              <option
                value="other"
                selected={input.type === "other" ? true : false}
              >
                Otro
              </option>
            </select>
            {errors.type && (
              <p className="font-bold text-red-700 text-center p-2">
                {errors.type}
              </p>
            )}
            <br />
            <label className="font-light text-white text-xl">Descripción</label>
            <textarea
              type="text"
              name="description"
              placeholder={input.description}
              onChange={(e) => handleChange(e)}
              className="w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent resize-none"
            />
            {errors.description && (
              <p className="font-bold text-red-700 text-center p-2">
                {errors.description}
              </p>
            )}

            <label className="font-light text-white text-xl">Tamaño </label>
            <select
              name="size"
              onChange={(e) => handleChangeSelect(e)}
              className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
            >
              <option
                value="big"
                selected={input.size === "big" ? true : false}
              >
                Grande
              </option>
              <option
                value="medium"
                selected={input.size === "medium" ? true : false}
              >
                Mediano
              </option>
              <option
                value="small"
                selected={input.size === "small" ? true : false}
              >
                Chico
              </option>
            </select>
            {errors.size && (
              <p className="font-bold text-red-700 text-center p-2">
                {errors.size}
              </p>
            )}
            <br />
            <label className="font-light text-white text-xl">Edad</label>
            <input
              type="text"
              name="age"
              placeholder={input.age}
              onChange={(e) => handleChange(e)}
              className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
            />
            {errors.age && (
              <p className="font-bold text-red-700 text-center p-2">
                {errors.age}
              </p>
            )}
            <label className="font-light text-white text-xl">Vacunado </label>
            <select
              name="vaccination"
              onChange={(e) => handleChangeSelect(e)}
              className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
            >
              <option
                value="yes"
                selected={input.vaccination === "yes" ? true : false}
              >
                Sí
              </option>
              <option
                value="no"
                selected={input.vaccination === "no" ? true : false}
              >
                No
              </option>
              <option
                value="unknown"
                selected={input.vaccination === "unknown" ? true : false}
              >
                No sé
              </option>
            </select>
            {errors.vaccination && (
              <p className="font-bold text-red-700 text-center p-2">
                {errors.vaccination}
              </p>
            )}
            <br />
            <label className="font-light text-white text-xl">Castrado </label>
            <select
              name="castrated"
              onChange={(e) => handleChangeSelect(e)}
              className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
            >
              <option
                value="true"
                selected={input.castrated === "true" ? true : false}
              >
                Sí
              </option>
              <option
                value="false"
                selected={input.castrated === "false" ? true : false}
              >
                No
              </option>
            </select>
            {errors.castrated && (
              <p className="font-bold text-red-700 text-center p-2">
                {errors.castrated}
              </p>
            )}
            <br />
            <div>
              <label className="font-light text-white text-xl">Ubicación</label>
              <MapboxAutocomplete
                publicKey={mapAccess.mapboxApiAccessToken}
                inputClass="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
                onSuggestionSelect={_suggestionSelect}
                resetSearch={false}
                placeholder={"Modifique ciudad"}
              />
              {input.place && (
                <p className="font-light text-white text-xl">{input.place}</p>
              )}
            </div>
            {upDatePet.place ? (
              <div
                ref={mapDiv}
                style={{
                  block: "w-full",
                  height: "15vw",
                  borderRadius: "10px",
                }}
              />
            ) : null}
          </div>
          {
            <button
              type="submit"
              className="py-2 px-4 my-4 w-full bg-yellow-900 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            >
              Actualizar
            </button>
          }
        </form>
        <div>
          <Link to={`/pet/${upDatePet._id}`}>
            <button className="py-2 px-4 w-full bg-yellow-900 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
              Regresar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
