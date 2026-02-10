import {
  ComputationKeys,
  ComputationLabelKeys,
  ComputedSalary,
  Period,
  SalaryAllocation,
  SalaryInformation,
  SummaryComputation,
} from "../types/global";

export const salaryComputations: ComputationKeys[] = [
  { label: "Basic Pay", key: "salary" },
  { label: "Non-taxable Income", key: "nonTaxableAllowance" },
  { label: "Taxable Income", key: "taxableAllowance" },
  { label: "Taxable Compensation Income", key: "taxableIncome" },
  { label: "Withholding Tax", key: "monthlyEstimatedTax" },
  { label: "Daily Rate", key: "dailySalary" },
];

export const contributionComputations: ComputationKeys[] = [
  { label: "SSS", key: "sssContribution" },
  { label: "PhilHealth", key: "philHealthContribution" },
  { label: "Pag-IBIG", key: "pagIbigContribution" },
];

export const totalDeductions: ComputationKeys[] = [
  { label: "Total Contributions", key: "totalContribution" },
  { label: "Total Deductions", key: "totalDeductions" },
];

export const totalComputations: ComputationKeys[] = [
  { label: "Net Pay", key: "netSalary" },
];

export const computationLabelKeys: ComputationLabelKeys = {
  salaryComputations,
  contributionComputations,
  totalDeductions,
  totalComputations,
};

export const defaultComputedSalary: ComputedSalary = {
  salary: 0,
  nonTaxableAllowance: 0,
  taxableAllowance: 0,
  taxableIncome: 0,
  monthlyEstimatedTax: 0,
  sssContribution: 0,
  pagIbigContribution: 0,
  philHealthContribution: 0,
  netSalary: 0,
  dailySalary: 0,
  totalDeductions: 0,
  totalContribution: 0,
  period: 1,
};

export const PERIOD: Period[] = [
  { periodValue: 1, periodText: "Monthly" },
  { periodValue: 2, periodText: "Semi-Monthly" },
];

export const SUMMARY_COMPUTATION: SummaryComputation[] = [
  { summaryCompValue: 12, summaryCompText: "Annual" },
  { summaryCompValue: 1, summaryCompText: "Monthly" },
  { summaryCompValue: 2, summaryCompText: "Semi-Monthly" },
];

export const defaultSalaryInformation: SalaryInformation = {
  salary: 0,
  nonTaxableAllowance: 0,
  taxableAllowance: 0,
  period: 1,
};

export const defaultSalaryAllocation: SalaryAllocation = {
  needs: 0.5,
  savings: 0.3,
  wants: 0.2,
};

export const DE_MINIMIS_BENEFITS: { name: string; cap: string }[] = [
  { name: "Rice Subsidy",                           cap: "₱2,000 / month" },
  { name: "Clothing / Uniform Allowance",           cap: "₱6,000 / year" },
  { name: "Medical Cash Allowance to Dependents",   cap: "₱1,500 / semester" },
  { name: "Actual Medical Assistance",              cap: "₱10,000 / year" },
  { name: "Laundry Allowance",                      cap: "₱300 / month" },
  { name: "Employee Achievement Awards (non-cash)", cap: "₱10,000 / year" },
  { name: "Christmas / Anniversary Gifts",          cap: "₱5,000 / year" },
];
