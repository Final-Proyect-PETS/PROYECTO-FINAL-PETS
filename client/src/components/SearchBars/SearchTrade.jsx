import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getUserByName } from "../../redux/Actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [nameUser, setNameUser] = useState("");
  const getUserNow = async () => dispatch(getUserByName(nameUser));

  function handleInputChange(e) {
    e.preventDefault();
    setNameUser(e.target.value);
    getUserNow(nameUser);
  }

  return (
   
    <div className="flex justify-center">
      <label for="input-group-search" class="sr-only">
        Search
      </label>
      <div class="relative">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          onChange={(e) => handleInputChange(e)}
          type="text"
          id="input-group-search"
          class="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500"
          placeholder="Buscar usuario adoptante..."
        />
      </div>
    </div>
  );
}
