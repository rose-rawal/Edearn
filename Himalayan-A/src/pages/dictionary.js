import React, { useState } from "react";

import axios from "axios";

const Dictionary = () => {
  const [word, setWord] = useState("");
  const handleClick = async (e) => {
    e.preventDefault();
    const data = await axios.get(
      "https://random-word-api.herokuapp.com/word?number=20"
    );
    console.log(data.data);
  };
  return (
    <div>
      <input type="text" onChange={(e) => setWord(e.target.value)}></input>
      <button onClick={(e) => handleClick(e)}>go</button>
    </div>
  );
};

export default Dictionary;
