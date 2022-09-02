import React from "react";

export default function Cabecera(){
   return <div className="relative flex items-center space-x-4">
    <div className="relative">
      <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full" />
    </div>
    <div className="flex flex-col leading-tight">
      <div className="text-2xl mt-1 flex items-center">
        <span className="text-gray-700 mr-3">Anderson Vanhron</span>
      </div>
    </div>
  </div>
}