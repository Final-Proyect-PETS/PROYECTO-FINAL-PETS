import React from "react";
import { useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";

export default function PetDetail() {

    const petDetail = useSelector((state) => state.petDetail);
    console.log(petDetail)

    return (
        <div>
            <NavBar />
            <h1>componente detail</h1>
            <div>
                <h3>{petDetail.name}</h3>
                <h3>{petDetail.image}</h3>
                {/* <h3></h3> */}
<h1>hola </h1>
            </div>

        </div>
    )
}