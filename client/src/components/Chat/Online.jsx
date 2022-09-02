import React from "react";

export default function Chat() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src="https://ca.slack-edge.com/TPRS7H4PN-U037RE822MS-461ba53b0acd-72"
            alt=""
            className="w-16 h-16 rounded-full"
          />
          <div className="absolute w-2.5 h-2.5 rounded-full bg-lime-500 top-1"></div>
        </div>
        <div>
          <span className="text-xl">Juan Cieri</span>
        </div>
      </div>
    </div>
  );
}
