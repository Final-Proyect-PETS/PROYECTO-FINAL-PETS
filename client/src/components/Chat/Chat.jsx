import React, { useRef } from "react";
import NavBar from "../NavBar/NavBar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Messages from "./Messages";
import Online from "./Online";
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
      <div className="flex w-full bg-gray-200">
        <div className="w-1/4">
          <div className="h-32 flex justify-center flex-col">
            <input placeholder="Busca algo"></input>
          </div>
          <div className="h-screen overflow-y-scroll">
            <ol className="gap-3">
              {conversations.map((u) => (
                <li
                  onClick={() => setCurrentChat(u)}
                  className="flex items-center gap-3 h-32 border border-black"
                >
                  <Conversations conversation={u} currentUser={id} />
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="w-2/4">
          {currentChat ? (
            <>
              <div className="h-screen overflow-y-scroll pr-1">
                {messages.map((m) => (
                  <div ref={scrollRef}>
                    <Messages message={m} own={m.sender === id} mio={id} el={m.sender !== id ? m.sender : false}/>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between">
                <textarea
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                  className="w-3/4 h-24 p-2.5"
                  placeholder="Escribe algo..."
                ></textarea>
                <button
                  onClick={handleSubmit}
                  className="w-16 h-10 border-none bg-gray-400 text-white"
                >
                  Enviar
                </button>
              </div>
            </>
          ) : (
            <span className="flex justify-center items-center text-3xl">
              Abrí un chat
            </span>
          )}
        </div>
        <div className="w-1/4 p-10">
          <Online />
          <Online />
          <Online />
          <Online />
        </div>
      </div>
    </>
  );
}
