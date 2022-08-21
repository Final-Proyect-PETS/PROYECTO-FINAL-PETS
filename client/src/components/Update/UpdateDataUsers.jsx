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

  useEffect(() => {
    dispatch(getUserDetail());
    dispatch(getAllUsers());
  }, [dispatch]);

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
    dispatch(patchUsuer(input));
    alert("Datos Actulizados Exitosamente 👍");
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
  }

  return (
    <div>
      <form onSubmit={(e) => handleUpDate(e)}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="first_name"
            value={input.first_name}
            onChange={(e) => handleChange(e)}
          />
          {errors.first_name && <p>{errors.first_name}</p>}
          <label>Apellido:</label>
          <input
            type="text"
            name="last_name"
            value={input.last_name}
            onChange={(e) => handleChange(e)}
          />
          {errors.last_name && <p>{errors.last_name}</p>}
        </div>
        <div>
          <label>Alias:</label>
          <input
            type="text"
            name="username"
            value={input.username}
            onChange={(e) => handleChange(e)}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div>
          <label>ImagenDePerfil:</label>
          <input
            type="text"
            name="image"
            value={input.image}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Correo:</label>
          <input
            type="text"
            name="email"
            value={input.email}
            onChange={(e) => handleChange(e)}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>SobreMí:</label>
          <input
            type="text"
            name="about"
            value={input.about}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Telefono:</label>
          <input
            type="text"
            name="telephone"
            value={input.telephone}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <button type="submit">Actualizar</button>
        </div>
      </form>
      <div>
        <Link to={`/users/${upDateUser._id}`}>
          <button>Regresar</button>
        </Link>
      </div>
    </div>
  );
}
