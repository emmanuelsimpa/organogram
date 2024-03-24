import React from "react";

type InputProps = {
  value: string;
  onChange: (value: React.ChangeEvent) => void;
  type?: string;
  name?: string;
  label: string;
};

export function Input({ value, onChange, type, name, label }: InputProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-left leading-6 text-gray-900"
      >
        {label}
      </label>
      <div>
        <input
          value={value}
          onChange={onChange}
          id={name}
          name={name}
          type={type || "text"}
          autoComplete={name}
          required
          className="block w-full rounded-md border-0 py-1.5 pl-1 text-green-950 shadow-sm ring-1 ring-inset ring-green-950 placeholder:text-stone-950 focus:ring-2 focus:ring-inset focus:ring-green-950 text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}
