import Heading from "./Heading";
import { useState } from "react";

import {
  Computations,
  ComputedSalary,
  defaultComputedSalary,
} from "../types/global";

import Parameters from "./Parameters";
import ComputationSummary from "./ComputationSummary";
import { computationLabelKeys } from "../constants/Constants";

const Body = () => {
  const [computedSalary, setComputedSalary] = useState<ComputedSalary>(
    defaultComputedSalary
  );

  const computation: Computations = {
    computationLabelKeys: computationLabelKeys,
    computedSalary: computedSalary,
  };

  return (
    <div className="min-h-screen bg-gray-50 font-serrat">
      <div className="container mx-auto px-4 py-8">
        <Heading />

        <div className="flex flex-col gap-6 mt-8">
          {/* Input Card */}
          <Parameters onCompute={setComputedSalary} />
          {/* Summary Card */}
          <ComputationSummary computation={computation} />
        </div>
      </div>
    </div>
  );
};

export default Body;
