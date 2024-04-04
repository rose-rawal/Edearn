import axios from "axios";
import React, { useEffect, useState } from "react";
import FlipCard from "../component/flipCard";
import Layout from "./layout";

export default function Learn() {
  const [meaningScreen, setMeaningScreen] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [ofMeaning, setOfMeanings] = useState([]);

  const stringArr = [
    "Exhilarating",
    "Welcome",
    "Hello",
    "Word",
    "Catch",
    "Use",
    "Winner",
    "Loser",
    "Project",
    "Bank",
    "Pig",
    "Dog",
    "Cat",
    "Mouse",
    "Rat",
    "Bird",
    "Fish",
  ];

  useEffect(() => {
    const fetchMeaning = async () => {
      var meanings = [];
      try {
        for (var i = 0; i < stringArr.length; i++) {
          try {
            const res = await axios.get(
              `https://api.dictionaryapi.dev/api/v2/entries/en/${stringArr[i]}`
            );
            const mean = res.data[0].meanings[0].definitions[0].definition;

            meanings = [...meanings, mean];
            console.log(meanings);
          } catch (err1) {
            console.log("Error when fetching meaning outside loop", err1);
          }
        }
        setOfMeanings(meanings);
      } catch (err) {
        console.log("Error when fetching meaning outside loop", err);
      }
    };
    fetchMeaning();
  }, []);

  const getMeaningHandler = (i) => {
    const mappedBool = meaningScreen.map((item, index) => {
      if (i === index) {
        return !item;
      } else {
        return item;
      }
    });
    setMeaningScreen(mappedBool);
  };

  const listMeaning = () => {
    console.log(meaningScreen);
  };

  return (
    <Layout>
      <div>
        <div onClick={listMeaning} className="mx-10 p-5">
          <div className="text-white text-6xl flex justify-center my-7 flex-col items-center">
            <p>LEARN</p>
            <p className="text-xl my-5 text-slate-400">
              Hover over the card for knowing the words meaning.
            </p>
          </div>
          <hr className="mb-10 border border-t-2 border-slate-600" />
          <div className="grid grid-cols-4 gap-14">
            {stringArr.map((item, index) => {
              return <FlipCard front={item} back={ofMeaning[index]} />;
            })}
          </div>
        </div>
        {/* {stringArr.map((item, index) => {
        return (
          <div key={index}>
          <button
          onClick={() => {
            getMeaningHandler(index);
          }}
          >
          {meaningScreen[index] ? (
                <div>{ofMeaning[index]}</div>
                ) : (
                  <div>{item}</div>
                  )}
                  </button>
                  </div>
                  );
                })} */}
      </div>
    </Layout>
  );
}
