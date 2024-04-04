/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";

import done from "../../assests/done.png";

export default function GameCard({ name, desc, image }) {
  return (
    <div>
      {" "}
      <div class="relative flex flex-col mt-6 text-gray-700 bg-black shadow-md bg-clip-border rounded-xl w-96 h-96 ">
        <div class="relative h-auto mx-4 -mt-6 overflow-hidden text-white bg-blue-gray-500 shadow-blue-gray-500/40 flex items-center justify-center">
          <img src={image} alt="card-image" className="h-96 m-5 py-5" />
        </div>
        <div class="p-6">
          <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 flex justify-center text-white">
            {name}
          </h5>
        </div>
      </div>
    </div>
  );
}
