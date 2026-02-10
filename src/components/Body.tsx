import Heading from "./Heading";
import { useState, useCallback, useMemo } from "react";
import { Computations, ComputedSalary } from "../types/global";
import Parameters from "./Parameters";
import ComputationSummary from "./ComputationSummary";
import { computationLabelKeys, defaultComputedSalary } from "../constants/Constants";
import SalaryChart from "./SalaryChart";

type Tab = "params" | "results" | "chart";

const TABS: { id: Tab; label: string }[] = [
  { id: "params",  label: "Parameters" },
  { id: "results", label: "Summary"    },
  { id: "chart",   label: "Chart"      },
];

const Body = () => {
  const [computedSalary, setComputedSalary] = useState<ComputedSalary>(defaultComputedSalary);
  const [activeTab, setActiveTab] = useState<Tab>("params");

  const handleCompute = useCallback((cs: ComputedSalary) => {
    setComputedSalary(cs);
    setActiveTab("results");
  }, []);

  const computation: Computations = useMemo(
    () => ({ computationLabelKeys, computedSalary }),
    [computedSalary],
  );

  return (
    <div className="min-h-screen bg-gray-50 font-serrat">
      <div className="container mx-auto px-4 py-8">
        {/* Heading — hidden on print */}
        <div className="no-print">
          <Heading />
        </div>

        {/* Mobile tab switcher — hidden on desktop and on print */}
        <div className="no-print flex lg:hidden mt-6 rounded-xl bg-white/90 border border-gray-200 shadow-sm overflow-hidden">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                  : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards — all visible on desktop; tab-controlled on mobile */}
        <div className="flex flex-col lg:flex-row gap-5 mt-4 lg:mt-8">
          <div className={`no-print ${activeTab === "params" ? "block lg:block" : "hidden lg:block"}`}>
            <Parameters onCompute={handleCompute} />
          </div>
          <div className={activeTab === "results" ? "block lg:block" : "hidden lg:block"}>
            <ComputationSummary computation={computation} />
          </div>
          <div className={`no-print ${activeTab === "chart" ? "block lg:block" : "hidden lg:block"}`}>
            <SalaryChart computedSalary={computedSalary} />
          </div>
        </div>

        {/* Disclaimer footer — hidden on print */}
        <p className="no-print mt-6 text-center text-xs text-gray-400 max-w-2xl mx-auto">
          For estimation purposes only. Actual tax may differ due to year-to-date adjustments,
          benefits, and other factors. Consult a tax professional or visit{" "}
          <a
            href="https://www.bir.gov.ph"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600"
          >
            bir.gov.ph
          </a>{" "}
          for official guidance.
        </p>
      </div>
    </div>
  );
};

export default Body;
