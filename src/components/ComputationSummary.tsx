import Card from "./Card";
import { Computations } from "../types/global";
import { formatPeso } from "../utils/format";

interface Props {
  computation: Computations;
}

const ComputationSummary = ({ computation }: Props) => {
  return (
    <Card className="h-full bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1.5 h-8 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Computation Summary
          </h2>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed pl-5">
          Tax calculation based on current contribution matrices and TRAIN Law
        </p>
      </div>

      <div className="space-y-5">
        {/* Salary Computations */}
        <div className="group">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-gray-100 group-hover:border-purple-200 transition-colors duration-200">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <h3 className="font-semibold text-base text-gray-800">
              Salary Computations
            </h3>
          </div>
          <div className="space-y-2.5 pl-4">
            {computation.computationLabelKeys.salaryComputations.map(
              (salaryComputation) => (
                <div
                  key={salaryComputation.key}
                  className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-purple-50/50 transition-colors duration-150"
                >
                  <span className="text-sm text-gray-700">
                    {salaryComputation.label}
                  </span>
                  <span className="font-semibold text-gray-900 text-sm tabular-nums">
                    {formatPeso(
                      computation.computedSalary[salaryComputation.key]
                    )}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Contributions */}
        <div className="group">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-gray-100 group-hover:border-indigo-200 transition-colors duration-200">
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <h3 className="font-semibold text-base text-gray-800">
              Contributions
            </h3>
          </div>
          <div className="space-y-2.5 pl-4">
            {computation.computationLabelKeys.contributionComputations.map(
              (contributionComputation) => (
                <div
                  key={contributionComputation.key}
                  className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-indigo-50/50 transition-colors duration-150"
                >
                  <span className="text-sm text-gray-700">
                    {contributionComputation.label}
                  </span>
                  <span className="font-semibold text-gray-900 text-sm tabular-nums">
                    {formatPeso(
                      computation.computedSalary[contributionComputation.key]
                    )}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Total Deductions */}
        <div className="group">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-gray-100 group-hover:border-red-200 transition-colors duration-200">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <h3 className="font-semibold text-base text-gray-800">
              Total Deductions
            </h3>
          </div>
          <div className="space-y-2.5 pl-4">
            {computation.computationLabelKeys.totalDeductions.map(
              (totalDeduction) => (
                <div
                  key={totalDeduction.key}
                  className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-red-50/50 transition-colors duration-150"
                >
                  <span className="text-sm text-gray-700">
                    {totalDeduction.label}
                  </span>
                  <span className="font-semibold text-gray-900 text-sm tabular-nums">
                    {formatPeso(computation.computedSalary[totalDeduction.key])}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Total Computations - Highlighted */}
        <div className="mt-6 p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-200/50 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600" />
            <h3 className="font-bold text-base text-gray-800">
              Total Computations
            </h3>
          </div>
          <div className="space-y-3">
            {computation.computationLabelKeys.totalComputations.map(
              (totalComputation) => (
                <div
                  key={totalComputation.key}
                  className="flex justify-between items-center py-2.5 px-3 bg-white/70 rounded-lg"
                >
                  <span className="text-sm font-medium text-gray-800">
                    {totalComputation.label}
                  </span>
                  <span className="font-bold text-base text-purple-700 tabular-nums">
                    {formatPeso(
                      computation.computedSalary[totalComputation.key]
                    )}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ComputationSummary;
