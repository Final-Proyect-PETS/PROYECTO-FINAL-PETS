import React from "react";
import { forgotPassword } from "../redux/Actions/index";
import { useDispatch } from "react-redux";
import { useState } from "react";


export default function ForgotPassword() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");


    function handleChange(e) {
        setEmail(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log()
        dispatch(forgotPassword({ email: email }))
    }


    return (
        <div>
            <h4>pone el mail aca wacho</h4>
            <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => handleChange(e)} />
            <button onClick={(e) => handleSubmit(e)}>manda el mail con este boton che</button>
        </div>
    )
}

