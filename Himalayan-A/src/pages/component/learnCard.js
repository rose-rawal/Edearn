import React from "react";

export default function LearnCard() {
  return (
    <div>
      {" "}
      <div>
        {" "}
        <div class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
          <div class="relative h-auto mx-4 -mt-6 overflow-hidden text-white bg-blue-gray-500 shadow-blue-gray-500/40 flex items-center justify-center">
            {/* <img src={done} alt="card-image" className="h-16 m-5 pt-5" /> */}
          </div>
          <div class="p-6">
            <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 flex justify-center text-green-600">
              SUCCESS !
            </h5>
          </div>
          <div class="p-6 pt-0 flex items-center justify-center w-full">
            <button
              class="w-full align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 hover:bg-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              type="button"
            >
              NEXT LEVEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
