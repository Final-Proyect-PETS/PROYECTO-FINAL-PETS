import React from "react";
import { sendNotification } from "../../redux/Actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function NotificationCard(iUser) {
  const dispatch = useDispatch();
  const interestedId = iUser.iUser[0];
  const idPet = iUser.iUser[1];
  const payload = { interestedId  : interestedId, petId: idPet };

  useEffect(() => {
      dispatch(sendNotification(payload));
    }, [dispatch]);
    
    const notistate = useSelector((state) => state.notification);
    
    // console.log(notistate)
    // console.log(payload,"payload")




  return (
    <div className="flex flex-col">
      <h1>{idPet}</h1>
      <h1>{interestedId}</h1>
    </div>

    // return (<div
    //   id={_id}
    //   className="rounded overflow-hidden border border-[#B99782] w-full bg-white my-2 md:mx-0 lg:mx-0"
    // >
    //   <div className="w-full flex justify-between p-3 border-b items-center bg-[#B99782]">
    //     <div className="flex items-center">
    //       <div className="rounded-full h-8 w-8 flex items-center justify-center overflow-hidden mr-2">
    //         <img src={image} alt="profilepic" />
    //       </div>
    //       <span className="ml-2 font-bold text-xs">
    //         {`${first_name} ${last_name} - otra card`}
    //       </span>
    //       <span className="ml-2 font-bold text-xs">({username})</span>
    //     </div>
    //     <div className="flex items-center">
    //       <div className="text-sm flex">
    //         {/* <img src={ubicacion} alt="ubicacion" width="16px" /> */}
    //         <span className="font-medium text-xs mx-3">{place}</span>
    //       </div>
    //     </div>
    //   </div>

    //   <div className=" py-3 flex">
    //     <div className=" bg-gray-200 flex w-52 flex-col content-around gap-9 justify-center items-center">
    //       <div className="text-sm flex">
    //         <div className="grid grid-cols-2 place-content-center">
    //           <div className="flex items-center">
    //             <div className="rounded-full h-8 w-8 flex items-center justify-center overflow-hidden mr-2">
    //               <img src={image} alt="profilepic" />
    //             </div>
    //             <span className="ml-2 font-bold text-xs">
    //               {`${first_name} ${last_name} - otra card`}
    //             </span>
    //             <span className="ml-2 font-bold text-xs">({username})</span>
    //           </div>
    //           <div className="flex items-center">
    //             <div className="text-sm flex">
    //               {/* <img src={ubicacion} alt="ubicacion" width="16px" /> */}
    //               <span className="font-medium text-xs mx-3">{place}</span>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
