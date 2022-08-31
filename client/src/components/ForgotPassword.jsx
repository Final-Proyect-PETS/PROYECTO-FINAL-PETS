import React from "react";
import { forgotPassword } from "../redux/Actions/index";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Modal, Label } from "flowbite-react";

export default function ForgotPassword() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [show, setShow] = useState(false);

    function handleChangePass(e) {
        setEmail(e.target.value)
    }

    function handleSubmitPass(e) {
        e.preventDefault();
        console.log()
        dispatch(forgotPassword({ email: email }))
    }

    // const onClick = () => {
    //     setShow(true);
    // };

    const onClose = () => {
        setShow(false);
    };

    return (
        <>
            <Modal
                show={show}
                size="md"
                popup={true}
                onClose={onClose}
            >
                <div className="bg-yellow-500 rounded-lg shadow-md border border-white">
                    <Modal.Header />
                    <Modal.Body>
                        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                            <h3 className="text-2xl font-light text-white">
                                Recuperemos tu contraseña
                            </h3>
                            <div>
                                <div className="mb-2">
                                    <Label
                                        htmlFor="email"
                                        value="Ingresa tu email"
                                        class="text-white"
                                    />
                                </div>
                                <div className="flex relative">
                                    <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                        <svg
                                            width="15"
                                            height="15"
                                            fill="currentColor"
                                            viewBox="0 0 1792 1792"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        name="email"
                                        value={email}
                                        onChange={(e) => handleChangePass(e)}
                                        id="sign-in-email"
                                        className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
                                        placeholder="Complete su email"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mb-6 -mt-4 w-full">
                                <button onClick={(e) => handleSubmitPass(e)} className="py-2 px-4 w-full bg-yellow-900 hover:bg-yellow-800 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" type="submit">
                                    Enviar email
                                </button>
                            </div>

                        </div>
                    </Modal.Body>
                </div>
            </Modal>
        </>
        //     <div>
        //         <h4>pone el mail aca wacho</h4>
        //         <input
        //             type="text"
        //             name="email"
        //             value={email}
        //             onChange={(e) => handleChange(e)} />
        //         <button onClick={(e) => handleSubmit(e)}>manda el mail con este boton che</button>
        //     </div>

    )

}

