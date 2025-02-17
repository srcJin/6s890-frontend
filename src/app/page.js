"use client";

import { useState } from "react";
import Simulation from "@/components/Simulation";
import Play from "@/components/Play";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [activePage, setActivePage] = useState("Simulation");

  return (
    
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Render the active component */}
      <div className="">
        {activePage === "Simulation" ? <Simulation /> : <Play />}
      </div>
    </div>
  );
}
