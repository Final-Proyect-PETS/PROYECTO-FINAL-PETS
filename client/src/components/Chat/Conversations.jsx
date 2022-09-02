import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function Conversations({ conversation, currentUser }) {
  const [userr, setUserr] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser);
    const getUser = async () => {
      try {
        const res = await axios("https://happytails2.herokuapp.com/home/users/" + friendId);
        setUserr(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div>
      <img src={userr?.image} alt="" className="w-20 h-20 rounded-full" />
      <h1 className="text-xl">
        {userr?.first_name} {userr?.last_name}
      </h1>
    </div>
  );
}