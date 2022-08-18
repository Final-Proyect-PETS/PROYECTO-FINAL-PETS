import React from "react";
/* import { useState } from "react"; */
import { useDispatch } from "react-redux";
/* import { useSelector } from "react-redux"; */
/* import { filters } from "../../redux/reducer" */
import { filterByAge,
        sortAscAge,
         sortDescAge,
         sortAscCreated,
         sortDescCreated,
         filterByCastrated,
         filterBySize,
         filterByPlace,
         filterByVaccination,
         filterByType
         } from "../../redux/Actions";

export default function SideBar(){

    const dispatch = useDispatch();



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
            <select onChange={ev => handlerFilterVacciantion(ev)}>
                <option hidden>Vacunado?</option>
                <option value = "yes">Si</option>
                <option value = "no">No</option>
                <option value = "unknown">No se</option>
            </select><p/>
            <select onChange={ev => handlerFilterCastraed(ev)}>
                <option hidden>Castrado?</option>
                <option value = "true">Si</option>
                <option value = "false">No</option>
            </select><p/>
            <button onClick={ev => handlerFilterByPlace(ev)}>BOTON DE FILTRAR POR LUGAR DE UBICACION</button><p/>
            <select onChange={ev => handlerFilterTypePet(ev)}>
                <option hidden>TIPO DE MASCOTA</option>
                <option value= "dog">Perros</option>
                <option value ="cat">Gatos</option>
                </select>
            <p/>
            <select onChange={ev => handlerFilterBySize(ev)}>
                <option hidden>TAMAÑO DE LA MASCOTA</option>
                <option value = "big">Grande</option>
                <option value = "medium">Mediano</option>
                <option value = "small">Pequeño</option>
            </select><p/>
            <select onChange={ev => handlerFilterByAge(ev)}>
                <option hidden>EDAD DE LA MASCOTA</option>
                <option value = "old">Anciano</option>
                <option value = "adult">Adulto</option>
                <option value = "young">Joven</option>
            </select>
        </div>
    )
}
