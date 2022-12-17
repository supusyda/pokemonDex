import React from "react";

export default function Navbar() {
  return (
    // <div className="h-20 bg-slate-600 text-white text-center leading-[6rem] text-3xl align-bottom ">
    //   <i className="fa fa-spotify mr-5"></i>Spotify

    // </div>
    <nav class="bg-gray-500 py-2">
      <div class="mx-auto xl:max-w-6xl px-4">
        <div class="flex justify-between item-center">
          <div class="flex space-x-4">
            <div class="">
              <a href="#" class="flex item-center px-3 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-blue-300 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                  />
                </svg>
                <span class="inline-block font-bold">Logo</span>
              </a>
            </div>
            <div>
              <div class="flex item-center space-x-3">
                <a href="" class="px-3 py-2 hover:text-slate-100">
                  Pokemon
                </a>
                <a href="" class="px-3 py-2 hover:text-slate-100">
                  Ball
                </a>
              </div>
            </div>
          </div>

          <div class="flex item-center space-x-3">
            <a href="#" class="px-3 py-2 hover:text-slate-100">
              Login
            </a>
            <a
              href="#"
              class="px-3 py-2 bg-yellow-500 rounded text-yellow-900 hover:bg-yellow-400 hover:text-yellow-800 transition-color"
            >
              Singup
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
