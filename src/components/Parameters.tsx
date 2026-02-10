import React, { FormEvent, useReducer, useState, useCallback, useEffect } from "react";
import Card from "./Card";
import { TbCurrencyPeso } from "react-icons/tb";
import salary from "../class/Salary";
import { ComputedSalary, SalaryInformation } from "../types/global";
import {
  defaultComputedSalary,
  PERIOD,
  DE_MINIMIS_BENEFITS,
} from "../constants/Constants";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import InputBox from "./InputBox";
import SelectionBox from "./SelectionBox";
import { useFormPersistence } from "../hooks/useFormPersistence";

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

// Form state — module-level so reducer and initial state can live here too
interface FormState {
  salaryInput: string;
  nonTaxableAllowance: string;
  taxableAllowance: string;
  periodSelect: number;
}

type FormAction =
  | { type: "SET_FIELD"; key: keyof FormState; value: string | number }
  | { type: "RESET" }
  | { type: "RESTORE"; state: Partial<FormState> };

const INITIAL_FORM_STATE: FormState = {
  salaryInput: "",
  nonTaxableAllowance: "",
  taxableAllowance: "",
  periodSelect: 1,
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.key]: action.value };
    case "RESET":
      return INITIAL_FORM_STATE;
    case "RESTORE":
      return { ...state, ...action.state };
    default:
      return state;
  }
}

const Parameters = ({ onCompute }: Props) => {
  const [formState, dispatch] = useReducer(formReducer, INITIAL_FORM_STATE);
  const [error, setError] = useState<string | null>(null);
  const [showDeMinimis, setShowDeMinimis] = useState<boolean>(false);

  const { getInitialState, persist, clearSaved } = useFormPersistence();

  // Restore from URL params (priority) or localStorage on mount
  useEffect(() => {
    const restored = getInitialState();
    if (restored) dispatch({ type: "RESTORE", state: restored });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFieldChange = useCallback(
    (key: keyof FormState) => (raw: string) => {
      dispatch({ type: "SET_FIELD", key, value: raw });
      setError(null);
    },
    [],
  );

  const handleOnSelectChange = useCallback(
    (key: keyof FormState) => (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = Number(event.target.value);
      if (!isNaN(selectedValue)) {
        dispatch({ type: "SET_FIELD", key, value: selectedValue });
        setError(null);
      }
    },
    [],
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
        period: formState.periodSelect,
      });
      persist(formState);
      setError(null);
    },
    [formState, onCompute, persist],
  );

  const handleReset = useCallback(() => {
    dispatch({ type: "RESET" });
    onCompute(defaultComputedSalary);
    clearSaved();
    setError(null);
  }, [onCompute, clearSaved]);

  return (
    <Card className="h-full bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <form onSubmit={handleSubmit} className="h-full flex flex-col">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-8 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Parameters
            </h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed pl-5">
            Enter your salary details to calculate taxes and contributions
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg animate-shake">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-red-500 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium text-red-800">{error}</span>
            </div>
          </div>
        )}

        {/* Form Fields */}
        <div className="flex-1 space-y-1">
          {inputFields.map(({ id, fieldName, stateKey }) => (
            <InputBox
              key={id}
              inputBox={{
                id,
                fieldName,
                value: formState[stateKey].toString(),
                type: "Parameters",
              }}
              onValueChange={handleFieldChange(stateKey)}
            >
              <TbCurrencyPeso className="text-gray-500" size={20} />
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
        </div>
        {/* De Minimis Benefits Info Toggle */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setShowDeMinimis((prev) => !prev)}
            className="flex w-full items-center justify-between rounded-lg border border-purple-200 bg-purple-50 px-3 py-2 text-sm font-medium text-purple-700 hover:bg-purple-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
          >
            <span>Non-taxable De Minimis Benefits (BIR caps)</span>
            {showDeMinimis ? (
              <ChevronUpIcon className="h-4 w-4 text-purple-500" />
            ) : (
              <ChevronDownIcon className="h-4 w-4 text-purple-500" />
            )}
          </button>
          {showDeMinimis && (
            <div className="mt-1 rounded-lg border border-purple-200 bg-purple-50 px-3 py-2">
              <ul className="space-y-1.5">
                {DE_MINIMIS_BENEFITS.map((benefit) => (
                  <li
                    key={benefit.name}
                    className="flex items-start justify-between gap-2 text-xs"
                  >
                    <span className="text-gray-700">{benefit.name}</span>
                    <span className="shrink-0 font-medium text-purple-700 tabular-nums">
                      {benefit.cap}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-gray-400">
                Per RR 11-2018 and subsequent BIR issuances
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Reset Button */}
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 px-5 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-200/50 active:scale-95 transition-all duration-200 shadow-sm"
            >
              Reset
            </button>

            {/* Compute Button - Primary CTA */}
            <button
              type="submit"
              className="relative flex-1 group overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-500/50 active:scale-95 transition-all duration-200"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <span className="relative flex items-center justify-center gap-2">
                Compute Salary
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </button>
          </div>

          {/* Helper text */}
          <p className="mt-3 text-xs text-center text-gray-500">
            All calculations follow BIR and 2025 contribution rates
          </p>
        </div>
      </form>
    </Card>
  );
};

export default Parameters;
