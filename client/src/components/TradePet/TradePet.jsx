import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import SearchTrade from "../SearchBars/SearchTrade";
import { getAllUsers } from "../../redux/Actions/index";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import AdopterCard from "./AdopterCard";
import InAdoptionCards from "./InAdoptionCards";

export default function TradePet() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const getUsers = useSelector((state) => state.users);
  const loggedUser = useSelector((state) => state.userProfile);
  //PAGINADO-----------------------------------------------------------------------
  const [CurrentPag, setCurrentPag] = useState(1);

  const [CardsPerPage, setCardsPerPage] = useState(6);

  const TotalPages = Math.ceil(getUsers.length / CardsPerPage);

  const IndexLastCard = CurrentPag * CardsPerPage;

  const IndexFirstCard = IndexLastCard - CardsPerPage;

  const CurrentPages = getUsers.slice(IndexFirstCard, IndexLastCard);

  const fetchMoreData = async () => {
    setCardsPerPage(CardsPerPage + 6);
  };

  return (
    <>
      <NavBar />

      <div className="grid grid-cols-3 mt-10 place-content-center ">
        <InfiniteScroll
          dataLength={CurrentPages.length} //This is important field to render the next data
          next={fetchMoreData}
          hasMore={true}
          loader={<h2 className="inline sr-only">Loading...</h2>}
          /*loader={<div role="status">
          <svg className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
      </div>} */
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="">
            <div className="bg-red-700 mt-2">
              "1-Selecciona el usuario a quien darás tu mascota - "Nuevo Dueño"
              <div className="bg-gray-600 mt-2">
                <SearchTrade />
              </div>
              {getUsers?.length > 0 ? (
                getUsers.map((user) => (
                  <AdopterCard
                    key={user._id}
                    _id={user._id}
                    first_name={user.first_name}
                    last_name={user.last_name}
                    username={user.username}
                    image={user.image}
                    email={user.email}
                    about={user.about}
                    telephone={user.telephone}
                    pets={user.pets} //aca seguro hay que meter otro .name o algo asi
                    place={user.place}
                  />
                ))
              ) : (
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
              )}
            </div>
          </div>
        </InfiniteScroll>

        <div className="bg-yellow-600 mt-2">
          2-Selecciona la mascota que quieres dar en adopcion
          {loggedUser.pets?.length ? (
            loggedUser.pets.map((pets) => (
              <InAdoptionCards
                key={pets._id}
                idUser={loggedUser._id}
                idPet={pets._id}
                namePet={pets.name}
                imagePet={pets.image}
                isAdopted={pets.isAdopted}
                pets={loggedUser.pets}
              />
            ))
          ) : (
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
          )}
        </div>
        <div className="bg-green-800 mt-2">
          3-adoptar copiando propiedades,borradologico,etc
        </div>
      </div>
    </>
  );
}

// export default function TradePet() {
//   const dispatch = useDispatch();
//   const loggedProfile = useSelector((state) => state.userProfile); //este estado me lo toma sin useefect
//   const userDetail = useSelector((state) => state.userDetail); //este no↑
//   console.log(userDetail, "LOGGED");

//   // useEffect(() => {
//   //   dispatch(getAllUsers());
//   // }, [dispatch]);
//   // const allUsers = useSelector((state) => state.users); //este no↑

//   // useEffect(() => {
//   //   dispatch(getAllPets());
//   // }, [dispatch]);
//   // const allPets = useSelector((state) => state.pets); //este no↑
//   // console.log(allPets, "LOGGED");

//   function changeHandler(e) {}

//   return (
//     <>
//       <NavBar />
//       <SearchBar/>
//       <div>TradePet</div>
//       <button onChange={(e) => changeHandler(e)}></button>
//     </>
//   );
// }
