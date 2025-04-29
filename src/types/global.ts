export interface TaxBracket {
  min: number;
  max: number;
  percentOver: number;
  baseTax: number;
  excessOver: number;
}

export interface SocialSecurityBracket {
  min: number;
  max: number;
  regularSS: number;
  mpf: number;
}

export interface PagIbigBracket {
  min: number;
  max: number;
  employeeShare: number;
}

export interface PhilhealthBracket {
  min: number;
  max: number;
  premiumRate: number;
}

type ComputedSalaryKeys = keyof ComputedSalary;

export interface ComputationKeys {
  label: string;
  key: ComputedSalaryKeys;
}

export interface ComputedSalary {
  salary: number;
  taxableIncome: number;
  monthlyEstimatedTax: number;
  sssContribution: number;
  pagIbigContribution: number;
  philHealthContribution: number;
  netSalary: number;
  totalDeductions: number;
  totalContribution: number;
}

export interface ComputationLabelKeys {
  salaryComputations: ComputationKeys[];
  contributionComputations: ComputationKeys[];
  totalDeductions: ComputationKeys[];
  totalComputations: ComputationKeys[];
}

export interface Computations {
  computationLabelKeys: ComputationLabelKeys;
  computedSalary: ComputedSalary;
}

export const defaultComputedSalary: ComputedSalary = {
  salary: 0,
  taxableIncome: 0,
  monthlyEstimatedTax: 0,
  sssContribution: 0,
  pagIbigContribution: 0,
  philHealthContribution: 0,
  netSalary: 0,
  totalDeductions: 0,
  totalContribution: 0,
};
