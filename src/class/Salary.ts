import {
  TaxBracket,
  PhilhealthBracket,
  PagIbigBracket,
  SocialSecurityBracket,
} from "../types/global";

class Salary {
  _salary: number;
  _annualSalary: number;
  applicableTaxBracket: TaxBracket;
  applicablePhilhealthBracket: PhilhealthBracket;
  applicablePagIbigBracket: PagIbigBracket;
  applicableSSSBracket: SocialSecurityBracket;

  private static readonly TAX_BRACKETS: TaxBracket[] = [
    {
      min: 0,
      max: 0,
      baseTax: 0,
      percentOver: 0,
      excessOver: 0,
    },
    {
      min: 0,
      max: 250_000,
      baseTax: 0,
      percentOver: 0,
      excessOver: 0,
    },
    {
      min: 250_000,
      max: 400_000,
      baseTax: 0,
      percentOver: 0.15,
      excessOver: 250_000,
    },
    {
      min: 400_000,
      max: 800_000,
      baseTax: 22_500,
      percentOver: 0.2,
      excessOver: 400_000,
    },
    {
      min: 800_000,
      max: 2_000_000,
      baseTax: 102_500,
      percentOver: 0.25,
      excessOver: 800_000,
    },
    {
      min: 2_000_000,
      max: 8_000_000,
      baseTax: 402_500,
      percentOver: 0.3,
      excessOver: 2_000_000,
    },

    {
      min: 8_000_000,
      max: Infinity,
      baseTax: 2_202_500,
      percentOver: 0.35,
      excessOver: 8_000_000,
    },
  ];

  private static readonly SSS_BRACKET: SocialSecurityBracket[] = [
    {
      min: 0,
      max: 0,
      regularSS: 0,
      mpf: 0,
    },
    { min: 0, max: 5250, regularSS: 250, mpf: 0 },
    { min: 5250, max: 5750, regularSS: 275, mpf: 0 },
    { min: 5750, max: 6250, regularSS: 300, mpf: 0 },
    { min: 6250, max: 6750, regularSS: 325, mpf: 0 },
    { min: 6750, max: 7250, regularSS: 350, mpf: 0 },
    { min: 7250, max: 7750, regularSS: 375, mpf: 0 },
    { min: 7750, max: 8250, regularSS: 400, mpf: 0 },
    { min: 8250, max: 8750, regularSS: 425, mpf: 0 },
    { min: 8750, max: 9250, regularSS: 450, mpf: 0 },
    { min: 9250, max: 9750, regularSS: 475, mpf: 0 },
    { min: 9750, max: 10250, regularSS: 500, mpf: 0 },
    { min: 10250, max: 10750, regularSS: 525, mpf: 0 },
    { min: 10750, max: 11250, regularSS: 550, mpf: 0 },
    { min: 11250, max: 11750, regularSS: 575, mpf: 0 },
    { min: 11750, max: 12250, regularSS: 600, mpf: 0 },
    { min: 12250, max: 12750, regularSS: 625, mpf: 0 },
    { min: 12750, max: 13250, regularSS: 650, mpf: 0 },
    { min: 13250, max: 13750, regularSS: 675, mpf: 0 },
    { min: 13750, max: 14250, regularSS: 700, mpf: 0 },
    { min: 14250, max: 14750, regularSS: 725, mpf: 0 },
    { min: 14750, max: 15250, regularSS: 750, mpf: 0 },
    { min: 15250, max: 15750, regularSS: 775, mpf: 0 },
    { min: 15750, max: 16250, regularSS: 800, mpf: 0 },
    { min: 16250, max: 16750, regularSS: 825, mpf: 0 },
    { min: 16750, max: 17250, regularSS: 850, mpf: 0 },
    { min: 17250, max: 17750, regularSS: 875, mpf: 0 },
    { min: 17750, max: 18250, regularSS: 900, mpf: 0 },
    { min: 18250, max: 18750, regularSS: 925, mpf: 0 },
    { min: 18750, max: 19250, regularSS: 950, mpf: 0 },
    { min: 19250, max: 19750, regularSS: 975, mpf: 0 },
    { min: 19750, max: 20250, regularSS: 1000, mpf: 0 },
    { min: 20250, max: 20750, regularSS: 1000, mpf: 25 },
    { min: 20750, max: 21250, regularSS: 1000, mpf: 50 },
    { min: 21250, max: 21750, regularSS: 1000, mpf: 75 },
    { min: 21750, max: 22250, regularSS: 1000, mpf: 100 },
    { min: 22250, max: 22750, regularSS: 1000, mpf: 125 },
    { min: 22750, max: 23250, regularSS: 1000, mpf: 150 },
    { min: 23250, max: 23750, regularSS: 1000, mpf: 175 },
    { min: 23750, max: 24250, regularSS: 1000, mpf: 200 },
    { min: 24250, max: 24750, regularSS: 1000, mpf: 225 },
    { min: 24750, max: 25250, regularSS: 1000, mpf: 250 },
    { min: 25250, max: 25750, regularSS: 1000, mpf: 275 },
    { min: 25750, max: 26250, regularSS: 1000, mpf: 300 },
    { min: 26250, max: 26750, regularSS: 1000, mpf: 325 },
    { min: 26750, max: 27250, regularSS: 1000, mpf: 350 },
    { min: 27250, max: 27750, regularSS: 1000, mpf: 375 },
    { min: 27750, max: 28250, regularSS: 1000, mpf: 400 },
    { min: 28250, max: 28750, regularSS: 1000, mpf: 425 },
    { min: 28750, max: 29250, regularSS: 1000, mpf: 450 },
    { min: 29250, max: 29750, regularSS: 1000, mpf: 475 },
    { min: 29750, max: 30250, regularSS: 1000, mpf: 500 },
    { min: 30250, max: 30750, regularSS: 1000, mpf: 525 },
    { min: 30750, max: 31250, regularSS: 1000, mpf: 550 },
    { min: 31250, max: 31750, regularSS: 1000, mpf: 575 },
    { min: 31750, max: 32250, regularSS: 1000, mpf: 600 },
    { min: 32250, max: 32750, regularSS: 1000, mpf: 625 },
    { min: 32750, max: 33250, regularSS: 1000, mpf: 650 },
    { min: 33250, max: 33750, regularSS: 1000, mpf: 675 },
    { min: 33750, max: 34250, regularSS: 1000, mpf: 700 },
    { min: 34250, max: 34750, regularSS: 1000, mpf: 725 },
    { min: 34750, max: Infinity, regularSS: 1000, mpf: 750 },
  ];

  private static readonly PAGIBIG_BRACKET: PagIbigBracket[] = [
    {
      min: 0,
      max: 0,
      employeeShare: 0,
    },
    {
      min: 0,
      max: 1_500,
      employeeShare: 0.01,
    },

    {
      min: 1_500,
      max: Infinity,
      employeeShare: 0.02,
    },
  ];

  private static readonly PHILHEALTH_BRACKET: PhilhealthBracket[] = [
    {
      min: 0,
      max: 0,
      premiumRate: 0,
    },
    {
      min: 0,
      max: 10_000,
      premiumRate: 0.05,
    },

    {
      min: 10_000,
      max: 100_000,
      premiumRate: 0.05,
    },

    {
      min: 100_000,
      max: Infinity,
      premiumRate: 0.05,
    },
  ];

  private findBracket<T extends { min: number; max: number }>(
    brackets: T[],
    salary: number,
    inclusiveMax = false
  ): T {
    const bracket =
      brackets.find((bracket) =>
        inclusiveMax
          ? salary > bracket.min && salary <= bracket.max
          : salary > bracket.min && salary < bracket.max
      ) || brackets[0];

    return bracket;
  }

  constructor(salary: number) {
    this._salary = salary;
    this._annualSalary = this._salary * 12;
    this.applicableTaxBracket = this.findBracket(
      Salary.TAX_BRACKETS,
      this.annualSalary,
      true
    );
    this.applicableSSSBracket = this.findBracket(
      Salary.SSS_BRACKET,
      this.salary
    );
    this.applicablePagIbigBracket = this.findBracket(
      Salary.PAGIBIG_BRACKET,
      this.salary
    );
    this.applicablePhilhealthBracket = this.findBracket(
      Salary.PHILHEALTH_BRACKET,
      this.annualSalary
    );
  }

  get salary(): number {
    return this._salary;
  }

  get annualSalary(): number {
    return this._annualSalary;
  }

  computeSSSContribution(): number {
    return this.applicableSSSBracket.regularSS + this.applicableSSSBracket.mpf;
  }

  computePhilHealthContribution(): number {
    const philHealthContribution =
      this.applicablePhilhealthBracket.premiumRate * this.salary;

    if (this.salary < Salary.PHILHEALTH_BRACKET[1].max) {
      return 500 / 2;
    }

    if (this.salary > Salary.PHILHEALTH_BRACKET[3].min) {
      return 5_000 / 2;
    }
    return philHealthContribution / 2;
  }

  computePagIbigContribution(): number {
    const pagIbigContribution =
      this.applicablePagIbigBracket.employeeShare * this.salary;

    return pagIbigContribution > 200 ? 200 : pagIbigContribution;
  }

  computeContributionTotal(): number {
    return (
      this.computePhilHealthContribution() +
      this.computeSSSContribution() +
      this.computePagIbigContribution()
    );
  }

  computeTaxableIncome(): number {
    const taxableIncome =
      this.salary -
      (this.computeSSSContribution() +
        this.computePagIbigContribution() +
        this.computePhilHealthContribution());

    return taxableIncome < 1 ? 0 : taxableIncome;
  }

  computeMonthlyTax() {
    return (
      (this.applicableTaxBracket.baseTax +
        (this.computeTaxableIncome() * 12 -
          this.applicableTaxBracket.excessOver) *
          this.applicableTaxBracket.percentOver) /
      12
    );
  }

  computeAnnualTax() {
    return this.computeMonthlyTax() * 12;
  }

  computeNetSalary(): number {
    return this.computeTaxableIncome() - this.computeMonthlyTax();
  }

  computeTotalDeductions(): number {
    return this.computeMonthlyTax() + this.computeContributionTotal();
  }
}

const salary = (salary: number) => new Salary(salary);

export default salary;
