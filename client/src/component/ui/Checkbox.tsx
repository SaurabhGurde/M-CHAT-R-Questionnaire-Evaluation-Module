import React from "react";

interface PropType {
  value?: any
  label?: string
  onCheckboxChange?: Function
  checked?: string | boolean
}

const Checkbox: React.FC<PropType> = ({value, label, onCheckboxChange, checked}) => {
  return (
    <div onClick={() => onCheckboxChange?.(value)} className="flex items-center w-[70%] max-sm:w-[100%] border border-opacity-50 border-black pl-2 my-2 py-1 rounded-[10px] cursor-pointer">
      <input
        id="link-checkbox"
        type="checkbox"
        onChange={(e) => value ? onCheckboxChange?.(value) : onCheckboxChange?.(e.target.checked)}
        value={value}
        checked={checked ? checked === value : undefined}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor="link-checkbox"
        className="ms-2 text-sm font-medium text-gray-900 "
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
