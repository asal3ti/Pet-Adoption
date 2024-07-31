<<<<<<< HEAD
"use client"; // Add this directive at the top to make this a client component

import { useState } from 'react';
import Head from 'next/head';
import ProfileSettings from '../ProfileSettings/page'; // Ensure this path is correct 

export default function Dashboard() {
  const [showProfileSettings, setShowProfileSettings] = useState(false);

  const handleProfileClick = () => {
    setShowProfileSettings(!showProfileSettings);
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body className="font-poppins antialiased">
        <div
          id="view"
          className="h-full w-screen flex flex-row"
        >
          <button
            className="p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white absolute top-0 left-0 sm:hidden"
            // Handle button click logic if needed
          >
            <svg
              className="w-5 h-5 fill-current"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            id="sidebar"
            className="bg-customBg h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
          >
            <div className="space-y-6 md:space-y-10 mt-10">
              <h1 className="font-bold text-4xl text-center md:hidden">
                D<span className="text-teal-600">.</span>
              </h1>
              <h1 className="hidden md:block font-bold text-sm md:text-xl text-center">
                Pet Adoption<span className="text-teal-600">.</span>
              </h1>
              <div id="profile" className="flex items-center space-x-4">
                <img
                  src="https://media.tenor.com/dimT0JAAMb4AAAAM/cat-cute.gif"
                  alt="Avatar user"
                  className="w-10 md:w-16 rounded-full"
                />
                <div>
                  <h2 className="font-medium text-xs md:text-sm text-white-500">
                    Hi Atlas!
                  </h2>
                  <p className="text-xs text-gray-500">Welcome back!</p>
                </div>
              </div>
              <div id="menu" className="flex flex-col space-y-2">
                <a
                  href="#"
                  className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-[#7E836D] hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out border-b-2 border-gray-300 last:border-b-0"
                >
                  <span className="">Finding my soul</span>
                </a>
                <a
                  href="#"
                  className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-[#7E836D] hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out border-b-2 border-gray-300 last:border-b-0"
                >
                  <span className="">Waiting List</span>
                </a>
                <a
                  href="#"
                  className={`text-sm font-medium py-2 px-2 rounded-md transition duration-150 ease-in-out border-b-2 border-gray-300 last:border-b-0 ${
                    showProfileSettings
                      ? 'bg-[#7E836D] text-white'
                      : 'text-gray-700 hover:bg-[#7E836D] hover:text-white hover:text-base'
                  }`}
                  onClick={handleProfileClick}
                >
                  <span className="">My profile</span>
                </a>
              </div>
            </div>
          </div>
          <div
            id="main-content"
            className={`flex-1 flex justify-center items-center p-4 ${
              showProfileSettings ? 'bg-gray-50' : ''
            }`}
          >
            {/* Render ProfileSettings if `showProfileSettings` is true */}
            {showProfileSettings && (
              <div className="w-full max-w-6xl"> {/* Increased width */}
                <ProfileSettings />
              </div>
            )}
          </div>
        </div>
      </body>
    </>
  );
}


