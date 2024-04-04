import React, { useEffect, useState, useContext } from "react";
import context from "../context/mainContext";
import Layout from "../pages/Layout/layout";
import DarkHome from "../pages/homeTheme/DarkHome";
import reset from "../assests/refresh.png";
import Congratulations from "../pages/component/Congratulations";
import axios from "axios";

const OffAnagram = () => {
  const [word, setWord] = useState("");
  const [ofWords, setOfWords] = useState([]);
  const [result, setResult] = useState(0);
  const [countDown, setCountDown] = useState(11);
  const [gameOverScreen, setGameOverScreen] = useState(false);
  const [startScreen, setStartScreen] = useState(true);

  const headWord = "Bread";

  var timeInterval;

  useEffect(() => {
    showResult();
  }, [result, gameOverScreen]);

  useEffect(() => {
    if (!startScreen) {
      if (countDown !== 0) {
        timeInterval = setInterval(() => {
          setCountDown(countDown - 1);
        }, 1000);
      }
      if (countDown === 0) {
        setGameOverScreen(true);
      }
      return () => clearInterval(timeInterval);
    }
  }, [countDown, startScreen]);

  //   useEffect(() => {
  //     var interval;
  //     console.log("GOing ");
  //     if (!gameOverScreen) {
  //       interval = setInterval(() => {
  //         console.log("Over");

  //         setGameOverScreen(true);
  //       }, 11000);
  //     }

  //     return () => clearInterval(interval);
  //   }, [gameOverScreen]);

  const checkHeadWord = (keyword) => {
    const isMatch = Array.from(keyword).every((char) =>
      headWord.includes(char)
    );

    return isMatch;
  };

  const checkDouble = (keyword) => {
    if (ofWords.length === 0) {
      return true;
    } else {
      const cd = ofWords.filter((word) => word === keyword);

      if (cd.length === 0) {
        return true;
      } else {
        return false;
      }
    }
  };

  const wordHandler = (e) => {
    if (e.key === "Enter") {
      if (checkHeadWord(word)) {
        if (checkDouble(word)) {
          setOfWords((prev) => {
            return [...prev, word];
          });
          console.log(ofWords);
          setWord("");
        } else {
          console.log("Double Elements Entered");
          return;
        }
      } else {
        //Show error
        console.log("Unwanted letters are present");
        return;
      }
    }
  };

  const inputHandler = (e) => {
    setWord(e.target.value);
  };

  const showResult = async () => {
    try {
      let totalCount = 0;

      for (const word of ofWords) {
        try {
          const DictionaryResp = await axios.get(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
          );

          console.log(DictionaryResp.data[0]);
          if (DictionaryResp.data[0].word) {
            totalCount++;
          }
        } catch (error) {
          console.log(`Error fetching ${word}`, error);
          // Continue to the next word even if there's an error
        }
      }

      setResult(totalCount);
    } catch (err) {
      console.log("Error in anagram", err);
    }
  };

  const resetHandler = () => {
    setGameOverScreen(!gameOverScreen);
    setOfWords([]);
    setCountDown(11);
    setStartScreen(!startScreen);
    // socket?.disconnect();
    // setSocket(null);
    window.location.reload();
  };

  const startGameHandler = () => {
    setStartScreen(!startScreen);

    setCountDown(11);
  };

  return (
    <div className="bg-black h-full">
      <Layout>
        <div className="min-h-screen flex items-center justify-center ">
          {startScreen && (
            <div className="flex flex-col justify-center text-center items-center">
              <div
                onClick={startGameHandler}
                className="border border-solid border-[#070c1f] rounded-2xl p-4 w-40 flex justify-center bg-[#070c1f] text-white mb-7"
              >
                S T A R T
              </div>
              <div>create new words from the given word</div>
            </div>
          )}

          {!startScreen && (
            <div>
              {gameOverScreen ? (
                <div>
                  <div
                    onClick={resetHandler}
                    className="flex gap-4 bg-slate-700 p-3  rounded-3xl"
                  >
                    <img
                      src={reset}
                      alt="reset"
                      className="filter invert h-7"
                    />
                    <p>Restart Game</p>
                  </div>
                  <div className="flex text-white text-2xl m-5 gap-4">
                    <p>Final Result</p>{" "}
                    <p className="text-blue-500">{result}</p>
                  </div>
                </div>
              ) : (
                <div className=" p-5 flex items-center justify-center flex-col">
                  <h1 className="text-2xl m-5">
                    Time Left
                    <br />
                  </h1>
                  <p className="text-9xl m-5">{countDown}</p>{" "}
                  <h2>
                    <div className="m-5">
                      <h1 className="text-3xl text-blue-500">{headWord}</h1>
                    </div>
                  </h2>
                  <div className="flex flex-col justify-center">
                    <div className=" flex justify-center items-center">
                      -- Extract New Words --
                    </div>
                    <br />
                    <input
                      onChange={inputHandler}
                      type="text"
                      value={word}
                      className="w-80 rounded-md bg-slate-400 text-black p-2"
                      onKeyDown={wordHandler}
                    />
                    {/* <button onClick={(e) => wordHandler(e)}>Generate A word</button> */}
                    <div className="flex flex-col justify-center items-center mt-5 text-xl text-slate-400">
                      {ofWords.map((item, index) => {
                        return <div key={index}>{item}</div>;
                      })}
                    </div>
                    {/* <button onClick={showResult}>Show Result</button>
            <div>Your Final result is{result}</div> */}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default OffAnagram;
