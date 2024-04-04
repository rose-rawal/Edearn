/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import done from "../../assests/done.png";
import kazu from "../../assests/kazu.webp";

export default function FlipCard({ front, back }) {
  return (
    <div class="group h-96 w-96 [perspective:1000px]">
      <div class="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div class="absolute inset-0">
          <div>
            <img
              class="container inset-0 h-full w-full  rounded-xl object-cover opacity-20 shadow-xl shadow-black/40 flex flex-col items-center justify-center text-slate-200 [backface-visibility:hidden]"
              src={kazu}
            />
            <div class="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
              <p class="text-white text-2xl font-bold">{front}</p>
            </div>
          </div>
        </div>
        <div class="absolute inset-0 h-full w-full rounded-xl bg-black/85 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div class="flex min-h-full flex-col items-center justify-center text-wrap">
            <h1 class="">{back}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
