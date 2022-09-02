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
import Cabecera from "./Cabecera";
import search from "./../../assets/search.svg";
import profile from "./../../assets/images/2039031.png"


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
      <div className="flex">
        <div className="w-14 h-screen flex flex-col items-center">
        </div>

        {/* div para iconos aqui  */}
        <div className="w-72 h-screen bg-yellow-500 mb-3 shadow-sm shadow-slate-500">
          <div className="text-xl text-white font-normal p-4">
            Chat
          </div>
          <div className="p-3 flex">
            <input className="p-2 w-10/12 rounded-tl-md border-transparent rounded-bl-md bg-gray-100 ring-2 ring-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent shadow-md" type="text" placeholder="Buscar usuario..." />
            <div className="w-2/12 justify-center items-center bg-gray-100 ring-2 ring-yellow-800 rounded-tr-md rounded-br-md">
              <img src={search} alt="icon" className="w-5 self-center" />
            </div>
          </div>

          <div>
            {conversations.map((u) => (
              <div
                className="flex-col m-3 items-center gap-3 bg-white shadow-sm rounded-md shadow-slate-600">
                <span onClick={() => setCurrentChat(u)}>
                  <Conversations conversation={u} currentUser={id} />
                </span>
              </div>
            ))}
          </div>

        </div>
        
        <div className="flex flex-col flex-grow h-screen bg-white mb-3">

          {/* cabecera */}
          {currentChat ? (
            <>
              <div className="w-full h-16 bg-gray-200 shadow-sm shadow-slate-500">
                <div className="flex items-center">
                  <div className="p-3">
                    <img src={profile} alt="imagen perfil" className="h-8 w-8 rounded-full" />
                    </div>
                    <div className="p-3">
                    <div className="flex justify-center items-center font-semibold text-gray-900">Nombre usuario</div>
                  </div>

                </div>
              </div>

              <div className="w-full flex-grow bg-white shadow-sm shadow-slate-500 overflow-y-scroll ">
                <div className="pr-1 h-96">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Messages message={m} own={m.sender === id} mio={id} el={m.sender !== id ? m.sender : false} />
                    </div>
                  ))}
                </div>
              </div>

              {/* text area */}
              <div className="flex w-full h-14 px-4 bg-white shadow-sm shadow-slate-500">
                <input type="text" placeholder="Escribe un mensaje..." onKeyPress={e => e.key === 'Enter' && handleSubmit(e)} onChange={(e) => setNewMessage(e.target.value)} value={newMessage} className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-gray-100 rounded-tl-md rounded-bl-md py-3 ring-1 ring-yellow-800 focus:ring-1 focus:ring-yellow-800 focus:border-transparent shadow-md" />

                <button type="button" className="inline-flex rounded-tr-md rounded-br-md items-center justify-center ring-1 ring-yellow-800 focus:outline-none focus:ring-1 focus:ring-yellow-800 focus:border-transparent shadow-md px-4 py-3 transition duration-500 ease-in-out text-white bg-green-500 hover:bg-green-400" onClick={handleSubmit}>
                  <span className="font-bold">Enviar</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                </button>
              </div>
            </>)
            :
            (<span className="flex p-6 justify-center items-center text-3xl text-gray-800 font-semibold">Seleccione un chat</span>)}
        </div>

        <div className="w-14 h-screen flex flex-col items-center">
        </div>
      </div>
    </>
  );
}
