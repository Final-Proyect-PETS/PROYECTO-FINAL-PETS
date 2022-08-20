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
}) {

  const dispatch = useDispatch();



  /*   useEffect(() => {

    dispatch(getUserDetail(idUser));
  }, [dispatch, idUser]);

  useEffect(() => {
    dispatch(getPetDetail(idPet));
  }, [dispatch, idPet]); */

  return (
    <>
      <div
        id={idUser}
        className="rounded overflow-hidden border border-[#B99782] w-full bg-white my-12 md:mx-0 lg:mx-0"
      >
        <Link to={"/users/" + idUser}>
          <div className="w-full flex justify-between p-3 border-b items-center bg-[#B99782]">
            <div className="flex items-center">
              <div className="rounded-full h-8 w-8 flex items-center justify-center overflow-hidden mr-2">
                <img src={imageUser} alt="profilepic" />
              </div>
              <span className="ml-2 font-bold text-xs">
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
            <div className="bg-gray-200 flex w-52 flex-col content-around gap-9 justify-center items-center">
              <div className="flex">
                <span className="text-2xl font-bold">{namePet}</span>
              </div>
              <div className="text-sm flex">
                <span className="font-bold text-lg text-gray-700">
                  Size: {size}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
