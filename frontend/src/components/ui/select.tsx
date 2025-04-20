import React, { forwardRef } from "react";
import { useFormContext } from "react-hook-form";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: {
    value: string;
    label: string;
  }[];
  removeFirstOption?: boolean;
  name: string;
  label?: string;
  error?: string;
  additionalClasses?: string;
  registerOptions?: object; // Allow custom validation rules
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      name,
      label,
      error,
      removeFirstOption,
      options,
      registerOptions,
      additionalClasses,
      ...props
    },
    ref,
  ) => {
    const { register, watch } = useFormContext(); // Get form context
    const selectedValue = watch(name); // Watch the current value of this select field

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
        <div className="relative">
          <select
            id={name}
            className={`block w-full appearance-none rounded-lg border p-2.5 text-sm
            ${error ? "border-red-500" : "border-gray-300"}
            bg-gray-50 focus:border-blue-500 focus:ring-blue-500
            ${selectedValue ? "text-gray-900" : "text-gray-400"}
            ${additionalClasses ?? ""}
            `}
            {...props}
            {...(register ? register(name, registerOptions) : {})}
            ref={ref}
          >
            {!removeFirstOption && (
              <option value="" disabled>
                Select
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-2.5 top-[13px] size-4 text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 9-7 7-7-7"
            />
          </svg>
        </div>

        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
