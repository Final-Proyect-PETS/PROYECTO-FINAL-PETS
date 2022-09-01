import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notificationSwal } from "../utils/notificationSwal.jsx";
import { getUserDetail, patchUsuer, postImage,getUserProfile} from "../redux/Actions/index";
import { useDispatch, useSelector } from "react-redux";
import MapboxAutocomplete from 'react-mapbox-autocomplete';
import { useEffect } from "react";

export default function MissingDataRequired() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const users = useSelector((state) => state.users);
  const [image, setImage] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);

  const [errors, setErrors] = useState({});


  const id = localStorage.getItem("id");

  useEffect(() => {
    dispatch(getUserProfile(id));
  }, [dispatch,id]);

  const upDateUser = useSelector((state) => state.userProfile);

  const [input, setInput] = useState({
    id: upDateUser._id,
    username: upDateUser.username,
    image: upDateUser.image,
    about: upDateUser.about,
    telephone: upDateUser.telephone,
    place: upDateUser.place,
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

  function validateFrom(input) {
    let errors = {};
  
    if (input.username) {
      if (!/^[A-Za-z0-9\s]+$/g.test(input.username)) {
        errors.username = "El nombre de usuario debe tener letras y números!";
      } else if (input.username.length > 20) {
        errors.username =
          "El nombre de usuario no puede tener más de 20 caracteres!";
        } else if(
          users.find((u) => u.username === input.username.toLowerCase())
        ) {
          errors.username = "El usuario ya existe!";
      } else errors.username = "";
    } else errors.username = "El nombre de usuario es requerido!";
  
    return errors;
  }

  function handleUpDate(e) {
    e.preventDefault();
    dispatch(patchUsuer(input)).then(
      notificationSwal(
        "¡Enhorabuena!",
        "Tus datos fueron modificados con éxito (づ￣ 3￣)づ",
        "success",
        "Ok"
      )
    );
    setInput({
      id: upDateUser._id,
      username: upDateUser.username,
      image: upDateUser.image,
      about: upDateUser.about,
      telephone: upDateUser.telephone,
      place: upDateUser.place,
    });
    dispatch(getUserDetail(upDateUser._id));
    navigate(`/users/${upDateUser._id}`, { replace: true });
    //esto es porque en el estado userDetail me quedaba cargada
    //la frase "Datos Actualizados Exitosamente 👍", y preciso que se vuelva a cargar con el usuario para que al clickear el boton
    //para regresar, me tome bien sus datos y no aparezca como undefined.
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

  function _suggestionSelect(result, lat, long, text) {
    console.log(result, lat, long, text);
    setInput({
      ...input, place: result
    })
    console.log(input)
  }
  const mapAccess = {
    mapboxApiAccessToken:
      "pk.eyJ1Ijoiam9uc2VuIiwiYSI6IkR6UU9oMDQifQ.dymRIgqv-UV6oz0-HCFx1w"
  }

  return (
    <div className="flex flex-col w-full mt-15 m-auto  py-8 bg-amber-600 rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
      <div className="self-center mb-6 text-xl font-normal text-gray-600 sm:text-2xl dark:text-white">
        Complete tus Datos para continuar
      </div>
      <div className="mt-8 px-8 max-w-lg self-center">
        <form onSubmit={(e) => handleUpDate(e)}>
          <div>
            <label className="font-light text-white text-xl">
              Nombre de usuario
            </label>
            <input
              type="text"
              name="username"
              placeholder={input.username}
              onChange={(e) => handleChange(e)}
              className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
            />
            {errors.username && (
              <p className="font-bold text-red-700 text-center p-2">
                {errors.username}
              </p>
            )}

            <div>
              <label className="font-light text-white text-xl">
                Imagen de Perfil
              </label>
              <input
                type="file"
                name="image"
                accept=".jpg, .png, .jpeg"
                onChange={(e) => handleImage(e)}
                placeholder="Imagen de perfil"
                className="rounded-lg flex-1 appearance-none w-full py-2 px-4 bg-amber-600  text-white placeholder-white text-sm focus:outline-none focus:border-transparent"
              ></input>
              {loadingImage ? (
                <h3 className="font-light text-white text-xl">
                  Cargando imagen...
                </h3>
              ) : (
                <img src={image || upDateUser.image} alt="" width="300px" />
              )}
            </div>
            <div>
              <label className="font-light text-white text-xl">Ubicación</label>
              <MapboxAutocomplete
                publicKey={mapAccess.mapboxApiAccessToken}
                inputClass="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
                onSuggestionSelect={_suggestionSelect}
                resetSearch={false}
                placeholder={input.place}
              />
            </div>
            <label className="font-light text-white text-xl">Sobre mí</label>
            <textarea
              type="text"
              name="about"
              placeholder={input.about}
              onChange={(e) => handleChange(e)}
              className="w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent resize-none"
            />

            <label className="font-light text-white text-xl">Teléfono</label>
            <input
              type="tel"
              name="telephone"
              placeholder={input.telephone}
              onChange={(e) => handleChange(e)}
              className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
            />
            {
              errors.username ||
              errors.image ||
              errors.about ||
              errors.telephone ? (
              <h3>missing required fields</h3>
            ) : (
              <button
                type="submit"
                className="py-2 px-4 my-4 w-full bg-yellow-900 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              >
                Enviar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}