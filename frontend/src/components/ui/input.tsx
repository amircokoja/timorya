import React, { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import classNames from "classnames";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  additionalClasses?: string;
  registerOptions?: object; // Allow custom validation rules
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { name, label, error, registerOptions, additionalClasses, ...props },
    ref,
  ) => {
    const formContext = useFormContext();
    const register = formContext ? formContext.register : undefined;
    const hasIcon = !!props.icon;

    return (
      <div>
        {label && (
          <label
            htmlFor={name}
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            {label}
          </label>
        )}
        <div className="relative w-full">
          {hasIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {props.icon}
            </div>
          )}
          <input
            id={name}
            {...(register ? register(name, registerOptions) : {})} // Use register only if available
            ref={ref}
            {...props}
            className={classNames(
              "block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600",
              error ? "border-red-500" : "border-gray-300",
              hasIcon ? "pl-10" : "",
              additionalClasses ?? "",
            )}
          />
        </div>

        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
