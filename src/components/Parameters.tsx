import React, { FormEvent, useState } from "react";
import Card from "./Card";
import { TbCurrencyPeso } from "react-icons/tb";
import salary from "../class/Salary";
import { ComputedSalary } from "../types/global";
import {
  defaultComputedSalary,
  defaultSalaryInformation,
} from "../constants/Constants";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { PERIOD } from "../constants/Constants";

interface Props {
  onCompute: (computedSalary: ComputedSalary) => void;
}
const Parameters = ({ onCompute }: Props) => {
  let salaryObj = salary(defaultSalaryInformation);
  const [salaryInput, setSalaryInput] = useState<string>("");
  const [periodSelect, setPeriodSelect] = useState<number>(1);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/,/g, ""); // remove commas\
    const number = Number(rawValue);
    if (!isNaN(number)) {
      setSalaryInput(number.toLocaleString());
    } else {
      setSalaryInput(""); // Reset if not a valid number
    }
  };

  const handleOnSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = Number(event.target.value);
    setPeriodSelect(selectedValue);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (salaryInput !== null && salaryInput !== "" && salaryInput !== "0") {
      salaryObj = salary({
        salary: parseInt(salaryInput.replace(/,/g, ""), 10),
        period: periodSelect,
      });
      onCompute({
        taxableIncome: salaryObj.computeTaxableIncome(),
        salary: salaryObj.salary,
        monthlyEstimatedTax: salaryObj.computeMonthlyTax(),
        sssContribution: salaryObj.computeSSSContribution(),
        pagIbigContribution: salaryObj.computePagIbigContribution(),
        philHealthContribution: salaryObj.computePhilHealthContribution(),
        netSalary: salaryObj.computeNetSalary(),
        totalDeductions: salaryObj.computeTotalDeductions(),
        totalContribution: salaryObj.computeContributionTotal(),
      });
    }
  };

  const handleReset = () => {
    if (salaryInput) {
      setSalaryInput("");
    }
    salaryObj = salary(defaultSalaryInformation);
    onCompute(defaultComputedSalary);
  };
  return (
    <>
      <Card className="bg-gray-300/40 p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold text-purple-600 mb-2">Parameters</h2>
          <p className="text-gray-700 mb-6">
            Please input your salary information
          </p>

          <div className="mb-6">
            <label
              htmlFor="basicPay"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Basic Pay
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <TbCurrencyPeso className="text-black" size={20} />
              </div>
              <input
                id="basicPay"
                placeholder="0"
                className="block w-full bg-white rounded-md border border-gray-300 pl-10 pr-3 py-3 text-gray-900 placeholder-gray-400  focus:border-purple-500 sm:text-sm"
                value={salaryInput}
                onChange={handleOnChange}
                inputMode="numeric"
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="period"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Period
            </label>
            <div className="mt-2 grid grid-cols-1">
              <select
                id="period"
                name="period"
                autoComplete="period"
                value={periodSelect}
                onChange={handleOnSelectChange}
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-3 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                {PERIOD.map((period, index) => (
                  <option key={index} value={period.periodValue}>
                    {period.periodText}
                  </option>
                ))}
              </select>
              <ChevronDownIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              />
            </div>
          </div>

          <div className="flex justify-end items-center">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Reset
            </button>
            <button
              type="submit"
              className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Compute
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default Parameters;
