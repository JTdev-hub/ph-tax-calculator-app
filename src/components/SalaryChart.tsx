import { defaultSalaryAllocation } from "../constants/Constants";
import { ComputedSalary, SalaryAllocation } from "../types/global";
import Card from "./Card";
import { ResponsivePie } from "@nivo/pie";
import InputBox from "./InputBox";
import { useState, useMemo } from "react";
import { TbPercentage } from "react-icons/tb";

interface Props {
  computedSalary: ComputedSalary;
}

const SalaryChart = ({ computedSalary }: Props) => {
  const [allocation, setAllocation] = useState<SalaryAllocation>({
    needs: defaultSalaryAllocation.needs,
    savings: defaultSalaryAllocation.savings,
    wants: defaultSalaryAllocation.wants,
  });
  const [error, setError] = useState<string | null>(null);

  // Memoize pie chart data with modern colors
  const data = useMemo(
    () => [
      {
        id: "Needs",
        label: "Needs",
        value: computedSalary.netSalary * allocation.needs,
        color: "hsl(262, 83%, 58%)", // Purple
      },
      {
        id: "Savings",
        label: "Savings",
        value: computedSalary.netSalary * allocation.savings,
        color: "hsl(221, 83%, 53%)", // Indigo
      },
      {
        id: "Wants",
        label: "Wants",
        value: computedSalary.netSalary * allocation.wants,
        color: "hsl(204, 94%, 74%)", // Light blue
      },
    ],
    [
      computedSalary.netSalary,
      allocation.needs,
      allocation.savings,
      allocation.wants,
    ]
  );

  // Calculate totals for display
  const totalAllocation =
    allocation.needs + allocation.savings + allocation.wants;
  const remaining = 1 - totalAllocation;

  // Handle allocation input changes
  const handleAllocationChange =
    (key: keyof SalaryAllocation) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = event.target.value.replace(/,/g, "");
      const number = Number(rawValue) / 100;
      if (!isNaN(number) && number >= 0 && number <= 1) {
        setAllocation((prev) => {
          const newAllocation = { ...prev, [key]: number };
          const total =
            newAllocation.needs + newAllocation.savings + newAllocation.wants;
          if (total > 1) {
            setError("Total allocation cannot exceed 100%");
            return prev;
          }
          setError(null);
          return newAllocation;
        });
      } else {
        setError("Please enter a valid percentage between 0 and 100");
      }
    };

  const CenteredMetric = ({
    centerX,
    centerY,
  }: {
    centerX: number;
    centerY: number;
  }) => {
    return (
      <g>
        <text
          x={centerX}
          y={centerY - 10}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: 12,
            fontWeight: 600,
            fill: "#6B7280",
          }}
        >
          Net Salary
        </text>
        <text
          x={centerX}
          y={centerY + 10}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: 18,
            fontWeight: 800,
            fill: "#7C3AED",
          }}
        >
          ₱
          {computedSalary.netSalary.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </text>
      </g>
    );
  };

  return (
    <Card className="h-full bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1.5 h-8 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Salary Allocation
          </h2>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed pl-5">
          Visualize how your net salary is distributed across categories
        </p>
      </div>

      {/* Allocation Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <p className="text-xs font-semibold text-gray-600">Needs</p>
          </div>
          <p className="text-lg font-bold text-purple-700 tabular-nums">
            {(allocation.needs * 100).toFixed(0)}%
          </p>
        </div>
        <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <p className="text-xs font-semibold text-gray-600">Savings</p>
          </div>
          <p className="text-lg font-bold text-indigo-700 tabular-nums">
            {(allocation.savings * 100).toFixed(0)}%
          </p>
        </div>
        <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <p className="text-xs font-semibold text-gray-600">Wants</p>
          </div>
          <p className="text-lg font-bold text-blue-700 tabular-nums">
            {(allocation.wants * 100).toFixed(0)}%
          </p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="h-[320px] sm:h-[360px] bg-gradient-to-br from-gray-50 to-purple-50/30 rounded-xl p-4 border border-gray-100">
        <ResponsivePie
          data={data}
          margin={{ top: 20, right: 20, bottom: 60, left: 20 }}
          innerRadius={0.65}
          padAngle={2}
          cornerRadius={6}
          activeOuterRadiusOffset={10}
          colors={{ datum: "data.color" }}
          borderWidth={0}
          enableArcLinkLabels={false}
          arcLabelsSkipAngle={15}
          arcLabelsTextColor="#ffffff"
          arcLabel={(d) =>
            `${((d.value / computedSalary.netSalary) * 100).toFixed(0)}%`
          }
          tooltip={({ datum }) => (
            <div className="px-3 py-2 bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: datum.color }}
                />
                <span className="text-xs font-semibold text-gray-800">
                  {datum.label}
                </span>
              </div>
              <p className="text-sm font-bold text-gray-900 tabular-nums">
                ₱
                {Number(datum.value).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="text-xs text-gray-500">
                {((datum.value / computedSalary.netSalary) * 100).toFixed(1)}%
                of net salary
              </p>
            </div>
          )}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateY: 45,
              itemWidth: 90,
              itemHeight: 18,
              itemTextColor: "#4B5563",
              symbolSize: 12,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#7C3AED",
                  },
                },
              ],
            },
          ]}
          layers={["arcs", "arcLabels", "legends", CenteredMetric]}
        />
      </div>

      {/* Allocation Progress Bar */}
      {totalAllocation < 1 && (
        <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-amber-800">
              Unallocated: {(remaining * 100).toFixed(1)}%
            </span>
            <span className="text-xs text-amber-600">
              ₱{(computedSalary.netSalary * remaining).toLocaleString()}
            </span>
          </div>
          <div className="w-full h-2 bg-amber-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-300"
              style={{ width: `${(1 - totalAllocation) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-red-500 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium text-red-800">{error}</span>
          </div>
        </div>
      )}

      {/* Input Controls */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Adjust Allocation Percentages
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {(["needs", "savings", "wants"] as const).map((key) => (
            <InputBox
              key={key}
              inputBox={{
                id: key,
                fieldName: key.charAt(0).toUpperCase() + key.slice(1),
                value: (allocation[key] * 100).toFixed(0),
              }}
              handleOnChange={handleAllocationChange(key)}
            >
              <TbPercentage className="text-gray-500" size={20} />
            </InputBox>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default SalaryChart;
