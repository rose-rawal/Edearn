import React, { useEffect } from "react";
import Layout from "./Layout/layout";
import { useNavigate } from "react-router";
import GameCard from "./component/gameCard";

import anagram from "../assests/anna.png";
import catchIt from "../assests/anna.png";

const OnlineGame = () => {
  const navigate = useNavigate();
  const handleGame = (e, name) => {
    e.preventDefault();
    if (name === "catchIt") navigate("/online/catchPlay");
    else if (name === "anagram") navigate("/online/anagram");
    else navigate("/");
  };
  useEffect(() => {
    if (localStorage.getItem("currentItem")) {
      navigate("/login");
    }
  }, []);
  return (
    <Layout>
      <div className="bg-black h-screen">
        <div className="flex justify-center text-white text-6xl py-20">
          CHOOSE YOUR GAME: ONLINE
        </div>
        <div className="flex justify-around px-96 gap-10">
          <div>
            <div
              className=" hover:shadow-blue-500 shadow-lg hover:scale-110 transform transition-all duration-500"
              onClick={(e) => handleGame(e, "catchIt")}
            >
              <GameCard name="Catch It" desc="Hit the word" image={catchIt} />
            </div>
          </div>
          <div>
            <div
              className=" hover:shadow-blue-500 shadow-lg hover:scale-110 transform transition-all duration-500"
              onClick={(e) => handleGame(e, "anagram")}
            >
              <GameCard name="Anagram" desc="Guess the word" image={anagram} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OnlineGame;
