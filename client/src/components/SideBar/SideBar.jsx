import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { filterByAge, sortAscAge, sortDescAge, sortAscCreated, sortDescCreated, filterByCastrated, filterBySize, filterByPlace, filterByVaccination, filterByType } from "../../redux/Actions";

export default function SideBar(){

    const dispatch = useDispatch();
    const pets = useSelector((state) => state.pets);


    function handlerSortAscAge(ev){
        ev.preventDefault()
        dispatch(
            sortAscAge(ev.target.value)
        )
    }
    function handlerSortDescAge(ev){
        ev.preventDefault()
        dispatch(
            sortDescAge(ev.target.value)
        )
    }
    function handlerSortCreatedAsc(ev){
        ev.preventDefault()
        dispatch(
            sortAscCreated(ev.target.value)
        )
    }
    function handlerSortCreateDesc(ev){
        ev.preventDefault()
        dispatch(
            sortDescCreated(ev.target.value)
        )
    }
    function handlerFilterVacciantion(ev){
        ev.preventDefault()
        dispatch(
            filterByVaccination(ev.target.value)
        )
    }
    function handlerFilterCastraed(ev){
        ev.preventDefault(ev)
        dispatch(
            filterByCastrated(ev.target.value)
        )
    }
    function handlerFilterByPlace(ev){
        ev.preventDefault()
        dispatch(
            filterByPlace(ev.target.value)
        )
    }
    function handlerFilterTypePet(ev){
        ev.preventDefault()
        dispatch(
            filterByType(ev.target.value)
        )
    }
    function handlerFilterBySize(ev){
        ev.preventDefault()
        dispatch(
            filterBySize(ev.target.value)
        )
    }
    function handlerFilterByAge(ev){
        ev.preventDefault()
        dispatch(
            filterByAge(ev.target.value)
            )
    }
    return (
        <div>
            <button onClick={ev => handlerSortAscAge(ev)}>BOTON DE ASC AGE</button> <p/>
            <button onClick={ev => handlerSortDescAge(ev)}>BOTON DE DESC AGE</button><p/>
            <button onClick={ev => handlerSortCreatedAsc(ev)}>BOTON DE FECHA DE CREACION ASC</button><p/>
            <button onClick={ev => handlerSortCreateDesc(ev)}>BOTON DE FECHA DE CREACION DESC</button><p/>
            <button onClick={ev => handlerFilterVacciantion(ev)}>BOTON DE FILTRAR SI ESTA VACUNADO O NO</button><p/>
            <button onClick={ev => handlerFilterCastraed(ev)}>BOTON DE FILTRAR ESTA SI CASTRADO O NO</button><p/>
            <button onClick={ev => handlerFilterByPlace(ev)}>BOTON DE FILTRAR PO LUGAR DE UBICACION</button><p/>
            <button onClick={ev => handlerFilterTypePet(ev)}>BOTON DE FILTRO POR TIPO DE MASCOTA</button><p/>
            <button onClick={ev => handlerFilterBySize(ev)}>BOTON DE FILTRAR POR TAMAÑO DE MASCOTA</button><p/>
            <button onClick={ev => handlerFilterByAge(ev)}>BOTON DE FILTRAR POR EDAD</button>
        </div>
    )
}
