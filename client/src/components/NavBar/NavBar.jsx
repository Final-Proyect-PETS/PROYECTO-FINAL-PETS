import React from "react";
import { Link } from "react-router-dom";
import { getUserDetail } from "../../redux/Actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function NavBar() {


  const dispatch = useDispatch()

  const id = localStorage.getItem("id")

  const user = useSelector((state) => state.userDetail)

  useEffect(() => {
    dispatch(getUserDetail(id))
  }, [dispatch, id])

  


  return (
    <nav className="bg-amber-800 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-amber-800 w-screen">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/home" className="flex items-center">
          <img src="https://cdn-icons-png.flaticon.com/512/194/194279.png" className="mr-3 h-6 sm:h-9" alt="logo icon" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Happy Tails</span>
        </Link>
        <div className="flex items-center md:order-2">
          <button type="button" className="flex mr-3 text-sm rounded-full justify-center items-center gap-3 md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
            <h4>{user.first_name} {user.last_name}</h4>
            <img className="w-8 h-8 rounded-full" src={user.image} alt="foto perfil" />
          </button>
          {/* <!-- Dropdown menu --> */}
          <div className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
            <div className="py-3 px-4">
              <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
              <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
            </div>
            <ul className="py-1" aria-labelledby="user-menu-button">
              {/* <li>
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
              </li> */}
            </ul>
          </div>
          <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
        </div>
        <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
          <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-amber-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-amber-800 dark:bg-amber-800 md:dark:bg-amber-800 dark:border-amber-700">
            <li>
              <Link to="/home" className="block py-2 pr-4 pl-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-amber-600 md:dark:hover:bg-transparent dark:border-gray-700" >Inicio
              </Link>
            </li>

            <li>
              <Link to="/donations" className="block py-2 pr-4 pl-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Donaciones
              </Link>
            </li>
            <li>
              <Link to="/about" className="block py-2 pr-4 pl-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" >Sobre Nosotros</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
