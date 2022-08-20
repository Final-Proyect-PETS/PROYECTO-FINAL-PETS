import React, { useEffect } from "react";
import { getAllPets, getAllUsers } from "../../redux/Actions/index";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
//import { Link } from "react-router-dom";
import Card from "./Card";
import UserCard from "./UserCard";

export default function Cards() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPets());
  }, [dispatch]);

  const getPets = useSelector((state) => state.pets);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const getUsers = useSelector((state) => state.users);

  const switchRender = useSelector((state) => state.switchRender);


  //Estado Local//-----------
  // const [input, setInput] = useState("mascota");//lleve

  //PAGINADO-----------------------------------------------------------------------
  const [CurrentPag, setCurrentPag] = useState(1);

  const [CardsPerPage, setCardsPerPage] = useState(6);

  const TotalPages = Math.ceil(getPets.length / CardsPerPage);

  const IndexLastCard = CurrentPag * CardsPerPage;

  const IndexFirstCard = IndexLastCard - CardsPerPage;

  const CurrentPages = getPets.slice(IndexFirstCard, IndexLastCard);

  const fetchMoreData = async () => {
    setCardsPerPage(CardsPerPage + 6);
  };
  //-------------------------------------------------------------------------------------------------

  // function handleToogle(e) {
  //   if (input === "mascota") {
  //     setInput("usuario");
  //     console.log(input, "DBusuario");
  //   } else {
  //     setInput("mascota");
  //     console.log(input, "DBmascota");
  //   }
  // }//lleve

  return (
    <InfiniteScroll
      dataLength={CurrentPages.length} //This is important field to render the next data
      next={fetchMoreData}
      hasMore={true}
      loader={<h2>Loading...</h2>}
      /*           loader={<div role="status">
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
      {/* <label
        htmlFor="default-toggle"
        className="inline-flex relative items-center cursor-pointer"
      >
        <input
          type="checkbox"
          value={input}
          id="default-toggle"
          className="sr-only peer"
          onChange={(e) => handleToogle(e)}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Mostrar Mascotas/Usuarios
        </span>
      </label> */}

      {getPets.length > 0 ? (
        switchRender === "mascota" ? (
          CurrentPages.map((pets) => (
            <Card
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
            />
          ))
        ) : (
          getUsers.map((user) => (
            <UserCard
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
            />
          ))
        )
      ) : (
        <div role="status">
          <svg
            className="inline mr-2 w-10 h-10 m-3 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-700"
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
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </InfiniteScroll>
  );
}
