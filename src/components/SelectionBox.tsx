import React from "react";
import { SelectionBoxProps } from "../types/global";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
//import { PERIOD } from "../constants/Constants";

interface Props {
  children?: React.ReactNode;
  selectionBox: SelectionBoxProps;
  handleOnChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectionBox = ({ children, selectionBox, handleOnChange }: Props) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={selectionBox.id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {selectionBox.fieldName}
      </label>
      <div className="mt-2 grid grid-cols-1">
        <select
          id={selectionBox.id}
          name={selectionBox.id}
          autoComplete={selectionBox.id}
          value={selectionBox.value}
          onChange={handleOnChange}
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-3 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        >
          {children}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
        />
      </div>
    </div>
  );
};

export default SelectionBox;
