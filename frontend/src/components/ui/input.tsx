"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ name, label, error, ...props }) => {
  const { register } = useFormContext();

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        id={name}
        {...register(name)}
        {...props}
        className={`block w-full rounded-lg border ${
          error ? "border-red-500" : "border-gray-300"
        } bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
