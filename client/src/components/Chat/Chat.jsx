import React, { useRef } from "react";
import NavBar from "../NavBar/NavBar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Messages from "./Messages";

import {
  getUserProfile,
  getConversations,
  sendMessage,

} from "../../redux/Actions";
import Conversations from "./Conversations";
import { useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

export default function Chat() {

  const dispatch = useDispatch();

  const conversations = useSelector((state) => state.conversations);
  

  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");

  const [arrivalMessage, setArrivalMessage] = useState(null);

  const socket = useRef(io("http://localhost:3001"));

  const [currentChat, setCurrentChat] = useState(null);

  const scrollRef = useRef();

  const id = localStorage.getItem("id");

  useEffect(() => {
    socket.current = io("http://localhost:3001");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", id);
  }, [id]);

  useEffect(() => {
    dispatch(getUserProfile(id));
    dispatch(getConversations(id));
  }, [id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/home/message/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = {
      sender: id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members?.find((m) => m !== id);

    socket.current.emit("sendMessage", {
      senderId: id,
      receiverId,
      text: newMessage,
    });
    dispatch(sendMessage(message));
    setMessages([...messages, message]);
    setNewMessage("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <NavBar />
      <div className="flex w-full bg-gray-500">
        <div className="w-1/4">
          <div className="h-32 flex justify-center flex-col">
            <input placeholder="Busca algo" />
          </div>
          <div className="overflow-y-scroll">
            <ol className="gap-3">
              {conversations.map((u) => (
                <li
                  onClick={() => setCurrentChat(u)}
                  className="flex items-center gap-3 h-32 border border-black">
                  <Conversations conversation={u} currentUser={id} />
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col bg-red-900 h-96">
          <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
            <div className="w-full">
              {currentChat ? (
                <>
                  <div className="relative flex items-center space-x-4">
                    <div className="relative">
                      <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full" />
                    </div>
                    <div className="flex flex-col leading-tight">
                      <div className="text-2xl mt-1 flex items-center">
                        <span className="text-gray-700 mr-3">Anderson Vanhron</span>
                      </div>
                    </div>
                  </div>
                  <div className="overflow-y-scroll pr-1 h-96">
                    {messages.map((m) => (
                      <div ref={scrollRef}>
                        <Messages message={m} own={m.sender === id} mio={id} el={m.sender !== id ? m.sender : false} />
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <input type="text" placeholder="Escribe un mensaje..." onKeyPress={e => e.key === 'Enter' && handleSubmit(e)} onChange={(e) => setNewMessage(e.target.value)} value={newMessage} className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-8 bg-gray-200 rounded-md py-3" />

                    <button type="button" className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none" onClick={handleSubmit}>
                      <span className="font-bold">Enviar</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                      </svg>
                    </button>
                  </div>
                </>)
                :
                (<span className="flex justify-center items-center text-3xl">Abrí un chat</span>)}
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
