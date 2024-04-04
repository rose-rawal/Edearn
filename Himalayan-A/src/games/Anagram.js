/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import context from "../context/mainContext";
import Layout from "../pages/Layout/layout";
import DarkHome from "../pages/homeTheme/DarkHome";
import reset from "../assests/refresh.png";
import io from "socket.io-client";
import axiosInstance from "../api/axiosInstance";

const Anagram = () => {
  const { newSocket, setSocket, socket, user } = useContext(context);
  const room = "room123";
  const [word, setWord] = useState("");
  const [ofWords, setOfWords] = useState([]);
  const [result, setResult] = useState(0);
  const [opponentRes, setOpponentRes] = useState();
  const [countDown, setCountDown] = useState(20);
  const [gameOverScreen, setGameOverScreen] = useState(false);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [newPlayer, setNewPlayer] = useState(0);
  const [startScreen, setStartScreen] = useState(true);
  // const [currentState, setCurrentState] = useState();

  const headWord = "Exaggeration";

  // useEffect(() => {
  //   // setSocket(newSocket());
  //   // setNewPlayer(newPlayer + 1);
  //   // return () => {
  //   //   //CleanUp Function
  //   //   newSocket().disconnect();
  //   // };

  // }, []);
  useEffect(() => {
    // Initialize your socket connection
    const newSocket = io("http://localhost:9000");
    setSocket(newSocket);
    // setCurrentState(Date.now().toString());
    return () => {
      // Clean up socket connection when component unmounts
      newSocket.disconnect();
    };
  }, []);
  var timeInterval;

  useEffect(() => {
    showResult();
  }, [result, gameOverScreen]);

  useEffect(() => {
    if (countDown !== 0 && totalPlayers > 1) {
      timeInterval = setInterval(() => {
        setCountDown(countDown - 1);
      }, 1000);
    }
    if (countDown === 0) {
      setGameOverScreen(true);
    }
    return () => clearInterval(timeInterval);
  }, [countDown, totalPlayers]);

  useEffect(() => {
    var interval;
    console.log(totalPlayers);
    if (!gameOverScreen && totalPlayers > 1) {
      interval = setInterval(() => {
        console.log("Over");

        setGameOverScreen(true);
      }, 20000);
    }

    return () => clearInterval(interval);
  }, [result, gameOverScreen, totalPlayers]);

  useEffect(() => {
    //jin room
    return () => {
      socket?.emit("leaveRoom", room);
    };
  }, [socket, room]);

  useEffect(() => {
    socket?.on("points2", (res) => {
      setTotalPlayers(res?.numberOfUsers);
      console.log(res?.numberOfUsers, "totalPlayers");

      setOpponentRes(res?.result);
    });
  }, [socket, newPlayer, totalPlayers]);

  useEffect(() => {
    if (socket) {
      socket.emit("points", { room: room, result });
    }
    console.log("result", result);
  }, [result]);

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
    // socket?.disconnect();
    // setSocket(null);
    window.location.reload();
  };

  const startGameHandler = () => {
    setStartScreen(!startScreen);
    // if (socket && room) {
    socket?.emit("joinRoom", { room: room, user: user.email });
    if (socket) {
      socket?.emit("points", { room: room, result });
    }
    // }

    setCountDown(11);
  };
  useEffect(() => {
    if (gameOverScreen) {
      setTimeout(() => {
        console.log("opponent", opponentRes);
        if (localStorage.getItem("currentUser")) {
          axiosInstance.post("/game/anagramScore", {
            email: localStorage.getItem("currentUser"),
            success:
              opponentRes && (opponentRes === result || result > opponentRes)
                ? true
                : false,
          });
        }
      }, 100);
    }
  }, [opponentRes]);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center ">
        {startScreen && <div onClick={startGameHandler}>Start!</div>}
        {!startScreen && totalPlayers < 2 ? (
          <div>MatchMaking Finding</div>
        ) : (
          !startScreen && (
            <div>
              {gameOverScreen ? (
                <div>
                  <div className="flex justify-center items-center text-3xl text-white">
                    {opponentRes &&
                      (result === opponentRes || result > opponentRes
                        ? "You Won"
                        : "You Lost")}
                  </div>
                  <hr className="my-5" />
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
                  {/* {opponentRes && (
                    <h1>
                      <center>{opponentRes}</center>
                    </h1>
                  )} */}
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
          )
        )}
      </div>
    </Layout>
  );
};

export default Anagram;
