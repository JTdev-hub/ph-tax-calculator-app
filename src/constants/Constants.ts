import { ComputedSalary } from "../types/types";

type ComputedSalaryKeys = keyof ComputedSalary;
export const salaryComputations: [string, ComputedSalaryKeys][] = [
  ["Basic Pay", "salary"],
  ["Taxable Income", "taxableIncome"],
  ["Witholding Tax", "monthlyEstimatedTax"],
];

export const contributionComputations: [string, ComputedSalaryKeys][] = [
  ["SSS", "sssContribution"],
  ["PhilHealth", "philHealthContribution"],
  ["Pag-IBIG", "pagIbigContribution"],
];

export const totalDeductions: [string, ComputedSalaryKeys][] = [
  ["Total Contributions", "totalContribution"],
  ["Total Deductions", "totalDeductions"],
];

export const totalComputations: [string, ComputedSalaryKeys][] = [
  ["Net Pay", "netSalary"],
];
