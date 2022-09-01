import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getPetDetail, clearStatePet } from "../../redux/Actions";
import NavBar from "../NavBar/NavBar";
import { Carousel } from "flowbite-react";
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

export default function PetDetail() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const petDetail = useSelector((state) => state.petDetail);
  const loggedUser = useSelector((state) => state.userProfile);

  useEffect(() => {
    dispatch(clearStatePet());
    dispatch(getPetDetail(id));
  }, [dispatch, id]);

  return Object.keys(petDetail).length ? (
    <div>
      <NavBar />
      <h1 className="flex justify-center font-semibold text-3xl mt-3">
        Detalles 🐶
      </h1>

      <div className="flex w-2/3 my-10 ml-60 flex-row border-2 border-black">
        <div>
          <FacebookShareButton
            url={`https://www.happytails.com/pet/${petDetail._id}`}
            quote={"Adoptame"}
            hashtag={"#happytails"}
          >
            <FacebookIcon size={40} />
          </FacebookShareButton>
        </div>
        <div>
          <EmailShareButton
            subject="Quiero que me adoptes"
            body={`Adoptame en https://www.happytails.com/pet/${petDetail._id}`}
          >
            <EmailIcon size={40} />
          </EmailShareButton>
        </div>
        <div className="flex flex-col w-1/2 m-3 items-center gap-3">
          {loggedUser._id === petDetail.user._id ? (
            <Link to="/updatepet">
              <button className="py-2 px-4 my-4 w-full bg-yellow-900 hover:bg-yellow-600 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                📝Editar mascota
              </button>
            </Link>
          ) : (
            <></>
          )}
          <div className="h-56 w-72 bg-yellow-900 rounded ">
            <Carousel className="rounded">
              <img
                src={petDetail?.image}
                alt="imagen mascota"
                // width="500px"
                className="w-96"
              />
              {petDetail?.imagePool?.map((image) => (
                <img alt={image} src={image} className="w-96 rounded" />
              ))}
            </Carousel>
          </div>
          <h2 className="font-semibold">
            Descripción: {petDetail.description}
          </h2>
        </div>

        <div className="flex flex-col w-1/2">
          <div className="flex flex-col items-center w-full h-1/3 justify-center">
            <h2 className="font-semibold text-2xl">{petDetail.name}</h2>
            <h2 className="font-semibold">
              Dueño:{" "}
              {petDetail.user.first_name + " " + petDetail.user.last_name}
            </h2>
            <h3 className="font-semibold">
              {`Vivo en ${petDetail.place}`}
            </h3>
          </div>
          <div className="flex flex-wrap w-full h-1/2 justify-center items-center border-y border-black">
            <div className="w-1/2 h-1/2 flex justify-center items-center border-b">
              <h3 className="font-semibold">
                Tamaño:{" "}
                {petDetail.size === "big"
                  ? "Grande"
                  : petDetail.size === "medium"
                  ? "Mediano"
                  : "Chico"}
              </h3>
            </div>
            <div className="w-1/2 h-1/2 flex justify-center items-center border-b">
              <h3 className="font-semibold">
                ¿Está vacunado?:{" "}
                {petDetail.vaccination === "yes"
                  ? "Sí"
                  : petDetail.vaccination === "no"
                  ? "No"
                  : "No se sabe"}
              </h3>
            </div>
            <h3 className="absolute flex justify-center items-center font-semibold">
              Género: {petDetail.gender === "female" ? "Hembra" : "Macho"}
            </h3>
            <div className="w-1/2 h-1/2 flex justify-center items-center border-t">
              <h3 className="font-semibold">Edad: {petDetail.age} años</h3>
            </div>
            <div className="w-1/2 h-1/2 flex justify-center items-center border-t">
              <h3 className="font-semibold mr-10">
                Castrado: {petDetail.castrated === true ? "Si" : "No"}
              </h3>
            </div>
          </div>
          <div className="flex justify-center items-center h-1/5">
            {loggedUser._id !== petDetail.user._id ? (
              petDetail.isAdopted === true ? (
                <div className="flex space-between">
                  <Link to={`/users/${petDetail.user._id}`}>
                    <button className="py-2 px-4 my-4 mr-2 w-full bg-yellow-900 hover:bg-yellow-700 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                      PERFIL DEL DUEÑO
                    </button>
                  </Link>
                  {/* { <Link to={`/adopt/${petDetail._id}`}>
                  <button className="py-2 px-4 my-4 w-full ml-2 bg-yellow-900 hover:bg-green-700 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                    LO QUIERO!
                  </button>
                </Link> } */}
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <h2 className="font-semibold text mt-5">
                    {" "}
                    "ESTA MASCOTA ESTA BUSCANDO NUEVO DUEÑO!"
                  </h2>
                  <div className="flex space-between">
                    <Link to={`/users/${petDetail.user._id}`}>
                      <button className="py-2 px-4 my-2 mb-5 mr-2 w-full bg-yellow-900 hover:bg-yellow-700 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                        PERFIL DEL DUEÑO
                      </button>
                    </Link>
                    <Link to={`/adopt/${petDetail._id}`}>
                      <button className="py-2 px-4 my-2 mb-5  w-full ml-2 bg-green-900 hover:bg-green-600 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                        LO QUIERO!
                      </button>
                    </Link>
                  </div>
                </div>
              )
            ) : (
              <>
                <h2 className="font-semibold text">
                  ESTA MASCOTA TE PERTENECE! Quieres
                  {petDetail.isAdopted === false
                    ? " quitarla de adopción?"
                    : " ponerla en adopción?"}
                </h2>

                <Link to={`/users/${petDetail.user._id}`}>
                  <button className="py-2 px-3 my-4 mr-8  w-full bg-yellow-900 hover:bg-green-700 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                    📝 CAMBIAR ESTADO
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div role="status">
      <svg
        className="inline mr-2 w-10 h-10 m-12 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-700"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  );
}
