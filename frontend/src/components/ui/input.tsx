import React, { forwardRef } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  error?: string;
  registerOptions?: object; // Allow custom validation rules
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, error, registerOptions, ...props }, ref) => {
    const formContext = useFormContext();
    const register = formContext ? formContext.register : undefined;

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
          {...(register ? register(name, registerOptions) : {})} // Use register only if available
          ref={ref}
          {...props}
          className={`block w-full rounded-lg border ${
            error ? "border-red-500" : "border-gray-300"
          } bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600`}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
