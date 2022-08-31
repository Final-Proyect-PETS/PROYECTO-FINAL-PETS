import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getUserDetail } from "../../redux/Actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function Conversations ({conversation, currentUser}) {

    const dispatch = useDispatch()

    const user = useSelector((state) => state.userDetail)

    console.log(user)

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser)
        dispatch(getUserDetail(friendId))
    }, [currentUser, conversation, dispatch])

    return (
        <div>
            <img src={user?.image} alt="" className="w-20 h-20 rounded-full"/>
            <h1 className="text-xl">{user?.first_name} {user?.last_name}</h1>
        </div>
    )
}