import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postUser, getAllUsers } from "../redux/Actions/index.js";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);

  //console.log(users);
  const [image, setImage] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    first_name: "",
    last_name: "",
    username: "",
    image: "",
    email: "",
    password: "",
    about: "",
    telephone: "",
    place: "",
  });

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleChange = function (e) {
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
  };

  async function handleImage(e) {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "prettyuser");
    data.append("folder", "UserImages");
    console.log(data.entries());
    setLoadingImage(true);
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/ferrifullstack/image/upload",
      data
    );
    setImage(res.data.secure_url);
    setInput({
      ...input,
      image: res.data.secure_url,
    });
    setErrors(
      validate({
        ...input,
        image: res.data.secure_url,
      })
    );
    setLoadingImage(false);
  }

  function validate(input) {
    let errors = {};

    if (input.first_name) {
      if (!/^[a-zA-Z]+$/.test(input.first_name)) {
        errors.first_name = "El nombre solo puede tener letras";
      } else if (input.first_name.length > 20) {
        errors.first_name = "El nombre no puede tener más de 20 caracteres";
      } else errors.first_name = "";
    } else errors.first_name = "El nombre es necesario";

    if (input.last_name) {
      if (!/^[a-zA-Z]+$/.test(input.last_name)) {
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
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.email)) {
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

    return errors;
  }

  const have = () => {
    if (
      errors.first_name !== "" ||
      errors.last_name !== "" ||
      errors.username !== "" ||
      errors.email !== "" ||
      errors.password !== ""
    ) {
      return true;
    } else if (
      input.first_name &&
      input.last_name &&
      input.username &&
      input.email &&
      input.password
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
        about: "",
        telephone: "",
        place: "",
      });
    } else if (have() === "e") {
      alert("Faltan datos!");
    } else alert("Por favor, llena todo correctamente!");
  }

  return (
    <div className="flex flex-col w-full mt-15 m-auto  py-8 bg-amber-600 rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
      <div className="self-center mb-6 text-xl font-normal text-gray-600 sm:text-2xl dark:text-white">
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
              onChange={(e) => handleImage(e)}
              placeholder="Imagen de perfil"
              className="rounded-lg flex-1 appearance-none w-full py-2 px-4 bg-amber-600  text-white placeholder-white text-sm focus:outline-none focus:border-transparent"
            ></input>
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
            <label className="font-light text-white text-xl">Telefono</label>
            <input
              name="telephone"
              value={input.telephone}
              onChange={(e) => handleChange(e)}
              placeholder="Telefono"
              className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
            ></input>
          </div>
          <div>
            <label className="font-light text-white text-xl">Ubicación</label>
            <input
              name="place"
              value={input.place}
              onChange={(e) => handleChange(e)}
              placeholder="Ubicación"
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
