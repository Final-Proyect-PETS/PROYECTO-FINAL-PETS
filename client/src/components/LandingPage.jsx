import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"
// import { useDispatch } from "react-redux"

function validate(input) {
    let errors = {}
    if (!input.email) {
        errors.email = "El email es necesario"
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.email)) {
        errors.email = "Ingrese un email válido"
    } else errors.email = ""

    // else errors.email = "El email es necesario"

    if (!input.password) {
        errors.password = "La contraseña es necesaria"
    } else if (!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.password)) {
        errors.password = "Ingrese una contraseña válida"
    } else errors.password = ""

    // else errors.password = "La contraseña es necesaria!"

    return errors
}

export default function LandingPage() {

    const [errors, setError] = useState({})
    const [input, setInput] = useState({
        email: "",
        password: ""
    })

    return (
        <div id="landing" className="flex w-screen">
        <div className="flex flex-col-6 m-5 mx-9 mt-8 w-screen items-center">
            <div className="text-gray-800 m-14 p-14">
                <h1 className="text-6xl font-semibold">Bienvenidos a </h1>
                <p className="text-6xl font-normal italic">'Happy Tails'</p>
                <br />
                <p className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl">Somos una organización sin fines de lucro con el objetivo de encontrar un hogar feliz para nuestros amigos de 4 patas...</p>

                {/* <img src="s" /> */}

            </div>

            <div className="flex flex-col w-full max-w-md m-14 mr-24 py-8 bg-amber-600 rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
                <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
                    Ingrese a su cuenta
                </div>
                <div className="mt-8">
                    <form action="#" autoComplete="off">
                        <div className="flex flex-col mb-2">
                            <div className="flex relative">
                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z">
                                        </path>
                                    </svg>
                                </span>
                                <input type="text" value={input.email} id="sign-in-email" className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent" placeholder="Complete su email" />
                                {errors.email && (<p>{errors.email}</p>)}
                            </div>
                        </div>
                        <div className="flex flex-col mb-6">
                            <div className="flex relative ">
                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
                                        </path>
                                    </svg>
                                </span>
                                <input type="password" id="sign-in-email" value={input.password} className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent" placeholder="Complete su contraseña" />
                                {errors.password && (<p>{errors.password}</p>)}
                            </div>
                        </div>
                        <div className="flex items-center mb-6 -mt-4">
                            <div className="flex ml-auto">
                                <span className="inline-flex text-s font-thin text-gray-500 sm:text-sm dark:text-gray-100 hover:text-gray-700 dark:hover:text-yellow-900">
                                    ¿Has olvidado tu contraseña? Ingresa aquí.
                                </span>
                            </div>
                        </div>
                        <div className="flex w-full">
                            <Link to="/home" className="py-2 px-4  bg-yellow-800 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
                                <button type="submit" >
                                    Ingresar
                                </button>
                            </Link>
                        </div>

                    </form>
                </div>

                <div className="flex items-center justify-center mt-6">
                    
                <Link to="/register" className="inline-flex items-center text-s font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-yellow-900">
                        <span className="ml-2">
                            ¿No tiene una cuenta? Ingrese aquí.
                        </span>
                </Link>
    
                </div>

            </div>

        </div>
        </div>
    )

}