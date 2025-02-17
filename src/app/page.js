// src/app/page.js
import Simulation from "@/components/Simulation";
import Play from "@/components/Play";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Simulation />
    </div>
  );
}