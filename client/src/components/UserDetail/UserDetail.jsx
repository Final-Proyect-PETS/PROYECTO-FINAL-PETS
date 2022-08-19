import { useDispatch, useSelector } from "react-redux";
import { useEffect, React } from "react";
import { clearState, getUserDetail } from "../../redux/Actions/index";
import NavBar from "../NavBar/NavBar";

export default function UserDetail() {
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userDetail);
  console.log(userDetail, "proproporpropro");
  console.log(userDetail.first_name, "FIRST NAME");

  return (
    <>
      <NavBar />
      <div class="rounded overflow-hidden border w-60 bg-white mx-3 md:mx-0 lg:mx-0">
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
      </div>
    </>
  );
}
