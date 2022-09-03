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
                const res = await axios("http://localhost:3001/home/users/" + friendId);
                setUserr(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, [currentUser, conversation]);

    return (
        <>
            <div className="flex items-center p-2">
                <img src={userr?.image} alt="" className="w-14 h-14 rounded-full" />
                <div className="text-md flex pl-3 text-gray-700 font-semibold">
                    {userr?.first_name} {userr?.last_name}
                </div>
            </div>
        </>
    );
}