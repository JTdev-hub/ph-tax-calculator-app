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
