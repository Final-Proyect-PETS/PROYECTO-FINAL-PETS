import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./userDetailStyle.css";
import { Link } from "react-router-dom";

export default function UserDetail() {

  const userDetail = useSelector((state) => state.userDetail);

  return (
    <>
      <NavBar />
      <>
        <div
          // id={idUser}
          className="rounded overflow-hidden border border-[#B99782] w-full bg-white my-12 md:mx-0 lg:mx-0"
        >
          {" "}
          <div className="w-full flex justify-between p-3 border-b items-center bg-[#B99782]">
            <div className="flex items-center">
              <div className="rounded-full h-8 w-8 flex items-center justify-center overflow-hidden mr-2">
                <img src={userDetail.image} alt="imageuser"/>
              </div>
              <div>
                <Link  to="/UpDataUser">
                  <button>🖍</button>
                </Link>
              </div>
              {/* <span class="text-2xl font-bold"></span> */}
              <span className="text-2xl font-bold">
                {" "}
                {userDetail.first_name + " " + userDetail.last_name}
              </span>
            </div>
            <div className="flex items-center">
              <div className="text-sm flex">
                <span className="text-2xl font-bold">About Me:</span>
                <span className="font-medium text-xs mx-3">{userDetail.about}</span>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between p-3 border-b items-center bg-[#B99782]">
            <div className="flex items-center">
              <div className="text-sm flex">
                <span className="text-2xl font-bold">
                  Email: {userDetail.email} -
                </span>
              </div>
              <div className="text-sm flex">
                <span className="text-2xl font-bold">
                  Tel:{userDetail.telephone}
                </span>
              </div>
            </div>
          </div>
          <div className="py-3 flex">
            {/* <img class="w-96 bg-cover rounded" src={imagePet} alt="imagepet" /> */}
            <div className="bg-gray-200 flex w-52 flex-col content-around gap-9 justify-center items-center">
              <div className="flex">
                <span className="text-2xl font-bold"> PET 1</span>
              </div>
              <div className="text-sm flex">
                <span className="font-bold text-lg text-gray-700">
                  ←AQUI IRA MI PROXIMA MASCOTA→
                </span>
              </div>
              <div className="text-sm flex">
                <span className="font-bold text-lg text-gray-700">ADOPTAR</span>
              </div>
            </div>
          </div>
        </div>
      </>
      ;
      {/* <div class="rounded overflow-hidden border w-60 bg-white mx-3 md:mx-0 lg:mx-0">
        <div class="w-full flex justify-between p-3">
          <span class="px-2 hover:bg-gray-300 cursor-pointer rounded">
            <i class="fas fa-ellipsis-h pt-2 text-lg"></i>
          </span>
        </div>
        <img class="w-12 bg-cover" src={userDetail.image} alt="imageUser" />
        <div class="px-3 pb-2">
          <div class="pt-2">
            <i class="far fa-heart cursor-pointer"></i>
            <span class="text-sm text-gray-400 font-medium">
              Name: {userDetail.first_name + " " + userDetail.last_name}{" "}
            </span>
          </div>
          <div class="pt-1">
            <div class="mb-2 text-sm">
              <span class="font-medium mr-2">Email: {userDetail.email}</span>
            </div>
          </div>
          <div class="text-sm mb-2 text-gray-400 cursor-pointer font-medium">
            About:
            {userDetail.about}
          </div>
          <div class="mb-2">
            <div class="mb-2 text-sm">
              <span class="font-medium mr-2">Tel:{userDetail.telephone}</span>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
