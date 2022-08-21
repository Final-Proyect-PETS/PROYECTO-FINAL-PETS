import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserDetail } from "../../redux/Actions";
import Card from "../Home/Card";
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
        <div
          // id={idUser}
          className="rounded overflow-hidden border border-[#B99782] w-full bg-white my-12 md:mx-0 lg:mx-0"
        >
          <div className="w-full flex justify-between p-3 border-b items-center bg-[#B99782]">
            <div className="flex items-center">
              <div className="rounded-full h-8 w-8 flex items-center justify-center overflow-hidden mr-2">
                <img src={userDetail.image} alt="imageuser" />
              </div>
              <div>
                <Link to="/updateuser">
                  <button>🖍</button>
                </Link>
              </div>
              {/* <span class="text-2xl font-bold"></span> */}
              <span className="text-2xl font-bold">
                {userDetail.first_name + " " + userDetail.last_name}
              </span>
            </div>
            <div className="flex items-center">
              <div className="text-sm flex">
                <span className="text-2xl font-bold">About Me:</span>
                <span className="font-medium text-xs mx-3">
                  {userDetail.about}
                </span>
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


       
         
              <div className="ownedpetsrender">
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
                  <h1>NADA QUE MOSTRAR</h1>
                )}
              </div>

              <div className="text-sm flex">
                <span className="font-bold text-lg text-gray-700">
                  ←AQUI IRA MI PROXIMA MASCOTA→
                </span>
              </div>
            </div>
      
      </>
      ;
    </>
  );
}
