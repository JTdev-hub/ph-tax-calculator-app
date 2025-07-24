import React from "react";
import { InputBoxProps } from "../types/global";

interface Props {
  children?: React.ReactNode;
  inputBox: InputBoxProps;
  handleOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = ({ children, inputBox, handleOnChange }: Props) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={inputBox.id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {inputBox.fieldName}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {children}
        </div>
        <input
          id={inputBox.id}
          placeholder={inputBox.placeholder ? inputBox.placeholder : "0"}
          className="block w-full bg-white rounded-md border border-gray-300 pl-10 pr-3 py-3 text-gray-900 placeholder-gray-400  focus:border-purple-500 sm:text-sm"
          value={handleOnChange ? inputBox.value : undefined}
          onChange={handleOnChange ? handleOnChange : undefined}
          inputMode="numeric"
        />
      </div>
    </div>
  );
};

export default InputBox;
