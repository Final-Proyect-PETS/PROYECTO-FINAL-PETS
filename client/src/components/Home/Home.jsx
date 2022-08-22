import React from "react";
import NavBar from "../NavBar/NavBar";
import Cards from "./Cards";
import SideBar from "../SideBar/SideBar";

export default function Home() {
  return (
    <>
      <section className="fixed">
        <NavBar />
      </section>
      <div className="flex flex-col">
        <div className="flex flex-row w-screen mt-4">
          <section className="flex w-1/3 fixed mt-14">
            <SideBar />
          </section>

          <section className="flex w-full justify-center mt-6">
            <Cards />
          </section>
        </div>
      </div>
    </>
  );
}
