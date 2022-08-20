import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postPet, getAllPets } from "../redux/Actions/index.js";
//import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { notificationSwal } from "../utils/notificationSwal.jsx";

export default function RegisterPet() {
  const dispatch = useDispatch();

  // const pets = useSelector((state) => state.pets);

  const [errors, setErrors] = useState({});
  const [image, setImage] = useState("");
  const [imagePool, setImagePool] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingImagePool, setLoadingImagePool] = useState(false);

  const [input, setInput] = useState({
    id: "",
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

  async function handleImagePool(e) {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "pretty");
    data.append("folder", "Images");
    setLoadingImagePool(true);
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/ferrifullstack/image/upload",
      data
    );
    setImagePool(res.data.secure_url);
    setInput({
      ...input,
      imagePool: [...input.imagePool, res.data.secure_url],
    });
    setErrors(
      validate({
        ...input,
        imagePool: [...input.imagePool, res.data.secure_url],
      })
    );
    setLoadingImagePool(false);
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

    if (input.place) {
      if (!/^[a-zA-Z0-9\s]+$/.test(input.place)) {
        errors.place = "La ubicación sólo puede tener letras y/o números!";
      } else if (input.place.length > 30) {
        errors.place = "La ubicación no puede tener más de 30 caracteres!";
      }
    } else errors.place = "La ubicación es requerida!";
    //console.log(input);

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

  // useEffect(() => {
  //   dispatch(getAllPets());
  // }, [dispatch]);

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
          <label>Imagen de perfil</label>
          <input type="file" name="image" onChange={(e) => handleImage(e)} />
          {loadingImage ? (
            <h3>Cargando imagen...</h3>
          ) : (
            <img src={image} alt="" width="300px" />
          )}
          {errors.image && <p>{errors.image}</p>}
        </div>
        <div>
          <label>Más imágenes</label>
          <input
            type="file"
            name="imagePool"
            onChange={(e) => handleImagePool(e)}
          />
          <div>
            {loadingImagePool ? (
              <h3>Cargando imagen...</h3>
            ) : (
              input.imagePool.map((el) => (
                <div key={addKey()}>
                  <img src={el} alt="" width="300px" />
                  <button
                    key={el.id}
                    type="button"
                    onClick={() => handleDelete(el)}
                  >
                    X
                  </button>
                </div>
              ))
            )}
          </div>
          {errors.imagePool && <p>{errors.imagePool}</p>}
        </div>
        <div>
          <label>Tipo de mascota</label>
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
              <input type="radio" name="castrated" value={true} />
              <label>Sí</label>
            </div>
            <div>
              <input type="radio" name="castrated" value={false} />
              <label>No</label>
            </div>
          </fieldset>
          {errors.castrated && <p>{errors.castrated}</p>}
        </div>
        <div>
          <fieldset onChange={(e) => handleChange(e)}>
            <legend>Genero</legend>
            <div>
              <input type="radio" name="gender" value="female" />
              <label>Hembra</label>
            </div>
            <div>
              <input type="radio" name="gender" value="male" />
              <label>Macho</label>
            </div>
          </fieldset>
          {errors.gender && <p>{errors.gender}</p>}
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
