
import React from "react";
import ubicacion from "../../assets/images/ubicacion.png"

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
   /*  return () => dispatch(clearState()); */
  }, [dispatch, idUser]);
  
  return (
    <>
      <div
        id={idUser}
        class="rounded overflow-hidden border w-60 bg-white mx-3 md:mx-0 lg:mx-0"
      >
        <div class="w-full flex justify-between p-3">
          <div class="flex">
            <Link to={"/users/" + idUser}>
              <div class="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
                <img src={imageUser} alt="profilepic" />
              </div>

              <span class="pt-1 ml-2 font-bold text-sm">
                {first_name} {last_name}
              </span>
            </Link>
          </div>

          <span class="px-2 hover:bg-gray-300 cursor-pointer rounded">
            <i class="fas fa-ellipsis-h pt-2 text-lg"></i>
          </span>
        </div>
        <img class="w-12 bg-cover" src={imagePet} alt="imagepet" />
        <div class="px-3 pb-2">
          <div class="pt-2">
            <i class="far fa-heart cursor-pointer"></i>
            <span class="text-sm text-gray-400 font-medium">{namePet}</span>
          </div>
          <div class="pt-1">
            <div class="mb-2 text-sm">
              <span class="font-medium mr-2">{place}</span> Lord of the Rings is
              my favorite film-series. One day I'll make my way to New Zealand
              to visit the Hobbiton set!
            </div>
          </div>
          <div class="text-sm mb-2 text-gray-400 cursor-pointer font-medium">
            View all 14 comments
          </div>
          <div class="mb-2">
            <div class="mb-2 text-sm">
              <span class="font-medium mr-2">{size}</span> Dude! How cool! I
              went to New Zealand last summer and had a blast taking the tour!
              So much to see! Make sure you bring a good camera when you go!
            </div>
          </div>
        </div>
      </div>
    </>
  );

  {
    /* <div id={idUser} class="">
                <div>
                    <h2>{first_name} {last_name}</h2>
                </div>
                <div>
                    <img src={imageUser} alt="imageUser" />
                </div>
                <div>
                    <h3>{namePet}</h3>
                </div>
                <div>
                    <img src={imagePet} alt="imagePet" />
                    <h3>{place}</h3>
                    <h3>{size}</h3>
                </div>

<<<<<<< HEAD
            </div> */
  }
  {
    /* ---------------------------------------------------- */
  }
}
//=======
      
//----------------------------------------------------

{/* <div id={idUser} class="rounded overflow-hidden border border-[#B99782] w-full bg-white my-12 md:mx-0 lg:mx-0">
    <div class="w-full flex justify-between p-3 border-b items-center bg-[#B99782]">
      <div class="flex items-center">
        <div class="rounded-full h-8 w-8 flex items-center justify-center overflow-hidden mr-2">
          <img src={imageUser}alt="profilepic" />
        </div>
        <span class="ml-2 font-bold text-xs">{first_name} {last_name}</span>
      </div>
      <div class="flex items-center">
        <div class="text-sm flex">
          <img src={ubicacion} alt="ubicacion" width="16px"/>
          <span class="font-medium text-xs mx-3">{place}</span>
        </div>
      </div>
    </div>
    <div class="py-3 flex">
    <img class="w-96 bg-cover rounded" src={imagePet} alt='imagepet'/>
      <div class="bg-gray-200 flex w-52 flex-col content-around gap-9 justify-center items-center">
        <div class="flex">
          <span class="text-2xl font-bold">{namePet}</span>
        </div>
        <div class="text-sm flex">
          <span class="font-bold text-lg text-gray-700">Size: {size}</span>
        </div>
      </div>
    </div>
  </div> */}
        
    
//>>>>>>> 77d3e941e9d12bc13247999ba51679c0ae1e2baf
