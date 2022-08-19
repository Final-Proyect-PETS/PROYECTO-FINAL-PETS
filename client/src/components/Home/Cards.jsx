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
  //Estado Local//-----------
  const [input, setInput] = useState("mascota");

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

  function handleToogle(e) {
    console.log("switch en movimiento....");

    if (input === "mascota") {
      setInput("usuario");
      console.log(input, "DBusuario");
    } else {
      setInput("mascota");
      console.log(input, "DBmascota");
    }
  }

  return (
    <InfiniteScroll
      dataLength={CurrentPages.length} //This is important field to render the next data
      next={fetchMoreData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <label
        for="default-toggle"
        class="inline-flex relative items-center cursor-pointer"
      >
        <input
          type="checkbox"
          value={input}
          id="default-toggle"
          class="sr-only peer"
          onChange={(e) => handleToogle(e)}
        />
        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Mostrar Mascotas/Usuarios
        </span>
      </label>

      {input === "mascota"
        ? CurrentPages.map((pets) => (
            <Card
              idUser={pets.user["_id"]}
              first_name={pets.user["first_name"]}
              last_name={pets.user["last_name"]}
              imageUser={pets.user["image"]}
              namePet={pets.name}
              imagePet={pets.image}
              place={pets.place}
              size={pets.size}
            />
          ))
        : getUsers.map((user) => (
            <UserCard
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
          ))}
    </InfiniteScroll>
  );
}
