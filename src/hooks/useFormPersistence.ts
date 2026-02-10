import { useCallback } from "react";

const STORAGE_KEY = "ph-tax-form";

export interface PersistedFormState {
  salaryInput: string;
  nonTaxableAllowance: string;
  taxableAllowance: string;
  periodSelect: number;
}

export function useFormPersistence() {
  const getInitialState = (): Partial<PersistedFormState> | null => {
    const params = new URLSearchParams(window.location.search);
    const urlSalary = params.get("salary");
    if (urlSalary) {
      return {
        salaryInput: urlSalary,
        nonTaxableAllowance: params.get("nonTaxable") ?? "",
        taxableAllowance: params.get("taxable") ?? "",
        periodSelect: Number(params.get("period") ?? 1),
      };
    }
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved) as Partial<PersistedFormState>;
      } catch {
        /* ignore invalid JSON */
      }
    }
    return null;
  };

  const persist = useCallback((state: PersistedFormState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, []);

  const clearSaved = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { getInitialState, persist, clearSaved };
}
