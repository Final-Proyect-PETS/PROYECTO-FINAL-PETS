import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserDetail } from "../../redux/Actions";

export default function Messages({ message, own, mio, el }) {

  const dispatch = useDispatch()

  const yo = useSelector((state) => state.userProfile)

  const ell = useSelector((state) => state.userDetail)

  useEffect(() => {
    dispatch(getUserDetail(el))
  }, [el])

  // console.log(yo, "MIO")

  console.log(ell, "EL")

  return (
    <div
      className={
        own
          ? "flex flex-col justify-end items-end"
          : "flex flex-col justify-start"
      }
    >
      <div className="flex gap-3">
        <img
          src={own ? yo.image : ell?.image}
          alt=""
          className="w-16 h-16 rounded-full"
        />
        <p className="p-10 bg-sky-600 text-white rounded-r-lg max-w-sm">
          {message.text}
        </p>
      </div>
      <div>
        <p className="text-gray-500"></p>
      </div>
    </div>
  );
}
