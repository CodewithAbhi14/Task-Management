import React from "react";
import imgGif from "../assets/home-gif.gif"

const Home = () => {
  return (
    <div>
        <div className="flex justify-center items-center">
            <img src={imgGif} alt="home-gif" className="w-[500px] h-[500px]"/>
        </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <h2>Efficiently Manage Your Team</h2>
        <p>
          An application to help you manage tasks and increase productivity.
        </p>
        <button>Get Started</button>
      </div>
    </div>
  );
};

export default Home;
