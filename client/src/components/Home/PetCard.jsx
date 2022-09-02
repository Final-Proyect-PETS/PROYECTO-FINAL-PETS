import React from "react";
import likeim from "../../assets/images/like.png";
import ubicacion from "../../assets/images/ubicacion.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { patchLikes, likePet } from "../../redux/Actions";
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import { Toast, Tooltip } from "flowbite-react";
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
  const allUsers = useSelector((state) => state.allUsers);
  const [buttonLike, setButtonLike] = useState({
    a: false,
    number: likes?.length,
  });
  function likeHandler(e) {
    e.preventDefault();

    let payload = {
      petId: idPet, //el likeado
      userId: loggedUser._id, //el que da like
      ownerId: idUser, //al que le llega el like
      // likesPets: likesPets, //array DESCOMMENTE SI SE ROMPE NORIFICACION
    };
    if (buttonLike.a === false) {
      setButtonLike({ a: true, number: buttonLike.number + 1 });
    }
    if (buttonLike.a === true) {
      setButtonLike({ a: false, number: buttonLike.number - 1 });
    }
    let nameLike = {
      id: idPet,
      likeName: loggedUser.username,
    };

    dispatch(patchLikes(payload));

    dispatch(likePet(nameLike));
  }
  //hover quien te gusta ------ POSIBLE FALLO DE RENDIMIENTO-

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
                <span className="font-medium text-xs mx-3">
                  {place?.length <= 25 ? place : `${place?.slice(0, 25)}...`}
                </span>
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
                  {/* aACA VA EL NUMERITO DEEEE LIKES */}
                  {buttonLike.number}
                  {/* aACA VA EL NUMERITO DE LIKES */}
                </h1>
                <div className="rounded-full h-8 w-8 flex items-center justify-center overflow-hidden mr-2">
                  <Tooltip
                    trigger="hover"
                    animation="duration-1000"
                    content={
                      likes?.length > 1
                        ? `A   ${likes.slice(0, 2).reverse()} y ${
                            likes.length
                          } mas les gusta esto...`
                        : likes?.length === 1
                        ? `A ${likes[0]} le gusta esto`
                        : "Dame me gusta"
                    }
                    placement="bottom"
                  >
                    {" "}
                    <button onClick={(e) => likeHandler(e)}>
                      <img src={likeim} alt="<3" />
                    </button>
                  </Tooltip>
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
