import React from "react";

const Congratulations = () => {
  const tryAgainHandler = () => {
    window.location.reload();
  };
  return (
    <div className="text-center">
      <span className="text-2xl block pt-40 pb-5">Congratulations </span>
      <span className="text-lg block pb-20">You Completed all Levels</span>
      <button
        onClick={tryAgainHandler}
        className="bg-black px-10 py-4 rounded-2xl hover:scale-110 transition-all hover:text-white"
      >
        Play Again!!!
      </button>
    </div>
  );
};

export default Congratulations;
