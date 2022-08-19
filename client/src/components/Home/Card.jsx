import ubicacion from "../../assets/images/ubicacion.png";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, React } from "react";
import { clearState, getUserDetail } from "../../redux/Actions/index";

export default function Card({
  idUser,
  first_name,
  last_name,
  imageUser,
  namePet,
  imagePet,
  place,
  size,
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDetail(idUser));
    //  return () => dispatch(clearState()); 
  }, [dispatch, idUser]);
  

  return (
    <>
      <div
        id={idUser}
        class="rounded overflow-hidden border border-[#B99782] w-full bg-white my-12 md:mx-0 lg:mx-0"
      >
        <div class="w-full flex justify-between p-3 border-b items-center bg-[#B99782]">
          <div class="flex items-center">
            <Link to={"/users/" + idUser}>
              <div class="rounded-full h-8 w-8 flex items-center justify-center overflow-hidden mr-2">
                <img src={imageUser} alt="profilepic" />
              </div>
              <span class="ml-2 font-bold text-xs">
                {first_name} {last_name}
              </span>
            </Link>
          </div>
          <div class="flex items-center">
            <div class="text-sm flex">
              <img src={ubicacion} alt="ubicacion" width="16px" />
              <span class="font-medium text-xs mx-3">{place}</span>
            </div>
          </div>
        </div>
        <div class="py-3 flex">
          <img class="w-96 bg-cover rounded" src={imagePet} alt="imagepet" />
          <div class="bg-gray-200 flex w-52 flex-col content-around gap-9 justify-center items-center">
            <div class="flex">
              <span class="text-2xl font-bold">{namePet}</span>
            </div>
            <div class="text-sm flex">
              <span class="font-bold text-lg text-gray-700">Size: {size}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
