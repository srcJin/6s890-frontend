"use client";

import React from "react";

const Navbar = ({ activePage, setActivePage }) => {
  return (
    <nav className="text-white p-4 flex justify-center space-x-4">
        <h1 className="text-black text-2xl font-bold mt-4 text-center">SimCity Game Interface</h1>
      <button
        className={`px-4 py-2 rounded-md ${
          activePage === "Simulation" ? "bg-blue-800" : "bg-blue-500 hover:bg-blue-700"
        }`}
        onClick={() => setActivePage("Simulation")}
      >
        Simulation
      </button>
      <button
        className={`px-4 py-2 rounded-md ${
          activePage === "Play" ? "bg-blue-800" : "bg-blue-500 hover:bg-blue-700"
        }`}
        onClick={() => setActivePage("Play")}
      >
        Play
      </button>
    </nav>
  );
};

export default Navbar;
