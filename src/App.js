import React from "react";
import Hero from "./Components/Hero";
import "./App.css";
import Svg from "./Components/Svg.svg";
function App() {
  return (
    <div className="text-center">
      <Hero />
      <img src={Svg} alt="" className="svg" />
    </div>
  );
}

export default App;
