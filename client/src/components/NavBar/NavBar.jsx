import React from "react";
import { Link } from "react-router-dom";


export default function NavBar() {
  return (
    // <nav className="flex justify-center h-14">
    //   <div className="bg-yellow-800 flex justify-between border-b-4 border-white w-screen justify-center content-around items-center px-4">
    //     <div className="flex">
    //       <h1 className="text-white text-2xl font-semibold">Happy Tails</h1>
    //     </div>
    //     <div className="flex w-80 justify-around">
    //       <Link to={"/home"}>
    //         <h2 className="text-black text-2xl font-semibold">Home</h2>
    //       </Link>
    //       <Link to={"/pasarela"}>
    //         <h2 className="text-black text-2xl font-semibold">$$$</h2>
    //       </Link>
    //       <Link to={"/about"}>
    //         <h2 className="text-black text-2xl font-semibold">About</h2>
    //       </Link>
    //     </div>

    //     <div className="flex gap-3 items-center">
    //       <p className="text-gray-50 font-semibold">Lautaro Martín</p>
    //       <img
    //         src="https://img.freepik.com/fotos-premium/hombre-caucasico-joven-persona-pared-blanca-apuntando-mano-camisa-blanco-orgulloso-confiado_1187-76423.jpg?w=740"
    //         alt="logo"
    //         width="9px"
    //         className="mx-auto object-cover rounded-full h-9 w-9 "
    //       />
    //     </div>
    //   </div>
    // </nav>
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-amber-800 w-screen">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/home" className="flex items-center">
          <img src="https://cdn-icons-png.flaticon.com/512/194/194279.png" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Happy Tails</span>
        </Link>
        <div className="flex items-center md:order-2">
          <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src="https://img.freepik.com/fotos-premium/hombre-caucasico-joven-persona-pared-blanca-apuntando-mano-camisa-blanco-orgulloso-confiado_1187-76423.jpg?w=740" alt="foto perfil" />
          </button>
          {/* <!-- Dropdown menu --> */}
          <div className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
            <div className="py-3 px-4">
              <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
              <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
            </div>
            <ul className="py-1" aria-labelledby="user-menu-button">
              <li>
                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
              </li>
            </ul>
          </div>
          <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
        </div>
        <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
          <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-amber-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-amber-800 md:dark:bg-amber-800 dark:border-amber-700">
            <li>
              <Link to="/home" className="block py-2 pr-4 pl-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-amber-600 md:dark:hover:bg-transparent dark:border-gray-700" >Inicio
              </Link>
            </li>

            <li>
              <Link to="/donations" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Donaciones
              </Link>
            </li>
            <li>
              <Link to="/about" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" >Sobre Nosotros</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
