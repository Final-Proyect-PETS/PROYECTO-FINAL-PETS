import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail } from "../../redux/Actions";

export default function Cabecera({el}) {

  const dispatch = useDispatch()

  const ell = el.toString()

    useEffect(() => {
        dispatch(getUserDetail(ell))
    }, [ell])


    const elll = useSelector((state) => state.userDetail)
  return (
    <div className="w-full h-16 bg-gray-200 shadow-sm shadow-slate-500">
      <div className="flex items-center">
        <div className="p-3">
          <img src={elll.image} alt="asd" className="h-8 w-8 rounded-full" />
        </div>
        <div className="p-3">
          <div className="flex justify-center items-center font-semibold text-gray-900">
            {elll.first_name} {elll.last_name}
          </div>
        </div>
      </div>
    </div>
  );
}
