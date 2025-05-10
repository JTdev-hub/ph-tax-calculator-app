import {
  ComputationKeys,
  ComputationLabelKeys,
  ComputedSalary,
  Period,
  SalaryAllocation,
  SalaryInformation,
} from "../types/global";

export const salaryComputations: ComputationKeys[] = [
  { label: "Basic Pay", key: "salary" },
  { label: "Non-taxable Allowance", key: "nonTaxableAllowance" },
  { label: "Taxable Income", key: "taxableIncome" },
  { label: "Withholding Tax", key: "monthlyEstimatedTax" },
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
  taxableIncome: 0,
  monthlyEstimatedTax: 0,
  sssContribution: 0,
  pagIbigContribution: 0,
  philHealthContribution: 0,
  netSalary: 0,
  totalDeductions: 0,
  totalContribution: 0,
};

export const PERIOD: Period[] = [
  { periodValue: 1, periodText: "Monthly" },
  { periodValue: 2, periodText: "Semi-Monthly" },
];

export const defaultSalaryInformation: SalaryInformation = {
  salary: 0,
  nonTaxableAllowance: 0,
  period: 1,
};

export const defaultSalaryAllocation: SalaryAllocation = {
  needs: 0.5,
  savings: 0.2,
  wants: 0.3,
};
