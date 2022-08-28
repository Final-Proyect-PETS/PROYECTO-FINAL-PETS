import React from "react";
import NavBar from "../NavBar/NavBar";
import Cards from "./Cards";
import SideBar from "../SideBar/SideBar";
import "./../LandingPage.css"

export default function Home() {
  return (
    <>
      <section className="fixed w-screen">
        <NavBar />
      </section>
      <div className="flex flex-col">
        <div className="flex flex-row w-screen">
          <section className="flex w-1/3 fixed">
            <SideBar />
          </section>
          <section className="flex w-full bg-white justify-center mt-9">
            <Cards />
          </section>
        </div>
      </div>
    </>
  );
}
