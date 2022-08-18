import React, { useEffect } from "react";
import { getAllPets } from "../../redux/Actions/index";
import { useSelector, useDispatch } from "react-redux";
//import { Link } from "react-router-dom";
import Card from "./Card";

export default function Cards() {

    const dispatch = useDispatch();
    const getPets = useSelector(state => state.pets);

    useEffect(() => {
        dispatch(getAllPets())
    }, [dispatch])


    return (
        <>
        {getPets.length > 0 ? getPets.map(pets => (
                        <div key={pets._id}>
                            {/* <Link to={'/details/' + dog.id} style={{ textDecoration: 'none' }} > */}
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
                            {/* </Link> */}
                        </div>)

                    ) : <h2>Loading...</h2>}
        </>
    )
}