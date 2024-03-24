import React from "react";
import { Logo } from "../logo";

export function LoadingLogo() {
  return (
    <div className="min-h-screen h-full w-full flex flex-col justify-center items-center gap-1">
      <Logo />
      <div>
        <svg
          className="animate-spin h-5 w-5 mr-3 text-green-500"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.004 8.004 0 014 12H0c0 6.627 5.373 12 12 12v-4c-3.155 0-5.98-1.224-8.134-3.209l2.827-2.827z"
          ></path>
        </svg>
        Processing...
      </div>
    </div>
  );
}
