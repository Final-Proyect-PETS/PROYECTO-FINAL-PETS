import React from "react";
import likeim from "../../assets/images/like.png";
import ubicacion from "../../assets/images/ubicacion.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { patchLikes } from "../../redux/Actions";
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import { Toast } from "flowbite-react";
import { ToastContext } from "flowbite-react/lib/esm/components/Toast/ToastContext";

export default function Card({
  idUser,
  first_name,
  last_name,
  imageUser,
  idPet,
  namePet,
  imagePet,
  place,
  size,
  gender,
  likes,
}) {
  //likes***----de aca
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.userProfile);

  function likeHandler(e) {
    e.preventDefault();

    let payload = {
      petId: idPet,//el likeado
      userId: loggedUser._id,//el que da like
      ownerId: idUser,//al que le llega el like
      likes: likes,//array
    };
    dispatch(patchLikes(payload));
  }
  //likes--hasta aca , casi te vas

    return (
    <>
      <div
        id={idUser}
        className="grid col-start-3 rounded overflow-hidden border border-[#B99782] w-full bg-white my-12 md:mx-0 lg:mx-0"
      >
        <Link to={"/users/" + idUser}>
          <div className="flex justify-between p-3 border-b items-center bg-yellow-500">
            <div className="flex items-center">
              <div className="rounded-full h-8 w-8 flex items-center justify-center overflow-hidden mr-2">
                <img src={imageUser} alt="profilepic" />
              </div>
              <span className="ml-2 font-bold text-xs text-white">
                {first_name} {last_name}
              </span>
            </div>
            <div className="flex items-center">
              <div className="text-sm flex">
                <img src={ubicacion} alt="ubicacion" width="16px" />
                <span className="font-medium text-xs mx-3">{place?.length<=25?place:`${place?.slice(0,25)}...`}</span>
              </div>
            </div>
          </div>
        </Link>
        <Link to={"/pet/" + idPet}>
          <div className="py-3 flex">
            <img
              className="w-96 bg-cover rounded"
              src={imagePet}
              alt="imagepet"
            />
            <div className="bg-yellow-900 flex w-52 flex-col content-around gap-9 justify-center items-center">
              <div className="flex">
                <span className="text-2xl font-bold text-white">{namePet}</span>
              </div>
              <div className="text-sm flex">
                <span className="font-bold text-lg text-white">
                  Tamaño:{" "}
                  {size === "big"
                    ? "Grande"
                    : size === "medium"
                    ? "Mediano"
                    : "Chico"}
                </span>
              </div>
              <div>
                <span className="text-2xl font-bold text-white">
                  {gender === "female" ? "Hembra" : "Macho"}
                </span>
              </div>
              <div className="flex">
                <h1 className="text-white font-bold text-2x1">
     {/* aACA VA EL NUMERITO DEEEE LIKES */}{likes?.length}{/* aACA VA EL NUMERITO DE LIKES */}
                </h1>
                <div className="rounded-full h-8 w-8 flex items-center justify-center overflow-hidden mr-2">
                  <button onClick={(e) => likeHandler(e)}>
                    <img src={likeim} alt="" />
                  </button>
                </div>
      
                <div className="rounded-full h-8 w-8 flex items-center justify-center overflow-hidden mr-2">
                  <FacebookShareButton
                    url={`https://www.happytails.com/pet/${idPet}`}
                    quote={"Adoptame"}
                    hashtag={"#happytails"}
                  >
                    <FacebookIcon size={40} />
                  </FacebookShareButton>
                </div>
                <div className="rounded-full h-8 w-8 flex items-center justify-center overflow-hidden mr-2">
                  <EmailShareButton
                    subject="Quiero que me adoptes"
                    body={`Adoptame en https://www.happytails.com/pet/${idPet}`}
                  >
                    <EmailIcon size={40} />
                  </EmailShareButton>
                </div>
             
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
