import { useDispatch, useSelector } from "react-redux";
import { useEffect, React } from "react";
import { clearState, getUserDetail } from "../../redux/Actions/index";
import NavBar from "../NavBar/NavBar";
import styles from "./userDetailStyle.css";

export default function UserDetail() {
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userDetail);
  console.log(userDetail, "proproporpropro");
  console.log(userDetail.first_name, "FIRST NAME");

  return (
    <>
      <NavBar />
      <>
        <div
          // id={idUser}
          class="rounded overflow-hidden border border-[#B99782] w-full bg-white my-12 md:mx-0 lg:mx-0"
        >
          {" "}
          <div class="w-full flex justify-between p-3 border-b items-center bg-[#B99782]">
            <div class="flex items-center">
              <div class="rounded-full h-8 w-8 flex items-center justify-center overflow-hidden mr-2">
                <img src={userDetail.image} />
              </div>
              {/* <span class="text-2xl font-bold"></span> */}
              <span class="text-2xl font-bold">
                {" "}
                {userDetail.first_name + " " + userDetail.last_name}
              </span>
            </div>
            <div class="flex items-center">
              <div class="text-sm flex">
                <span class="text-2xl font-bold">About Me:</span>
                <span class="font-medium text-xs mx-3">{userDetail.about}</span>
              </div>
            </div>
          </div>
          <div class="w-full flex justify-between p-3 border-b items-center bg-[#B99782]">
            <div class="flex items-center">
              <div class="text-sm flex">
                <span class="text-2xl font-bold">
                  Email: {userDetail.email} -
                </span>
              </div>
              <div class="text-sm flex">
                <span class="text-2xl font-bold">
                  Tel:{userDetail.telephone}
                </span>
              </div>
            </div>
          </div>
          <div class="py-3 flex">
            {/* <img class="w-96 bg-cover rounded" src={imagePet} alt="imagepet" /> */}
            <div class="bg-gray-200 flex w-52 flex-col content-around gap-9 justify-center items-center">
              <div class="flex">
                <span class="text-2xl font-bold"> PET 1</span>
              </div>
              <div class="text-sm flex">
                <span class="font-bold text-lg text-gray-700">
                  ←AQUI IRA MI PROXIMA MASCOTA→
                </span>
              </div>
              <div class="text-sm flex">
                <span class="font-bold text-lg text-gray-700">ADOPTAR</span>
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
