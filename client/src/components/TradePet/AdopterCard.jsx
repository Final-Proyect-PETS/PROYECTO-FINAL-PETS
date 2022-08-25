import ubicacion from "../../assets/images/ubicacion.png";
import { Link } from "react-router-dom";

import { React } from "react";

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
  place,
}) {
  //const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getUserDetail(_id));
  //   return () => dispatch(clearState());
  // }, [dispatch, _id]);  //LO COMENTE ANOCHE t borre dispatch de import

  const pettit = pets;

  return (
    <div
      id={_id}
      className="rounded overflow-hidden border border-[#B99782] w-full bg-white my-2 md:mx-0 lg:mx-0"
    >
      <div className="w-full flex justify-between p-3 border-b items-center bg-[#B99782]">
        <div className="flex items-center">
          <div className="rounded-full h-8 w-8 flex items-center justify-center overflow-hidden mr-2">
            <img src={image} alt="profilepic" />
          </div>
          <span className="ml-2 font-bold text-xs">
            {`${first_name} ${last_name} - otra card`}
          </span>
          <span className="ml-2 font-bold text-xs">({username})</span>
        </div>
        <div className="flex items-center">
          <div className="text-sm flex">
            <img src={ubicacion} alt="ubicacion" width="16px" />
            <span className="font-medium text-xs mx-3">{place}</span>
          </div>
          
        </div>
      </div>

      <div className=" py-3 flex">
        {/* <img
          className="border-solid border-2 border-[#B99782]  w-96 bg-cover rounded"
          src={image}
          alt="ProfilePicture"
        /> */}
        <div className=" bg-gray-200 flex w-52 flex-col content-around gap-9 justify-center items-center">
          <div className="text-sm flex">
            <div className="grid grid-cols-2 place-content-center">
              <div className="flex items-center">
                <div className="rounded-full h-8 w-8 flex items-center justify-center overflow-hidden mr-2">
                  <img src={image} alt="profilepic" />
                </div>
                <span className="ml-2 font-bold text-xs">
                  {`${first_name} ${last_name} - otra card`}
                </span>
                <span className="ml-2 font-bold text-xs">({username})</span>
              </div>
              <div className="flex items-center">
                <div className="text-sm flex">
                  <img src={ubicacion} alt="ubicacion" width="16px" />
                  <span className="font-medium text-xs mx-3">{place}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
