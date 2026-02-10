import React from "react";
import { NumericFormat, type NumberFormatValues } from "react-number-format";
import { InputBoxProps } from "../types/global";

interface Props {
  children?: React.ReactNode;
  inputBox: InputBoxProps;
  onValueChange?: (rawValue: string, values: NumberFormatValues) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = ({ children, inputBox, onValueChange, onChange }: Props) => {
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
        {inputBox.type === "Parameters" ? (
          <NumericFormat
            id={inputBox.id}
            placeholder={inputBox.placeholder ?? "0"}
            className="block w-full bg-white rounded-md border border-gray-300 pl-10 pr-3 py-3 text-gray-900 placeholder-gray-400 focus:border-purple-500 sm:text-sm"
            value={inputBox.value} // keep in parent state as raw numeric string
            valueIsNumericString // required when storing values.value [web:63]
            thousandSeparator=","
            decimalSeparator="."
            allowNegative={false}
            // Choose ONE behavior:
            decimalScale={2} // 2 for currency; remove this line for unlimited decimals [web:47]
            // fixedDecimalScale            // optional: always show trailing zeros (e.g., 1 -> 1.00) [web:47]
            onValueChange={(values) => {
              onValueChange?.(values.value, values); // values.value is "" when cleared [web:58]
            }}
          />
        ) : (
          <input
            id={inputBox.id}
            placeholder={inputBox.placeholder ?? "0"}
            className="block w-full bg-white rounded-md border border-gray-300 pl-10 pr-3 py-3 text-gray-900 placeholder-gray-400 focus:border-purple-500 sm:text-sm"
            value={inputBox.value}
            onChange={onChange ? onChange : undefined}
          />
        )}
      </div>
    </div>
  );
};

export default InputBox;
