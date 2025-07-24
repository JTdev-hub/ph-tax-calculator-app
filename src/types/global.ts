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
  nonTaxableAllowance: number;
  taxableAllowance: number;
  taxableIncome: number;
  monthlyEstimatedTax: number;
  sssContribution: number;
  pagIbigContribution: number;
  philHealthContribution: number;
  netSalary: number;
  dailySalary: number;
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

export interface Period {
  periodValue: number;
  periodText: string;
}

export interface SummaryComputation {
  summaryCompValue: number;
  summaryCompText: string;
}

export interface SalaryInformation {
  salary: number;
  nonTaxableAllowance: number;
  taxableAllowance: number;
  period: number;
}

export interface InputBoxProps {
  id: string;
  fieldName: string;
  value: string;
  placeholder?: string;
}

export interface SelectionBoxProps {
  id: string;
  fieldName: string;
  value: number;
}

export interface SalaryAllocation {
  needs: number;
  savings: number;
  wants: number;
}
