import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import useHistory
import {
  getUserDetail,
  patchUsuer,
  getAllUsers,
} from "../../redux/Actions/index";
import { useDispatch, useSelector } from "react-redux";

export default function UpdateUser() {
  const dispatch = useDispatch();
  const upDateUser = useSelector((state) => state.userDetail);
  const users = useSelector((state) => state.users);

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    first_name: upDateUser.first_name,
    last_name: upDateUser.last_name,
    username: upDateUser.username,
    image: upDateUser.image,
    email: upDateUser.email,
    about: upDateUser.about,
    telephone: upDateUser.telephone,
    place: upDateUser.place,
  });

  // useEffect(() => {
  //   dispatch(getUserDetail());
  //   dispatch(getAllUsers());
  // }, [dispatch]);

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
  function validateFrom(input) {
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
        // } else if (
        //   users.find((u) => u.username === input.username.toLowerCase())
        // ) {
        //   errors.username = "El usuario ya existe!";
      } else errors.username = "";
    } else errors.username = "El nombre de usuario es requerido!";

    if (input.email) {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.email)) {
        errors.email = "El email debe ser valido!";
      } else if (users.find((u) => u.email === input.email.toLowerCase())) {
        errors.email = "El email ya esta registrado!";
      } else errors.email = "";
    } else errors.email = "El email es necesario!";

    return errors;
  }
  function handleUpDate(e) {
    e.preventDefault();
    dispatch(patchUsuer(input)).then(
      alert("Datos Actualizados Exitosamente 👍")
    );
    setInput({
      first_name: upDateUser.first_name,
      last_name: upDateUser.last_name,
      username: upDateUser.username,
      image: upDateUser.image,
      email: upDateUser.email,
      about: upDateUser.about,
      telephone: upDateUser.telephone,
      place: upDateUser.place,
    });
    dispatch(getUserDetail(upDateUser._id)); //esto es porque en el estado userDetail me quedaba cargada
    //la frase "Datos Actualizados Exitosamente 👍", y preciso que se vuelva a cargar con el usuario para que al clickear el boton
    //para regresar, me tome bien sus datos y no aparezca como undefined.
  }

  return (
    <div className="flex flex-col w-full mt-15 m-auto  py-8 bg-amber-600 rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
      <div className="self-center mb-6 text-xl font-normal text-gray-600 sm:text-2xl dark:text-white">
        Edita tus datos
      </div>
      <div className="mt-8 px-8 max-w-lg self-center">
        <form onSubmit={(e) => handleUpDate(e)}>
          <div>
            <label className="font-light text-white text-xl">Nombre</label>
            <input
              type="text"
              name="first_name"
              value={input.first_name}
              onChange={(e) => handleChange(e)}
              className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
            />
            {errors.first_name && <p className="font-bold text-red-700 text-center p-2">{errors.first_name}</p>}
            <label className="font-light text-white text-xl">Apellido</label>
            <input
              type="text"
              name="last_name"
              value={input.last_name}
              onChange={(e) => handleChange(e)}
              className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
            />
            {errors.last_name && <p className="font-bold text-red-700 text-center p-2">{errors.last_name}</p>}

            <label className="font-light text-white text-xl">Nombre de usuario</label>
            <input
              type="text"
              name="username"
              value={input.username}
              onChange={(e) => handleChange(e)}
              className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
            />
            {errors.username && <p className="font-bold text-red-700 text-center p-2">{errors.username}</p>}

            <label className="font-light text-white text-xl">Imagen de perfil</label>
            <input
              type="text"
              name="image"
              value={input.image}
              onChange={(e) => handleChange(e)}
              className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
              // className="rounded-lg flex-1 appearance-none w-full py-2 px-4 bg-amber-600  text-white placeholder-white text-sm focus:outline-none focus:border-transparent"
            />

            <label className="font-light text-white text-xl">Correo electrónico</label>
            <input
              type="text"
              name="email"
              value={input.email}
              onChange={(e) => handleChange(e)}
              className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
            />
            {errors.email && <p className="font-bold text-red-700 text-center p-2">{errors.email}</p>}

            <label className="font-light text-white text-xl">Sobre mí</label>
            <textarea
              type="text"
              name="about"
              value={input.about}
              onChange={(e) => handleChange(e)}
              className="w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent resize-none"
            />

            <label className="font-light text-white text-xl">Teléfono</label>
            <input
              type="text"
              name="telephone"
              value={input.telephone}
              onChange={(e) => handleChange(e)}
              className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
            />

            <button type="submit" className="py-2 px-4 my-4 w-full bg-yellow-900 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">Actualizar</button>
          </div>
        </form>
        <div>
          <Link to={`/users/${upDateUser._id}`}>
            <button className="py-2 px-4 w-full bg-yellow-900 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">Regresar</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
