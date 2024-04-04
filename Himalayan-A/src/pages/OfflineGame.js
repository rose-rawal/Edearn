/* eslint-disable no-lone-blocks */
import React from "react";
import Layout from "./Layout/layout";
import { useNavigate } from "react-router";
import GameCard from "./component/gameCard";

import anagram from "../assests/anna.png";
import catchIt from "../assests/anna.png";

const OfflineGame = () => {
  const navigate = useNavigate();
  const handleGame = (e, name) => {
    e.preventDefault();
    if (name === "catchIt") navigate("/offline/catchPlay");
    else if (name === "anagram") navigate("/offline/anagram");
    else navigate("/");
  };
  return (
    <div className="bg-black h-screen">
      <Layout>
        <div>
          <div className="flex justify-center text-white text-6xl my-20">
            CHOOSE YOUR GAME :OFFLINE
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
                <GameCard
                  name="Anagram"
                  desc="Guess the word"
                  image={anagram}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default OfflineGame;
{
  /* <div className="flex justify-around">
        <div onClick={(e) => handleGame(e, "catchIt")}>Catch IT!</div>
        <div onClick={(e) => handleGame(e, "anagram")}>Anangram</div>
        </div> */
}
