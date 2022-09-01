import React, { useLayoutEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postUser, getAllUsers, postImage } from "../redux/Actions/index.js";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notificationSwal } from "../utils/notificationSwal.jsx";
import MapboxAutocomplete from "react-mapbox-autocomplete";
import mapboxgl from "mapbox-gl";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.users);

  const [image, setImage] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [errors, setErrors] = useState({});
  const [placeSelect, setPlaceSelect] = useState(false);

  const mapDiv = useRef(null);

  const [input, setInput] = useState({
    first_name: "",
    last_name: "",
    username: "",
    image: "",
    email: "",
    password: "",
    passwordRepeat: "",
    about: "",
    telephone: "",
    place: "",
    place_longitude: "",
    place_latitude: "",
  });

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

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

  function validate(input) {
    let errors = {};

    if (input.first_name) {
      if (
        !/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1\s]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/g.test(
          input.first_name
        )
      ) {
        errors.first_name = "El nombre solo puede tener letras";
      } else if (input.first_name.length > 20) {
        errors.first_name = "El nombre no puede tener más de 20 caracteres";
      } else errors.first_name = "";
    } else errors.first_name = "El nombre es necesario";

    if (input.last_name) {
      if (
        !/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1\s]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/g.test(
          input.last_name
        )
      ) {
        errors.last_name = "El nombre solo puede tener letras";
      } else if (input.last_name.length > 20) {
        errors.last_name = "El nombre no puede tener más de 20 caracteres";
      } else errors.last_name = "";
    } else errors.last_name = "El apellido es necesario";

    if (input.username) {
      if (!/^[A-Za-z0-9\s]+$/g.test(input.username)) {
        errors.username = "El nombre de usuario debe tener letras y números";
      } else if (input.username.length > 20) {
        errors.username =
          "El nombre de usuario no puede tener más de 20 caracteres";
      } else if (
        users.find((u) => u.username === input.username.toLowerCase())
      ) {
        errors.username = "El usuario ya existe";
      } else errors.username = "";
    } else errors.username = "El nombre de usuario es necesario";

    if (input.email) {
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(input.email)) {
        errors.email = "El email debe ser valido!";
      } else if (users.find((u) => u.email === input.email.toLowerCase())) {
        errors.email = "El email ya esta registrado";
      } else errors.email = "";
    } else errors.email = "El email es necesario";

    if (input.password) {
      if (!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.password)) {
        errors.password =
          "La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, una minúscula y una mayúscula (No puede tener otros simbolos)";
      } else errors.password = "";
    } else errors.password = "La contraseña es necesaria!";

    if (input.passwordRepeat) {
      if (
        !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(
          input.passwordRepeat
        )
      ) {
        errors.passwordRepeat =
          "La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, una minúscula y una mayúscula (No puede tener otros simbolos)";
      } else if (input.password && input.password !== input.passwordRepeat) {
        errors.passwordRepeat = "Las contraseñas no coinciden";
      } else errors.passwordRepeat = "";
    } else errors.passwordRepeat = "La contraseña es necesaria!";

    return errors;
  }

  const have = () => {
    if (
      errors.first_name !== "" ||
      errors.last_name !== "" ||
      errors.username !== "" ||
      errors.email !== "" ||
      errors.password !== "" ||
      errors.passwordRepeat !== ""
    ) {
      return true;
    } else if (
      input.first_name &&
      input.last_name &&
      input.username &&
      input.email &&
      input.password &&
      input.passwordRepeat
    ) {
      return false;
    } else {
      return "e";
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (have() === false) {
      dispatch(postUser(input));
      setInput({
        first_name: "",
        last_name: "",
        username: "",
        image: "",
        email: "",
        password: "",
        passwordRepeat: "",
        about: "",
        telephone: "",
        place: "",
        place_longitude: "",
        place_latitude: "",
      });
      notificationSwal(
        "¡Enhorabuena!",
        "Usuario creado con éxito",
        "success",
        "Ok"
      );
      navigate("/", { replace: true });
    } else if (have() === "e") {
      notificationSwal(
        "¡Faltan datos!",
        "Complete todos los campos obligatorios",
        "error",
        "Cancel"
      );
    } else
      notificationSwal(
        "Faltan datos, por favor verifique y vuelva a intentarlo",
        "Complete todos los campos obligatorios",
        "error",
        "Cancel"
      );
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
    createNewMap(input.place_longitude, input.place_latitude);
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
        Registrate
      </div>
      <div className="mt-8 px-8 max-w-lg self-center">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="font-light text-white text-xl">Nombre</label>
            <input
              name="first_name"
              value={input.first_name}
              onChange={(e) => handleChange(e)}
              placeholder="Nombre"
              className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
            />
            {errors.first_name && (
              <p className="font-bold text-red-700 text-center p-2">
                {errors.first_name}
              </p>
            )}

            <label className="font-light text-white text-xl">Apellido</label>
            <input
              name="last_name"
              value={input.last_name}
              onChange={(e) => handleChange(e)}
              placeholder="Apellido"
              className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
            />
            {errors.last_name && (
              <p className="font-bold text-red-700 text-center p-2">
                {errors.last_name}
              </p>
            )}
          </div>
          <div>
            <label className="font-light text-white text-xl">
              Nombre de usuario
            </label>
            <input
              name="username"
              value={input.username}
              onChange={(e) => handleChange(e)}
              placeholder="Nombre de usuario"
              className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
            />
            {errors.username && (
              <p className="font-bold text-red-700 text-center p-2">
                {errors.username}
              </p>
            )}
          </div>
          <div>
            <label className="font-light text-white text-xl">
              Imagen de Perfil
            </label>
            <input
              type="file"
              name="image"
              accept=".jpg, .png, .jpeg"
              onChange={(e) => handleImage(e)}
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
            {loadingImage ? (
              <h3 className="font-light text-white text-xl">
                Cargando imagen...
              </h3>
            ) : (
              <img src={image} alt="" width="300px" />
            )}
          </div>
          <div>
            <label className="font-light text-white text-xl">
              Correo electrónico
            </label>
            <input
              name="email"
              type="email"
              value={input.email}
              onChange={(e) => handleChange(e)}
              placeholder="Email"
              className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
            ></input>
            {errors.email && (
              <p className="font-bold text-red-700 text-center p-2">
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <label className="font-light text-white text-xl">Contraseña</label>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={(e) => handleChange(e)}
              placeholder="Contraseña"
              className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
            ></input>
            {errors.password && (
              <p className="font-bold text-red-700 text-center p-2">
                {errors.password}
              </p>
            )}
          </div>
          <div>
            <label className="font-light text-white text-xl">
              Confirmar contraseña
            </label>
            <input
              type="password"
              name="passwordRepeat"
              value={input.passwordRepeat}
              onChange={(e) => handleChange(e)}
              placeholder="Repetir contraseña"
              className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
            ></input>
            {errors.passwordRepeat && (
              <p className="font-bold text-red-700 text-center p-2">
                {errors.passwordRepeat}
              </p>
            )}
          </div>
          <div>
            <label className="font-light text-white text-xl">Sobre mí</label>
            <textarea
              name="about"
              value={input.about}
              placeholder="Descripción"
              onChange={(e) => handleChange(e)}
              className="w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent resize-none"
            ></textarea>
          </div>
          <div>
            <label className="font-light text-white text-xl">Ubicación</label>
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
            <label className="font-light text-white text-xl">Telefono</label>
            <input
              name="telephone"
              type="tel"
              value={input.telephone}
              onChange={(e) => handleChange(e)}
              placeholder="Telefono"
              className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
            ></input>
          </div>
          <div>
            <button
              type="submit"
              className="py-2 px-4 my-4 w-full bg-yellow-900 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            >
              Crear
            </button>
          </div>
        </form>
        <Link to="/">
          <button className="py-2 px-4 w-full bg-yellow-900 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
            Regresar
          </button>
        </Link>
      </div>
    </div>
  );
}
