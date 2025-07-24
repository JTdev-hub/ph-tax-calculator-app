import React, { FormEvent, useState, useCallback } from "react";
import Card from "./Card";
import { TbCurrencyPeso } from "react-icons/tb";
import salary from "../class/Salary";
import { ComputedSalary, SalaryInformation } from "../types/global";
import {
  defaultComputedSalary,
  //SUMMARY_COMPUTATION,
  PERIOD,
} from "../constants/Constants";
import InputBox from "./InputBox";
import SelectionBox from "./SelectionBox";

interface Props {
  onCompute: (computedSalary: ComputedSalary) => void;
}

// Define input fields for dynamic rendering
const inputFields = [
  {
    id: "basicPay",
    fieldName: "Basic Pay",
    stateKey: "salaryInput" as keyof FormState,
  },
  {
    id: "nonTaxableAllowance",
    fieldName: "Non-taxable Income",
    stateKey: "nonTaxableAllowance" as keyof FormState,
  },
  {
    id: "taxableAllowance",
    fieldName: "Taxable Income",
    stateKey: "taxableAllowance" as keyof FormState,
  },
];

// Form state type
interface FormState {
  salaryInput: string;
  nonTaxableAllowance: string;
  taxableAllowance: string;
  periodSelect: number;
  summarySelect: number;
}

const Parameters = ({ onCompute }: Props) => {
  const [formState, setFormState] = useState<FormState>({
    salaryInput: "",
    nonTaxableAllowance: "",
    taxableAllowance: "",
    periodSelect: 1,
    summarySelect: 1,
  });
  const [error, setError] = useState<string | null>(null);

  const handleNumericChange = useCallback(
    (key: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = event.target.value.replace(/,/g, "");
      const number = Number(rawValue);
      if (!isNaN(number) && number >= 0) {
        setFormState((prev) => ({
          ...prev,
          [key]: number.toLocaleString(),
        }));
        setError(null);
      } else {
        setError("Please enter a valid non-negative number");
      }
    },
    []
  );

  const handleOnSelectChange = useCallback(
    (key: keyof FormState) => (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = Number(event.target.value);
      if (!isNaN(selectedValue)) {
        setFormState((prev) => ({
          ...prev,
          [key]: selectedValue,
        }));
        setError(null);
      }
    },
    []
  );

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const parsedSalary = parseFloat(formState.salaryInput.replace(/,/g, ""));
      if (isNaN(parsedSalary) || parsedSalary <= 0) {
        setError("Basic pay must be a positive number");
        return;
      }

      const salaryInfo: SalaryInformation = {
        salary: parsedSalary,
        nonTaxableAllowance:
          parseFloat(formState.nonTaxableAllowance.replace(/,/g, "")) || 0,
        taxableAllowance:
          parseFloat(formState.taxableAllowance.replace(/,/g, "")) || 0,
        period: formState.periodSelect,
      };

      const salaryObj = salary(salaryInfo);
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
      setError(null);
    },
    [formState, onCompute]
  );

  const handleReset = useCallback(() => {
    setFormState({
      salaryInput: "",
      nonTaxableAllowance: "",
      taxableAllowance: "",
      periodSelect: 1,
      summarySelect: 1,
    });
    onCompute(defaultComputedSalary);
    setError(null);
  }, [onCompute]);

  return (
    <Card className="w-full lg:w-1/3 bg-gray-300/40 p-6 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold text-purple-600 mb-2">Parameters</h2>
        <p className="text-gray-700 mb-6">
          Please input your salary information
        </p>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {inputFields.map(({ id, fieldName, stateKey }) => (
          <InputBox
            key={id}
            inputBox={{ id, fieldName, value: formState[stateKey].toString() }}
            handleOnChange={handleNumericChange(stateKey)}
          >
            <TbCurrencyPeso className="text-black" size={20} />
          </InputBox>
        ))}
        <SelectionBox
          selectionBox={{
            id: "period",
            fieldName: "Period",
            value: formState.periodSelect,
          }}
          handleOnChange={handleOnSelectChange("periodSelect")}
        >
          {PERIOD.map((period, index) => (
            <option key={index} value={period.periodValue}>
              {period.periodText}
            </option>
          ))}
        </SelectionBox>
        {/* <SelectionBox
          selectionBox={{
            id: "summary",
            fieldName: "Computation Summary Calculation",
            value: formState.summarySelect,
          }}
          handleOnChange={handleOnSelectChange("summarySelect")}
        >
          {SUMMARY_COMPUTATION.map((summaryComp, index) => (
            <option key={index} value={summaryComp.summaryCompValue}>
              {summaryComp.summaryCompText}
            </option>
          ))}
        </SelectionBox> */}
        <div className="flex justify-end items-center gap-4 mt-4">
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
  );
};

export default Parameters;
