import { ComputationKeys } from "../types/global";

export const salaryComputations: ComputationKeys[] = [
  { label: "Basic Pay", key: "salary" },
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
