import React, { FormEvent, useState } from "react";
import Card from "./Card";
import { TbCurrencyPeso } from "react-icons/tb";
import salary from "../class/Salary";
import { ComputedSalary } from "../types/global";
import {
  defaultComputedSalary,
  defaultSalaryInformation,
  SUMMARY_COMPUTATION,
} from "../constants/Constants";

import { PERIOD } from "../constants/Constants";
import InputBox from "./InputBox";
import SelectionBox from "./SelectionBox";

interface Props {
  onCompute: (computedSalary: ComputedSalary) => void;
}
const Parameters = ({ onCompute }: Props) => {
  let salaryObj = salary(defaultSalaryInformation);
  const [salaryInput, setSalaryInput] = useState<string>("");
  const [nonTaxableAllownace, setNonTaxableAllowance] = useState<string>("");
  const [taxableAllowance, setTaxableAllowance] = useState<string>("");
  const [periodSelect, setPeriodSelect] = useState<number>(1);
  const [summarySelect, setSummarySelect] = useState<number>(1);

  const handleNumericChange =
    (setValue: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = event.target.value.replace(/,/g, ""); // remove commas\
      const number = Number(rawValue);
      if (!isNaN(number)) {
        setValue(number.toLocaleString());
      } else {
        setValue(""); // Reset if not a valid number
      }
    };

  const handleOnSelectChange =
    (setValue: React.Dispatch<React.SetStateAction<number>>) =>
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = Number(event.target.value);
      setValue(selectedValue);
    };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (salaryInput !== null && salaryInput !== "" && salaryInput !== "0") {
      salaryObj = salary({
        salary: parseInt(salaryInput.replace(/,/g, ""), 10),
        nonTaxableAllowance: nonTaxableAllownace
          ? parseInt(nonTaxableAllownace.replace(/,/g, ""), 10)
          : 0,
        taxableAllowance: taxableAllowance
          ? parseInt(taxableAllowance.replace(/,/g, ""), 10)
          : 0,
        period: periodSelect,
      });
      onCompute({
        taxableIncome: salaryObj.computeTaxableIncome(),
        salary: salaryObj.salary,
        nonTaxableAllowance: salaryObj.nonTaxableAllowance,
        taxableAllowance: salaryObj.taxableAllowance,
        monthlyEstimatedTax: salaryObj.computeMonthlyTax(),
        sssContribution: salaryObj.computeSSSContribution(),
        pagIbigContribution: salaryObj.computePagIbigContribution(),
        philHealthContribution: salaryObj.computePhilHealthContribution(),
        netSalary: salaryObj.computeNetSalary(),
        dailySalary: salaryObj.computeDailyRate(),
        totalDeductions: salaryObj.computeTotalDeductions(),
        totalContribution: salaryObj.computeContributionTotal(),
      });
    }
  };

  const handleReset = () => {
    if (salaryInput) {
      setSalaryInput("");
      setNonTaxableAllowance("");
      setPeriodSelect(1);
    }
    salaryObj = salary(defaultSalaryInformation);
    onCompute(defaultComputedSalary);
  };

  return (
    <>
      <Card className="w-full lg:w-1/3 bg-gray-300/40 p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold text-purple-600 mb-2">Parameters</h2>
          <p className="text-gray-700 mb-6">
            Please input your salary information
          </p>
          {/*Basic Pay InputBox */}
          <InputBox
            inputBox={{
              id: "basicPay",
              fieldName: "Basic Pay",
              value: salaryInput,
            }}
            handleOnChange={handleNumericChange(setSalaryInput)}
          >
            {<TbCurrencyPeso className="text-black" size={20} />}
          </InputBox>

          {/*Non-Taxable Allowance InputBox */}
          <InputBox
            inputBox={{
              id: "nonTaxableAllowance",
              fieldName: "Non-taxable Income",
              value: nonTaxableAllownace,
            }}
            handleOnChange={handleNumericChange(setNonTaxableAllowance)}
          >
            {<TbCurrencyPeso className="text-black" size={20} />}
          </InputBox>

          {/*Taxable Allowance InputBox */}
          <InputBox
            inputBox={{
              id: "taxableAllowance",
              fieldName: "Taxable Income",
              value: taxableAllowance,
            }}
            handleOnChange={handleNumericChange(setTaxableAllowance)}
          >
            {<TbCurrencyPeso className="text-black" size={20} />}
          </InputBox>

          <SelectionBox
            selectionBox={{
              id: "period",
              fieldName: "Period",
              value: periodSelect,
            }}
            handleOnChange={handleOnSelectChange(setPeriodSelect)}
          >
            {PERIOD.map((period, index) => (
              <option key={index} value={period.periodValue}>
                {period.periodText}
              </option>
            ))}
          </SelectionBox>

          <SelectionBox
            selectionBox={{
              id: "summary",
              fieldName: "Computation Summary Calculation",
              value: summarySelect,
            }}
            handleOnChange={handleOnSelectChange(setSummarySelect)}
          >
            {SUMMARY_COMPUTATION.map((summaryComp, index) => (
              <option key={index} value={summaryComp.summaryCompValue}>
                {summaryComp.summaryCompText}
              </option>
            ))}
          </SelectionBox>

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
