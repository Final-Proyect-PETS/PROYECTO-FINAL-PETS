import React from "react";
import NavBar from "../NavBar/NavBar";
import Cards from "./Cards";
import SideBar from "../SideBar/SideBar";

export default function Home() {
  return (
    <>
      <div className="flex flex-col">
        <section className="fixed">
          <NavBar />
        </section>

        <div className="flex flex-row bg-gray-200 w-screen">
          <section className="flex w-1/3 fixed mt-14">
            <SideBar />
          </section>

          <section className="flex w-full justify-center">
            <Cards />
          </section>
        </div>
      </div>
    </>
  );
}
