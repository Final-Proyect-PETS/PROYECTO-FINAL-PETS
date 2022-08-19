import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postUser, getAllUsers } from "../redux/Actions/index.js";
import { useEffect } from "react";

export default function Register() {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);

  console.log(users);

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

  function validate(input) {
    let errors = {};

    if (input.first_name) {
      if (!/^[a-zA-Z]+$/.test(input.first_name)) {
        errors.first_name = "El nombre solo puede tener letras!";
      } else if (input.first_name.length > 20) {
        errors.first_name = "El nombre no puede tener más de 20 caracteres!";
      } else errors.first_name = "";
    } else errors.first_name = "El nombre es requerido!";

    if (input.last_name) {
      if (!/^[a-zA-Z]+$/.test(input.last_name)) {
        errors.last_name = "El nombre solo puede tener letras!";
      } else if (input.last_name.length > 20) {
        errors.last_name = "El nombre no puede tener más de 20 caracteres!";
      } else errors.last_name = "";
    } else errors.last_name = "El nombre es requerido!";

    if (input.username) {
      if (!/^[A-Za-z0-9\s]+$/g.test(input.username)) {
        errors.username = "El nombre de usuario debe tener letras y números!";
      } else if (input.username.length > 20) {
        errors.username =
          "El nombre de usuario no puede tener más de 20 caracteres!";
      } else if (
        users.find((u) => u.username === input.username.toLowerCase())
      ) {
        errors.username = "El usuario ya existe!";
      } else errors.username = "";
    } else errors.username = "El nombre de usuario es requerido!";

    if (input.email) {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.email)) {
        errors.email = "El email debe ser valido!";
      } else if (users.find((u) => u.email === input.email.toLowerCase())) {
        errors.email = "El email ya esta registrado!";
      } else errors.email = "";
    } else errors.email = "El email es necesario!";

    if (input.password) {
      if (!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.password)) {
        errors.password =
          "La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, una minúscula y una mayúscula (No puede tener otros simbolos)!";
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
    <div className="bg-gray-300">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-700 rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden"
      >
        <div className="flex">
          <h1>Registrate!</h1>
        </div>
        <div>
          <label>Nombre</label>
          <input
            name="first_name"
            value={input.first_name}
            onChange={(e) => handleChange(e)}
            placeholder="Nombre"
            className="rounded-lg border-transparent flex-1 appearance-none border border-red-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          ></input>
          {errors.first_name && <p>{errors.first_name}</p>}
          <label>Apellido</label>
          <input
            name="last_name"
            value={input.last_name}
            onChange={(e) => handleChange(e)}
            placeholder="Apellido"
            className="rounded-lg border-transparent flex-1 appearance-none border border-red-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          ></input>
          {errors.last_name && <p>{errors.last_name}</p>}
        </div>
        <div>
          <label>Nombre de usuario</label>
          <input
            name="username"
            value={input.username}
            onChange={(e) => handleChange(e)}
            placeholder="Nombre de usuario"
            className="rounded-lg border-transparent flex-1 appearance-none border border-red-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          ></input>
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div>
          <label>Imagen de Perfil</label>
          <input
            type="file"
            name="image"
            value={input.image}
            onChange={(e) => handleChange(e)}
            placeholder="Imagen de perfil"
          ></input>
        </div>
        <div>
          <label>Correo</label>
          <input
            name="email"
            value={input.email}
            onChange={(e) => handleChange(e)}
            placeholder="Email"
            className="rounded-lg border-transparent flex-1 appearance-none border border-red-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          ></input>
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={(e) => handleChange(e)}
            placeholder="Contraseña"
            className="rounded-lg border-transparent flex-1 appearance-none border border-red-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          ></input>
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div>
          <label>Sobre mí</label>
          <textarea
            name="about"
            value={input.about}
            placeholder="Descripción"
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>
        <div>
          <label>Telefono</label>
          <input
            name="telephone"
            value={input.telephone}
            onChange={(e) => handleChange(e)}
            placeholder="Telefono"
          ></input>
        </div>
        <div>
          <label>Ubicación</label>
          <input
            name="place"
            value={input.place}
            onChange={(e) => handleChange(e)}
            placeholder="Ubicación"
          ></input>
        </div>
        <div>
          <button type="submit">Crear</button>
        </div>
      </form>
    </div>
  );
}
