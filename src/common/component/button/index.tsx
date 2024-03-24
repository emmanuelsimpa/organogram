import { classNames } from "@/utils/classname";
import React from "react";

type buttonProps = {
  text: string;
  type?: string;
  color?: string;
  loading: boolean;
  onClick?: () => void;
};

export function Button({
  text,
  type,
  onClick,
  loading = false,
  color,
}: buttonProps) {
  return (
    <>
      {!loading ? (
        <button
          onClick={onClick}
          disabled={loading}
          type="submit"
          className={classNames(
            color !== "disabled" ? "bg-green-800" : "bg-gray-800",
            "flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-950"
          )}
        >
          {text}
        </button>
      ) : (
        <div className="flex justify-center items-center gap-2 bg-green-800">
          <p className="text-white">Loading</p>
          <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-white" />
        </div>
      )}
    </>
  );
}
