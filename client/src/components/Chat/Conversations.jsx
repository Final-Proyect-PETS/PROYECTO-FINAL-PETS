import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getUserDetail } from "../../redux/Actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios"

export default function Conversations ({conversation, currentUser}) {

    const dispatch = useDispatch()

    const [userr, setUserr] = useState(null)

    // console.log(conversation, "CONVERSATION")

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser)
        const getUser = async () => {
            try {
                const res = await axios("http://localhost:3001/home/users/" + friendId)
                setUserr(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    }, [currentUser, conversation])

    // console.log(userr, "aca userr")

    return (
        <div>
            <img src={userr?.image} alt="" className="w-20 h-20 rounded-full"/>
            <h1 className="text-xl">{userr?.first_name} {userr?.last_name}</h1>
        </div>
    )
}