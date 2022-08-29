import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Toast, Dropdown } from "flowbite-react";

export default function NotificationCard() {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.userProfile);
  console.log(pet_name);
  let user = {};
  function closeHandler(e) {
    e.preventDefault();
    console.log("click");
  }

  return (
    <>{pet_name}</>
    // <Dropdown.Item>
    //   <Toast>
    //     <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200">
    //       <img src={image} className="h-10 w-10 rounded-full" />
    //     </div>
    //     <div className="ml-3 text-sm font-normal">
    //       <h1>
    //         {first_name} {last_name} esta interesado en {pet_name}
    //       </h1>
    //     </div>
    //     <button className="text-yellow-500" onClick={(e) => closeHandler(e)}>
    //       <Toast.Toggle onClick={(e) => closeHandler(e)} />
    //     </button>
    //   </Toast>
    // </Dropdown.Item>
  );
}
