import React from "react";
import { resetPassword } from "../redux/Actions/index";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";


export default function ResetPassword() {
    const dispatch = useDispatch();
    const { id, token } = useParams();
    const [password, setPassword] = useState("");


    function handleChange(e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        dispatch(resetPassword({
            password: password,
            id,
            auth: token
        }))
    }

    return (
        <div>
            <h4>pone la contra nueva gil</h4>
            <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => handleChange(e)} />

            <button onClick={(e) => handleSubmit(e)}>manda el pass nuevo con este boton che</button>
        </div>
    )
}
