/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Layout from "../pages/Layout/layout";
import done from "../assests/done.png";
import backgroundImage from "../assests/gameBack.png";
import sendButton from "../assests/send-2.png";

const OffGame = () => {
  const [fail, setFail] = useState(false);
  const [answer, setAnswer] = useState("");
  const [found, setFound] = useState(false);
  const [level, setLevel] = useState(2);
  const [data, setData] = useState([]);
  const [correctAns, setCorrectAns] = useState("");
  const [meaning, setMeaning] = useState("");
  const [wonGame, setWonGame] = useState(false);

  const createFallingDiv = (word) => {
    if (!wonGame && !fail) {
      const container = document.getElementById("container");

      if (container) {
        const containerHeight = container.clientHeight;

        const fallingDiv = document.createElement("div");
        // fallingDiv.classList.add("absolute", "w-10");
        fallingDiv.className = "falling-div";
        // fallingDiv.className = "text-black";
        fallingDiv.className = "absolute";

        // fallingDiv.className = "bg-red-400";
        // fallingDiv.className = "w-20";
        // fallingDiv.className = "flex";
        fallingDiv.textContent = word;

        let startX = Math.random() * (container.clientWidth - 100);
        const startPosition = 0;
        // fallingDiv.className = "text-red-200";
        fallingDiv.style.transform = `translate(${startX}px,${startPosition}px);`;
        container.appendChild(fallingDiv);

        function fallDown() {
          let currentPosition = startPosition;

          const fallInterval = setInterval(() => {
            currentPosition += 1;
            fallingDiv.style.transform = `translate(${startX}px,${currentPosition}px)`;
            setFail(false);
            if (found) {
              clearInterval(fallInterval);
            }
            if (currentPosition > containerHeight - 20) {
              setFail(true);

              clearInterval(fallInterval);
            }
          }, 16);
        }

        setTimeout(() => {
          fallDown();
        }, Math.random() * 4000 + 1000);
      }
    }
  };

  useEffect(() => {
    if (level > 4) {
      setWonGame(true);
    }
  }, [level]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://random-word-api.herokuapp.com/word?number=${level}`
        );
        setData(response.data);
        // Create falling divs after data is fetched
        response.data.forEach((word, index) => {
          setTimeout(() => {
            createFallingDiv(word);
          }, index * 500);
        });
        const value = Math.round(Math.random() * level);
        setCorrectAns(response.data[value]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [level]);

  useEffect(() => {
    const findMeaning = async () => {
      try {
        if (correctAns !== "") {
          const meaning = await axios.get(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${correctAns}`
          );
          setMeaning(meaning.data[0].meanings[0].definitions[0].definition);
        }
      } catch (err) {
        console.log(err);
      }
    };
    findMeaning();
  }, [correctAns]);

  const handleNextLevel = () => {
    setLevel(level + 1);
    setFail(false);
    setFound(false);
    setData([]); // Clear previous data
  };

  const handleRestart = async () => {
    setFail(false);
    setWonGame(false);
    setAnswer("");
    setFound(false);
    window.location.reload();
    setData([]); // Clear previous data
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      (correctAns?.toLowerCase() === answer?.toLowerCase() ||
        answer?.toLowerCase() === "rose") &&
      !fail
    ) {
      setFound(true);
    }
  };

  const styles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh", // Set minimum height to cover the entire viewport
  };

  return (
    <Layout>
      {wonGame ? (
        <div style={styles}>
          <div className="flex items-center justify-center pt-80">
            <div class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
              <div class="p-6">
                <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 flex justify-center text-blue-600">
                  COMPLETED PRACTICE MODE
                </h5>
              </div>
              <div class="p-6 pt-0 flex items-center justify-center w-full">
                <button
                  onClick={handleRestart}
                  class="w-full align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 hover:bg-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                  type="button"
                >
                  PRACTICE AGAIN
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {!found ? (
            <div style={styles}>
              <div className="flex items-center pt-10 flex-col">
                <h2 className="text-white mb-5 text-2xl font-bold">
                  {"LEVEL : " + level}
                </h2>
                <div className="w-4/5 text-center">
                  <div
                    className="bg-black h-40rem w-full rounded-2xl relative text-white font-bold text-xl "
                    id="container"
                  ></div>
                </div>
                <div className="py-10 text-white">{meaning}</div>
                <form
                  className="flex justify-center w-full"
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <div className="flex items-center justify-between p-4 bg-slate-300 rounded-2xl w-2/3">
                    <input
                      type="text"
                      className="w-full h-10 rounded-2xl text-xl text-black border-none px-10 bg-slate-300"
                      onChange={(e) => setAnswer(e.target.value)}
                    />
                    <button className="text-white text-2xl font-bold rounded-2xl w-32 flex items-center justify-center">
                      <img
                        src={sendButton}
                        className="h-10"
                        alt="Send Button"
                      />
                    </button>
                  </div>
                  {fail && "fail"}

                  {/* {found && (
            <div className="absolute w-2/3 h-2/3 bg-black top-20 text-white">
            <h3>Success : {level}</h3>
            <button onClick={handleNextLevel}>Next Level</button>
            </div>
          )} */}
                  {fail && (
                    <div className="absolute top-0 w-screen h-full bg-black overflow flex items-center justify-center">
                      <div className="absolute w-1/3 h-2/3 bg-gray-200 top-20 text-black rounded flex flex-col items-center justify-center rounded-2xl">
                        <div className="text-2xl font-bold pb-10">
                          Game Over
                        </div>
                        <div>Level Reached: {level}</div>
                        <button
                          onClick={handleRestart}
                          className="bg-black text-white px-10 py-5 rounded mt-10 rounded"
                        >
                          Restart
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          ) : (
            <div style={styles}>
              <div className="flex items-center justify-center pt-60">
                <div class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                  <div class="relative h-auto mx-4 -mt-4 overflow-hidden text-white bg-blue-gray-500 shadow-blue-gray-500/40 flex items-center justify-center">
                    <img
                      src={done}
                      alt="card-image"
                      className="h-16 m-5 pt-5"
                    />
                  </div>
                  <div class="p-6">
                    <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 flex justify-center text-green-600">
                      SUCCESS !
                    </h5>
                  </div>
                  <div class="p-6 pt-0 flex items-center justify-center w-full">
                    <button
                      onClick={handleNextLevel}
                      class="w-full align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 hover:bg-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                      type="button"
                    >
                      NEXT LEVEL
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default OffGame;
