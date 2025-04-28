import Heading from "./Heading";
import Card from "./Card";
import { TbCurrencyPeso } from "react-icons/tb";
import salary from "../class/Salary";
import { FormEvent, useState } from "react";
import {
  salaryComputations,
  contributionComputations,
  totalComputations,
  totalDeductions,
} from "../constants/Constants";
import { ComputedSalary } from "../types/types";
import { formatPeso } from "../utils/format";

const Body = () => {
  const [salaryInput, setSalaryInput] = useState<string>("");

  const [computedSalary, setComputedSalary] = useState<ComputedSalary>({
    taxableIncome: 0,
    salary: 0,
    monthlyEstimatedTax: 0,
    sssContribution: 0,
    pagIbigContribution: 0,
    philHealthContribution: 0,
    netSalary: 0,
    totalDeductions: 0,
    totalContribution: 0,
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/,/g, ""); // remove commas\
    const number = Number(rawValue);
    if (!isNaN(number)) {
      setSalaryInput(number.toLocaleString());
    } else {
      setSalaryInput(""); // Reset if not a valid number
    }
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (salaryInput !== null && salaryInput !== "" && salaryInput !== "0") {
      const salaryObj = salary(parseInt(salaryInput.replace(/,/g, ""), 10));
      setComputedSalary({
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
    setComputedSalary({
      taxableIncome: 0,
      salary: 0,
      monthlyEstimatedTax: 0,
      sssContribution: 0,
      pagIbigContribution: 0,
      philHealthContribution: 0,
      netSalary: 0,
      totalDeductions: 0,
      totalContribution: 0,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-serrat">
      <div className="container mx-auto px-4 py-8">
        <Heading />

        <div className="flex flex-col gap-6 mt-8">
          {/* Input Card */}
          <Card className="bg-gray-300/40 p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-bold text-purple-600 mb-2">
                Parameters
              </h2>
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

          {/* Results Card */}
          <Card className="bg-gray-300/40 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-purple-600 mb-2">
              Computation Summary
            </h2>
            <p className="text-gray-700 mb-6">
              Shows the tax calculation based on the current contribution
              matrices and TRAIN Law
            </p>

            <div className="space-y-6">
              {/* Salary Computations */}
              <div>
                <h3 className="font-semibold text-lg mb-3 border-b pb-1">
                  Salary Computations
                </h3>
                <div className="space-y-3">
                  {salaryComputations.map(([label, amount]) => (
                    <div
                      key={label}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-700">{label}</span>
                      <span className="font-medium">
                        {formatPeso(computedSalary[amount])}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contributions */}
              <div>
                <h3 className="font-semibold text-lg mb-3 border-b pb-1">
                  Contributions
                </h3>
                <div className="space-y-3">
                  {contributionComputations.map(([label, amount]) => (
                    <div
                      key={label}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-700">{label}</span>
                      <span className="font-medium">
                        {formatPeso(computedSalary[amount])}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Deductions */}
              <div>
                <h3 className="font-semibold text-lg mb-3 border-b pb-1"></h3>
                <div className="space-y-3">
                  {totalDeductions.map(([label, amount]) => (
                    <div
                      key={label}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-700">{label}</span>
                      <span className="font-medium">
                        {formatPeso(computedSalary[amount])}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Computations */}
              <div>
                <h3 className="font-semibold text-lg mb-3 border-b pb-1">
                  Total Computations
                </h3>
                <div className="space-y-3">
                  {totalComputations.map(([label, amount]) => (
                    <div
                      key={label}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-700">{label}</span>
                      <span className="font-medium">
                        {formatPeso(computedSalary[amount])}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Body;
