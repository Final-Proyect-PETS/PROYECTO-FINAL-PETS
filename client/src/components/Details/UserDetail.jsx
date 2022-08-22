import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserDetail, clearState } from "../../redux/Actions";
import Card from "../Home/Card";
import NavBar from "../NavBar/NavBar";
import OwnedPet from "./OwnedPet";
import "./userDetailStyle.css";

export default function UserDetail() {
  let { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearState())
    dispatch(getUserDetail(id));
  }, [dispatch, id]);

  const userDetail = useSelector((state) => state.userDetail);

  return (
    Object.keys(userDetail).length ? (
    <>
      <NavBar />
      <>
        <div className="rounded overflow-hidden border border-[#B99782] w-full bg-white my-12 md:mx-0 lg:mx-0">
          <div className="w-full grid justify-between p-3 border-b items-center  bg-gray-300">
            <div className="flex items-center">
              <img
                src={userDetail.image}
                className="w-96 h-30 bg-cover border-solid border-2 border-[#B99782] rounded-full "
                alt="imageuser"
              />
              <div className="grid m-4">
                <h1 className="text-5xl font-bold">
                  {userDetail.first_name + " " + userDetail.last_name}
                </h1>
                <h3 className="text-2xl ">
                 {`"${userDetail.username}"`}
                </h3>
                <h3 className="text-2xl font-bold">
                  Tel:{userDetail.telephone}
                </h3>
                <h3 className="text-2xl font-bold">
                  Email: {userDetail.email}
                </h3>

                <h3 className="text-2xl ">{userDetail.about}</h3>
                <div>
                <Link to="/petregister">
                  <button className="py-2 mt-5 px-4 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                    Crear nueva mascota
                  </button>
                </Link>
                </div>
              </div>
              <div className="ml-3">
                <Link to="/updateuser">
                  <button  className="py-2 mt-5 px-4 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                    🖍Editar
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full mt-1 border-b  absolute  justify-center items-center bg-gray-100">
          <div className="w-full mt-1 border-b  absolute grid justify-center items-center bg-gray-500">
            <h3 className="text-2xl ">Mis Mascotas</h3>
          </div>
          <div className="grid grid-cols-3 mt-10 place-content-center ">
            {userDetail.pets?.length ? (
              userDetail?.pets.map((pets) => (
                <OwnedPet
                  key={pets._id}
                  idUser={pets.user["_id"]}
                  first_name={pets.user["first_name"]}
                  last_name={pets.user["last_name"]}
                  imageUser={pets.user["image"]}
                  idPet={pets._id}
                  namePet={pets.name}
                  imagePet={pets.image}
                  type={pets.type}
                  place={pets.place}
                  size={pets.size}
                  description={pets.description}
                  age={pets.age}
                  vaccination={pets.vaccination}
                  castrated={pets.castrated}
                  gender={pets.gender}
                ></OwnedPet>
              ))
            ) : (
              <h3 className="text-2xl font-bold">
                No hay mascotas que mostar...
              </h3>
            )}
          </div></div>
        </div>
      </>
      ;
    </>) : (
      <div role="status">
      <svg
        className="inline mr-2 w-10 h-10 m-12 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-700"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>

    )
  );
}
