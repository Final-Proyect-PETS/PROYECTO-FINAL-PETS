import ubicacion from "../../assets/images/ubicacion.png";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, React } from "react";
import { getUserDetail, clearState } from "../../redux/Actions/index";
import OwnedPet from "../Details/OwnedPet";
export default function UserCard({
  _id,
  first_name,
  last_name,
  username,
  image,
  email,
  about,
  telephone,
  pets,
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDetail(_id));
    return () => dispatch(clearState());
  }, [dispatch, _id]);
  //   const userDetail = useSelector((state) => state.userDetail);
  // console.log(userDetail)

  const pettit = pets;
  console.log(pettit, "petppeptepe");

  return (
    <div
      id={_id}
      className="rounded overflow-hidden border border-[#B99782] w-full bg-white my-12 md:mx-0 lg:mx-0"
    >
      <Link to={"/users/" + _id}>
        <div className="w-full flex justify-between p-3 border-b items-center bg-[#B99782]">
          <div className="flex items-center">
            <div className="rounded-full h-8 w-8 flex items-center justify-center overflow-hidden mr-2">
              <img src={image} alt="profilepic" />
            </div>
            <span className="text-2xl font-bold">
              {`${first_name} ${last_name} - `}
            </span>
            <span className=" text-2xl font-bold">({username})</span>
          </div>
          <div className="flex items-center">
            <div className="text-sm flex"></div>
          </div>
        </div>
      </Link>

      <div className="bg-gray-200 flex py-3 flex-col content-around gap-9 justify-center items-center">
        <div className="flex">
          <span className="text-2xl font-bold">{"MIS MASCOTAS"}</span>
        </div>
        <div className="flex">
          {pettit?.length
            ? pettit?.map((pet) => (
                <div className="rounded-full h-12 w-12 flex items-center justify-center overflow-hidden mr-2">
                  <img src={pet.image} alt="profilepic" />
                </div>
              ))
            : "QUIERO ADOPTAR!"}
        </div>
      </div>
    </div>
  );
}
