import React from "react";
import ubicacion from "../../assets/images/ubicacion.png";
import { Link } from "react-router-dom";

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
                <span className="font-medium text-xs mx-3">{place}</span>
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
                  Tamaño: {size === "big" ? "Grande" : size === "medium" ? "Mediano" : "Chico"}
                </span>
              </div>
              <div>
                <span className="text-2xl font-bold text-white">{gender === "female" ? "Hembra" : "Macho"}</span>
              </div>
            </div>
          </div>
        </Link>
      </div> 
    </> 
    
  );
}
