import ubicacion from "../../assets/images/ubicacion.png";
import { Link } from "react-router-dom";

import { React } from "react";

export default function AdopterCard({
  _id,
  first_name,
  last_name,
  username,
  image,
  email,
  about,
  telephone,
  pets,
  place,
}) {
  function checkboxHandler(e) {
    console.log(e.target.value, "CHECKBOXaDOPTER");
  }
  return (
    <div
      id={_id}
      className="rounded overflow-hidden border border-[#B99782] w-full bg-white my-2 md:mx-0 lg:mx-0"
    >
      <div className="w-full flex justify-between p-3 border-b items-center bg-[#B99782]">
        <div className="flex items-center">
          <div className="rounded-full h-8 w-8 flex items-center justify-center overflow-hidden ">
            <img src={image} alt="profilepic" />
          </div>
          <span className="ml-2 font-bold text-xs">
            {`${first_name} ${last_name}`}
          </span>
          <span className="ml-2 font-bold text-xs">({username})</span>
        </div>
        <div className="flex items-center">
          <div className="text-sm flex">
            <img src={ubicacion} alt="ubicacion" width="16px" />
            <span className="font-medium text-xs mx-3">{place?place:`"Sin ubicación registrada"`}</span>
          </div>
        </div>
      </div>

<div className="flex justify-center">
      <span className="ml-2 font-bold text-xs">📲Tel: {telephone?`${telephone}`:`"Sin Numero Registrado"`}</span>
     
       <span className="ml-2 font-bold text-xs">📧E-mail: {email}</span>
       </div>
    </div>
  );
}
