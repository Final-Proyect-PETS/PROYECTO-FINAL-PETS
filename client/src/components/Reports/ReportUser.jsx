import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reportUser } from "../../redux/Actions";
import NavBar from "../NavBar/NavBar";
import { notificationSwal } from "../../utils/notificationSwal";
import Swal from "sweetalert2";
import "./Reports.css";

export default function ReportUser() {
  const [input, setInput] = useState(""); //si le llegamos a agregar mas campos al formulario, convertir input a objeto como siempre
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = localStorage.getItem("id");
  const reported_user_id = useSelector((state) => state.userDetail._id);

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    Swal.fire({
      title: "¿Está seguro de que desea denunciar a este usuario?",
      text: "Este usuario será denunciado",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Sí",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          reportUser({
            informerId: id,
            reportedUserId: reported_user_id,
            reason: input,
          })
        ).then((e) => {
          if (e === "OK") {
            notificationSwal(
              "Denuncia exitosa",
              "Un administrador revisará su denuncia",
              "success",
              "Ok"
            );
            navigate("/home");
          } else {
            notificationSwal(
              "¡Ooops!",
              "No se pudo denunciar al usuario, intente mas tarde",
              "error",
              "Cancel"
            );
          }
        });
      } else {
        notificationSwal(
          "Operación cancelada",
          "Usuario no denunciado",
          "error",
          "Cancel"
        );
      }
    });
  }

  return (
    <div id="reportUser" className="fixed">
      <NavBar />
      <h1 className="flex justify-center font-semibold text-3xl mt-3">
        ¿Por qué desea reportar este usuario?
      </h1>
      <div className="mt-8 px-8 max-w-lg self-center"></div>
      <form
        onSubmit={handleSubmit}
        className="bg-yellow-500 flex w-2/3 my-10 ml-60 flex-row border-2 border-black"
      >
        <div>
          <label className="font-light text-white text-xl">Comentarios</label>
          <textarea
            name="description"
            value={input}
            placeholder="Describa el motivo de su denuncia"
            onChange={(e) => handleChange(e)}
            className="w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent resize-none"
          />
        </div>
        <div>
          <button
            type="submit"
            className="py-2 px-4 my-4 w-full bg-yellow-900 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            Reportar usuario
          </button>
        </div>
      </form>
    </div>
  );
}
