import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import { useParams } from "react-router-dom";
import { getPetDetail } from "../../redux/Actions";

export default function PetDetail() {

    let { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPetDetail(id));
    }, [ dispatch, id ]);

    const petDetail = useSelector((state) => state.petDetail);

    return (
        <div>
            <NavBar />
            <h1>Detalles 🐶</h1>
            <div>
                <h2>{petDetail.name}</h2>
                {/* faltaria agregar el pool de images q viene como array */}
                <img src={petDetail.image} alt="imagen mascota" />
                <h3>Descripcion: {petDetail.description}</h3>
                <h3>Lugar donde se encuntra: {petDetail.place}</h3>
                <h3>Medida aproximada: {petDetail.size}</h3>
                <h3>¿Está vacunado?: {petDetail.vaccination}</h3>
            </div>
        </div>
    )
}