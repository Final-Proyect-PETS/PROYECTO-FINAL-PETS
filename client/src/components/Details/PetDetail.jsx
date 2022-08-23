import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import { useParams, Link } from "react-router-dom";
import { getPetDetail, clearStatePet } from "../../redux/Actions";

export default function PetDetail() {


  let { id } = useParams()
  const dispatch = useDispatch()
  const petDetail = useSelector((state) => state.petDetail);

  useEffect(() => {
    dispatch(clearStatePet())
    dispatch(getPetDetail(id));
  }, [dispatch, id]);

  return (
    Object.keys(petDetail).length ? (
    <div>
      <NavBar />
      <h1 className="flex justify-center font-semibold text-3xl mt-3">Detalles 🐶</h1>

      <div className="flex w-2/3 my-10 ml-60 flex-row border-2 border-black">
        <div className="flex flex-col w-1/2 m-3 items-center gap-3">
          <Link to="/updatepet">
            <button className="py-2 px-4 my-4 w-full bg-yellow-900 hover:bg-yellow-600 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">Editar mascota</button>
          </Link>{/* faltaria agregar el pool de images q viene como array */}
          <img
            src={petDetail.image}
            alt="imagen mascota"
            // width="500px"
            className="w-96"
          />
          <h3 className="text-xs">Descripcion: {petDetail.description}</h3>
        </div>
        <div className="flex flex-col w-1/2">
          <div className="flex flex-col items-center w-full h-1/3 justify-center">
            <h2 className="font-semibold text-2xl">{petDetail.name}</h2>
            <h2 className="font-semibold">En</h2>
            <h3 className="font-semibold">{petDetail.place}</h3>
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
            <h1 className="absolute flex justify-center items-center">Datos</h1>
            <div className="w-1/2 h-1/2 flex justify-center items-center border-t">
              <h3 className="font-semibold">Edad: {petDetail.age} años</h3>
            </div>
            <div className="w-1/2 h-1/2 flex justify-center items-center border-t">
              <h3 className="font-semibold">
                Castrado: {petDetail.castrated === true ? "Si" : "No"}
              </h3>
            </div>
          </div>
          <div className="flex justify-center items-center h-1/5">
            <Link to="/adopt/">
              <button className="py-2 px-4 my-4 w-full bg-yellow-900 hover:bg-green-700 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                ADOPTAR
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>) : (
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
    )
  )
}