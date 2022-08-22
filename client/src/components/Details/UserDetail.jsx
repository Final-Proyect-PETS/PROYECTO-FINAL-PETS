import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserDetail } from "../../redux/Actions";
import NavBar from "../NavBar/NavBar";
import OwnedPet from "./OwnedPet";
import "./userDetailStyle.css";

export default function UserDetail() {
  let { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetail(id));
  }, [dispatch, id]);

  const userDetail = useSelector((state) => state.userDetail);

  return (
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
    </>
  );
}
