import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import { useParams } from "react-router-dom";
import { getPetDetail } from "../../redux/Actions";
import { Link } from "react-router-dom";

export default function PetDetail() {
  let { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPetDetail(id));
  }, [dispatch, id]);

  const petDetail = useSelector((state) => state.petDetail);

  console.log(petDetail);

  return (
    <div>
      <NavBar />
      <h1 className="flex justify-center font-semibold text-3xl">
        Detalles 🐶
      </h1>
      <div className="flex w-2/3 flex-row border-2 border-black">
        <div className="flex flex-col w-1/2 m-3 items-center gap-3">
          {/* faltaria agregar el pool de images q viene como array */}
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
              <button class="bg-yellow-500 hover:bg-green-700 text-white font-bold py-5 px-4 border border-yellow-700 rounded">
                ADOPTAR
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
