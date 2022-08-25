import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function InAdoptionCard({
  idUser,
  idPet,
  namePet,
  imagePet,
  isAdopted,
  pets,
}) {
  

 
  
 
  return (
    <>
     
      <div className="flex items-center py-2 px-5 ">
        <div className=" flex border-2 border-yellow-700 rounded">
          <div className=" border-yellow-900 border-r-2  flex justify-between p-3 border items-center rounded bg-gray-300">
            <div className=" column items-center mb-4 mr-4 ml-4 ">
              <div className="flex justify-center">
                <span className="text-2xl font-bold ">{namePet}</span>
              </div>
             
            </div>
          </div>

          <img className="w-60 h-40 bg-cover " src={imagePet} alt="imagepet" />
        </div>
      </div>
    </>
  );
}
