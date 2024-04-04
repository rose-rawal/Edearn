/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import done from "../../assests/done.png";

export default function SubscriptionCard({
  name,
  price,
  currency,
  desc,
  color,
  image,
}) {
  return (
    <div>
      <div
        class={`relative flex flex-col mt-6 text-gray-700 ${color} shadow-md bg-clip-border rounded-xl w-96 h-4/5 justify-around`}
      >
        <div class="relative h-auto mx-4 -mt-6 overflow-hidden text-white bg-blue-gray-500 shadow-blue-gray-500/40 flex items-center justify-center">
          <img src={image} alt="card-image" className="h-56 m-6 p-15" />
        </div>
        <div class="p-6 ">
          <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 flex justify-center text-white flex flex-col justify-center items-center gap-5">
            <p className="text-6xl">{name}</p>
            <br />
            <p>
              {currency}
              {price}
            </p>
            {desc}
          </h5>
        </div>
        <div class="p-6 pt-0 flex items-center w-full justify-end">
          <button
            class="w-full align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 hover:bg-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button"
          >
            SUBSCRIBE
          </button>
        </div>
      </div>
    </div>
  );
}
