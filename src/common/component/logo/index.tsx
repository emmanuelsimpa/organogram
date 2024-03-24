import React from "react";

export function Logo() {
  return (
    <div className="relative w-fit">
      <p className="text-5xl text-green-950 stroke_text uppercase cursor-pointer">
        <a href="" className="text-green-950 text-8xl font-extrabold">
          O
        </a>
        rgan
        <a href="" className="text-green-950 text-7xl font-extrabold">
          o
        </a>
        <a href="" className="text-4xl">
          gram
        </a>
      </p>
      <div className="absolute bg-green-700 h-3.5 w-full bottom-0 -z-10 rounded-tr-xl rounded-bl-xl" />
    </div>
  );
}
