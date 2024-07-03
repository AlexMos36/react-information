import React from "react";
import logo from "../assets/TheNewYorkTimes.png";

const Logo = () => {
  return (
    <div className="flex justify-center items-center">
      <a href="/">
        <img src={logo} alt="TheNewYorkTimes" className="w-32 md:w-64" />
      </a>
    </div>
  );
};

export default Logo;