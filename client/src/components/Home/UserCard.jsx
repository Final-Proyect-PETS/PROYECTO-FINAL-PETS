import ubicacion from "../../assets/images/ubicacion.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, React } from "react";
import { getUserDetail, clearState } from "../../redux/Actions/index";


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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDetail(_id));
    return () => dispatch(clearState());
  }, [dispatch, _id]);

  const pettit = pets;

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
            <span className="ml-2 font-bold text-xs">
              {`${first_name} ${last_name} - `}
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
      </Link>
      <div className=" py-3 flex">
        <img
          className="border-solid border-2 border-[#B99782]  w-96 bg-cover rounded"
          src={image}
          alt="ProfilePicture"
        />
        <div className=" bg-gray-200 flex w-52 flex-col content-around gap-9 justify-center items-center">
          {pettit?.length ? (
            <div className="flex">
              <h3 className="text-2xl font-bold">MIS MASCOTAS</h3>
            </div>
          ) : (
            <div className="flex">
              <span className="text-2xl font-bold">BUSCO PETS</span>
            </div>
          )}
          <div className="text-sm flex">
            <div className="grid grid-cols-2 place-content-center">
              {pettit?.length
                ? pettit?.map((pet) => (
                    <div key={pet._id} className="m-1">
                      <Link key={pet._id} to={`/pet/${pet._id}`}>
                        <img
                          key={pet._id}
                          className="w-96 h-24 bg-cover border-solid border-2 border-[#B99782] rounded-full "
                          src={pet.image}
                          alt="ProfilePicture"
                        />
                      </Link>
                    </div>
                  ))
                : ""}
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
