import React from "react";
import { format } from "timeago.js";


export default function Messages ({message,own}) {

    return (
        <div className={own ? "flex flex-col justify-end items-end" : "flex flex-col justify-start"}>
            <div className="flex gap-3">
                <img src="https://ca.slack-edge.com/TPRS7H4PN-U037RE822MS-461ba53b0acd-72" alt="" className="w-16 h-16 rounded-full"/>
                <p className="p-10 bg-sky-600 text-white rounded-r-lg max-w-sm">{message.text}</p>
            </div>
            <div>
                <p className="text-gray-500">{format(message.createdAt)}</p>
            </div>
        </div>
    )

}