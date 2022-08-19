import React, { useEffect } from "react";
import { getAllPets } from "../../redux/Actions/index";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
//import { Link } from "react-router-dom";
import Card from "./Card";

export default function Cards() {
  const dispatch = useDispatch();

  const getPets = useSelector((state) => state.pets);

  const [CurrentPag, setCurrentPag] = useState(1);

  const [CardsPerPage, setCardsPerPage] = useState(6);

  const TotalPages = Math.ceil(getPets.length / CardsPerPage);

  const IndexLastCard = CurrentPag * CardsPerPage;

  const IndexFirstCard = IndexLastCard - CardsPerPage;

  const CurrentPages = getPets.slice(IndexFirstCard, IndexLastCard);

  useEffect(() => {
    dispatch(getAllPets());
  }, [dispatch]);

  console.log(getPets);

  const fetchMoreData = async () => {
    
    setCardsPerPage(CardsPerPage + 6)
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
        }>
        {CurrentPages.map((pets) => (
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
        ))}
      </InfiniteScroll>
    
  );
}
