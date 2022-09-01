import ubicacion from "../../assets/images/ubicacion.png";
import { Link } from "react-router-dom";
// import blackpaw from "../../assets/images/blackpaw.png";
// import diamantepaw from "../../assets/images/diamantepaw.png";
// import goldenpaw from "../../assets/images/goldenpaw.png";
import goldenblack from "../../assets/images/goldenblackgif.gif";
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
  donations,
  interestedUsers,
}) {
  const pettit = pets;

  return (
    <div
      id={_id}
      className="rounded overflow-hidden border border-[#B99782] w-full bg-white my-12 md:mx-0 lg:mx-0"
    >
      <Link to={"/users/" + _id}>
        <div className="w-full flex justify-between p-3 border-b items-center bg-yellow-500">
          <div className="flex items-center">
            <div className="rounded-full h-8 w-8 flex items-center justify-center overflow-hidden mr-2">
              <img src={image} alt="profilepic" />
            </div>
            <span className="ml-2 font-bold text-xs text-white">
              {`${first_name} ${last_name} - `}
            </span>
            <span className="ml-2 font-bold text-xs text-white">
              ({username})
            </span>
          </div>
          <div className="flex items-center">
            <div className="text-sm flex">
              <img src={ubicacion} alt="ubicacion" width="16px" />
              <span className="font-medium text-xs mx-3">
                {place?.length <= 25 ? place : `${place?.slice(0, 25)}...`}
              </span>
            </div>
          </div>
          {donations.length === 1 ? (
            <div className="rounded-full h-14 w-14 flex items-center justify-center overflow-hidden mr-2">
              <img className="rounded-full" src={goldenblack} alt="" />
            </div>
          ) : (
            false
          )}
          {donations.length === 2 ? (
            <div className="rounded-full h-14 w-14 flex items-center justify-center overflow-hidden mr-2">
              <img
                className="rounded-full h-12 w-1/2"
                src={goldenblack}
                alt=""
              />
            </div>
          ) : (
            false
          )}
          {donations.length >= 3 ? (
            <div className="rounded-full h-14 w-14 flex items-center justify-center overflow-hidden mr-2">
              <img className="rounded-full" src={goldenblack} alt="" />
            </div>
          ) : (
            false
          )}
        </div>
      </Link>

      <div className=" py-3 flex">
        <img
          src={image}
          className="border-solid border-2 border-[#B99782]  w-96 bg-cover rounded"
          alt="ProfilePicture"
        />
        <div className=" bg-yellow-900 flex w-52 flex-col content-around gap-9 justify-center items-center">
          {/* {donations.length === 1 ? (
           <div className="rounded-full h-8 w-8 flex items-center justify-center overflow-hidden mr-2">
              <img
                src={huellabronce}
                
                alt=""
              />   
            </div>
          ) : (
            false
          )}
          {donations.length === 3 ? (
         <div className="rounded-full h-8 w-8 flex items-center justify-center overflow-hidden mr-2">
              <img
                src={huellarubi}
     
                alt=""
              />
            </div>
          ) : (
            false
          )}
          {donations.length > 3 ? (
        <div className="rounded-full h-8 w-8 flex items-center justify-center overflow-hidden mr-2">
              <img
                src={huellaSuprema}
             
                alt=""
              />
            </div>
          ) : (
            false
          )} */}
          {pettit?.length ? (
            <div className="flex">
              <h3 className="text-2xl font-normal text-white">Mis mascotas</h3>
            </div>
          ) : (
            <div className="flex">
              <span className="text-2xl font-bold">En búsqueda</span>
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
          </div>
        </div>
      </div>
    </div>
  );
}
