import { useState, useRef, useCallback, useEffect } from "react";
import { ComputedSalary } from "../types/global";
import { formatPeso } from "../utils/format";

export type CopyStatus = "idle" | "text" | "url";

export function useCopyShare(computedSalary: ComputedSalary) {
  const { salary, nonTaxableAllowance, taxableAllowance, period } = computedSalary;
  const totalGross = salary + taxableAllowance + nonTaxableAllowance;
  const effectiveTaxRate =
    totalGross > 0 ? (computedSalary.monthlyEstimatedTax / totalGross) * 100 : 0;
  const annualTax = computedSalary.monthlyEstimatedTax * 12;

  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleReset = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopyStatus("idle"), 2000);
  }, []);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const handleCopyText = useCallback(async () => {
    const cs = computedSalary;
    const lines = [
      "=== PH Tax Computation ===",
      `Basic Pay:                    ${formatPeso(salary)}`,
      `Non-taxable Income:           ${formatPeso(nonTaxableAllowance)}`,
      `Taxable Allowance:            ${formatPeso(taxableAllowance)}`,
      `Taxable Compensation Income:  ${formatPeso(cs.taxableIncome)}`,
      `Withholding Tax:              ${formatPeso(cs.monthlyEstimatedTax)}`,
      `Daily Rate:                   ${formatPeso(cs.dailySalary)}`,
      "---",
      `SSS:                          ${formatPeso(cs.sssContribution)}`,
      `PhilHealth:                   ${formatPeso(cs.philHealthContribution)}`,
      `Pag-IBIG:                     ${formatPeso(cs.pagIbigContribution)}`,
      "---",
      `Total Contributions:          ${formatPeso(cs.totalContribution)}`,
      `Total Deductions:             ${formatPeso(cs.totalDeductions)}`,
      "---",
      `Net Pay:                      ${formatPeso(cs.netSalary)}`,
      `Effective Tax Rate:           ${effectiveTaxRate.toFixed(2)}%`,
      `Annual Tax:                   ${formatPeso(annualTax)}`,
    ];
    await navigator.clipboard.writeText(lines.join("\n"));
    setCopyStatus("text");
    scheduleReset();
  }, [computedSalary, salary, nonTaxableAllowance, taxableAllowance, effectiveTaxRate, annualTax, scheduleReset]);

  const handleShareUrl = useCallback(async () => {
    const params = new URLSearchParams({
      salary: (salary / period).toString(),
      nonTaxable: (nonTaxableAllowance / period).toString(),
      taxable: (taxableAllowance / period).toString(),
      period: period.toString(),
    });
    const url = `${window.location.origin}${window.location.pathname}?${params}`;
    await navigator.clipboard.writeText(url);
    setCopyStatus("url");
    scheduleReset();
  }, [salary, nonTaxableAllowance, taxableAllowance, period, scheduleReset]);

  return { copyStatus, handleCopyText, handleShareUrl, effectiveTaxRate, annualTax };
}
