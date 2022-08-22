import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getPetDetail, patchPet, getAllPets } from "../../redux/Actions/index";
import { useDispatch, useSelector } from "react-redux";

export default function UpdatePet() {
  let { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const upDatePet = useSelector((state) => state.petDetail);
  //const id_console = upDatePet._id;

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    id: upDatePet._id,
    name: upDatePet.name,
    image: upDatePet.image,
    type: upDatePet.type,
    description: upDatePet.description,
    size: upDatePet.size,
    age: upDatePet.age,
    vaccination: upDatePet.vaccination,
    castrated: upDatePet.castrated,
    place: upDatePet.place,
  });

  /* const [input, setInput] = useState({
        id: upDatePet._id,
        name: "",
        image: "",
        type: "",
        description: "",
        size: "",
        age: "",
        vaccination: "",
        castrated: "",
        place: "",
    }) */

  //   useEffect(() => {
  //     dispatch(getAllPets());
  //     dispatch(getPetDetail(id));
  //   }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    // if(input[e.target.name] === ""){
    //     setInput({
    //         ...input,
    //         [e.target.name]: e.target.placeholder
    //     })
    // }
    // console.log(input)
    setErrors(
      validateFrom({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function validateFrom(input) {
    let errors = {};

    if (input.name) {
      if (!/^[a-zA-Z]+$/.test(input.name)) {
        errors.name = "El nombre sólo puede tener letras!";
      } else if (input.name.length > 20) {
        errors.name = "El nombre no puede tener más de 20 caracteres!";
      }
    } else errors.name = "El nombre es requerido!";

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
      //   if (!/^[a-zA-Z]+$/.test(input.place)) {
      //   errors.place = "La ubicación sólo puede tener letras!";
      if (input.place.length > 30) {
        errors.place = "La ubicación no puede tener más de 30 caracteres!";
      }
    } else errors.place = "La ubicación es requerida!";

    return errors;
  }
  function handleUpDate(e) {
    e.preventDefault();
    dispatch(patchPet(input));
    alert("Datos Actualizados Exitosamente 👍");
    setInput({
      id: upDatePet._id,
      name: upDatePet.name,
      image: upDatePet.image,
      type: upDatePet.type,
      description: upDatePet.description,
      size: upDatePet.size,
      age: upDatePet.age,
      vaccination: upDatePet.vaccination,
      castrated: upDatePet.castrated,
      place: upDatePet.place,
    });
    // let id = input.id
    // dispatch(patchPet(id,input))
    // console.log(input,"2")
  }
  //console.log(id_console);
  return (
    <div className="flex flex-col w-full mt-15 m-auto py-8 bg-amber-600 rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
      <div className="self-center mb-6 text-xl font-normal text-gray-600 sm:text-2xl dark:text-white">
        Edita los datos de tu mascota
        </div>
        <div className="mt-8 px-8 max-w-lg self-center">
        
          <form onSubmit={(e) => handleUpDate(e)}>
            <div>
              <label className="font-light text-white text-xl">Nombre</label>
              <input
                type="text"
                name="name"
                value={input.name}
                // placeholder={upDatePet.name}
                onChange={(e) => handleChange(e)}
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
              />
              {errors.name && <p className="font-bold text-red-700 text-center p-2">{errors.name}</p>}
            
              <label className="font-light text-white text-xl">Imagen</label>
              <input
                type="text"
                name="image"
                value={input.image}
                // placeholder={upDatePet.image}
                onChange={(e) => handleChange(e)}
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
              />
              {errors.image && <p className="font-bold text-red-700 text-center p-2">{errors.image}</p>}
            
              <label className="font-light text-white text-xl">Tipo</label>
              <input
                type="text"
                name="type"
                value={input.type}
                // placeholder={upDatePet.type}
                onChange={(e) => handleChange(e)}
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
              />
              {errors.type && <p className="font-bold text-red-700 text-center p-2">{errors.type}</p>}
            
              <label className="font-light text-white text-xl">Descripción</label>
              <textarea
                type="text"
                name="description"
                value={input.description}
                // placeholder={upDatePet.description}
                onChange={(e) => handleChange(e)}
                className="w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent resize-none"
              />
              {errors.description && <p className="font-bold text-red-700 text-center p-2">{errors.description}</p>}
            
              <label className="font-light text-white text-xl">Tamaño</label>
              <input
                type="text"
                name="size"
                value={input.size}
                // placeholder={upDatePet.size}
                onChange={(e) => handleChange(e)}
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
              />
              {errors.size && <p className="font-bold text-red-700 text-center p-2">{errors.size}</p>}
           
              <label className="font-light text-white text-xl">Edad</label>
              <input
                type="text"
                name="age"
                value={input.age}
                // placeholder={upDatePet.age}
                onChange={(e) => handleChange(e)}
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
              />
              {errors.age && <p className="font-bold text-red-700 text-center p-2">{errors.age}</p>}
            
              <label className="font-light text-white text-xl">Vacunado</label>
              <input
                type="text"
                name="vaccination"
                value={input.vaccination}
                // placeholder={upDatePet.vaccination}
                onChange={(e) => handleChange(e)}
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
              />
              {errors.vaccination && <p className="font-bold text-red-700 text-center p-2">{errors.vaccination}</p>}
            
              <label className="font-light text-white text-xl">Castrado</label>
              <input
                type="text"
                name="castrated"
                value={input.castrated}
                // placeholder={upDatePet.castrated}
                onChange={(e) => handleChange(e)}
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
              />
              {errors.castrated && <p className="font-bold text-red-700 text-center p-2">{errors.castrated}</p>}
            
              <label className="font-light text-white text-xl">Ubicacion</label>
              <input
                type="text"
                name="place"
                value={input.place}
                // placeholder={upDatePet.place}
                onChange={(e) => handleChange(e)}
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
              />
              {errors.place && <p className="font-bold text-red-700 text-center p-2">{errors.place}</p>}
            </div>

            <button type="submit" className="py-2 px-4 w-full bg-yellow-900 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg my-4">Actualizar</button>
          </form>
          {/*  <div>
                <Link>

                </Link>
            </div> */}
        </div>
      </div>
    
  );
}
