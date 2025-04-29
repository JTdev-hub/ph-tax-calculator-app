import Card from "./Card";
import { Computations } from "../types/global";
import { formatPeso } from "../utils/format";

interface Props {
  computation: Computations;
}

const ComputationSummary = ({ computation }: Props) => {
  return (
    <>
      {/* Results Card */}
      <Card className="bg-gray-300/40 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-purple-600 mb-2">
          Computation Summary
        </h2>
        <p className="text-gray-700 mb-6">
          Shows the tax calculation based on the current contribution matrices
          and TRAIN Law
        </p>

        <div className="space-y-6">
          {/* Salary Computations */}
          <div>
            <h3 className="font-semibold text-lg mb-3 border-b pb-1">
              Salary Computations
            </h3>
            <div className="space-y-3">
              {computation.computationLabelKeys.salaryComputations.map(
                (salaryComputation) => (
                  <div
                    key={salaryComputation.key}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-700">
                      {salaryComputation.label}
                    </span>
                    <span className="font-medium">
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
          <div>
            <h3 className="font-semibold text-lg mb-3 border-b pb-1">
              Contributions
            </h3>
            <div className="space-y-3">
              {computation.computationLabelKeys.contributionComputations.map(
                (contributionComputation) => (
                  <div
                    key={contributionComputation.key}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-700">
                      {contributionComputation.label}
                    </span>
                    <span className="font-medium">
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
          <div>
            <h3 className="font-semibold text-lg mb-3 border-b pb-1"></h3>
            <div className="space-y-3">
              {computation.computationLabelKeys.totalDeductions.map(
                (totalDeduction) => (
                  <div
                    key={totalDeduction.key}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-700">
                      {totalDeduction.label}
                    </span>
                    <span className="font-medium">
                      {formatPeso(
                        computation.computedSalary[totalDeduction.key]
                      )}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Total Computations */}
          <div>
            <h3 className="font-semibold text-lg mb-3 border-b pb-1">
              Total Computations
            </h3>
            <div className="space-y-3">
              {computation.computationLabelKeys.totalComputations.map(
                (totalComputation) => (
                  <div
                    key={totalComputation.key}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-700">
                      {totalComputation.label}
                    </span>
                    <span className="font-medium">
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
    </>
  );
};

export default ComputationSummary;
