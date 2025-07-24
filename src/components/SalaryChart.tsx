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

  // Memoize pie chart data to avoid recalculation on every render
  const data = useMemo(
    () => [
      {
        id: "Needs",
        label: "Needs",
        value: computedSalary.netSalary * allocation.needs,
        color: "hsl(190, 70%, 50%)",
      },
      {
        id: "Savings",
        label: "Savings",
        value: computedSalary.netSalary * allocation.savings,
        color: "hsl(145, 60%, 50%)",
      },
      {
        id: "Wants",
        label: "Wants",
        value: computedSalary.netSalary * allocation.wants,
        color: "hsl(40, 90%, 55%)",
      },
    ],
    [
      computedSalary.netSalary,
      allocation.needs,
      allocation.savings,
      allocation.wants,
    ]
  );

  // Handle allocation input changes
  const handleAllocationChange =
    (key: keyof SalaryAllocation) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = event.target.value.replace(/,/g, ""); // Remove commas
      const number = Number(rawValue) / 100; // Convert percentage to decimal
      if (!isNaN(number) && number >= 0 && number <= 1) {
        setAllocation((prev) => {
          const newAllocation = { ...prev, [key]: number };
          const total =
            newAllocation.needs + newAllocation.savings + newAllocation.wants;
          if (total > 1) {
            setError("Total allocation cannot exceed 100%");
            return prev; // Prevent update
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
      <text
        x={centerX}
        y={centerY}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: 14,
          fontWeight: 700,
          fill: "#000",
        }}
      >
        ₱
        {computedSalary.netSalary.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </text>
    );
  };

  return (
    <Card className="w-full lg:w-1/3 bg-gray-300/40 p-6 rounded-lg shadow-lg">
      <h2 className="text-lg sm:text-xl font-bold text-purple-600 mb-4">
        Salary Allocation Breakdown
      </h2>
      <div className="h-[300px] sm:h-[400px]">
        <ResponsivePie
          data={data}
          margin={{ top: 30, right: 30, bottom: 80, left: 30 }}
          innerRadius={0.6}
          padAngle={0.5}
          cornerRadius={5}
          activeOuterRadiusOffset={8}
          colors={{ datum: "data.color" }}
          borderWidth={3}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor={{ from: "color" }}
          arcLinkLabelsThickness={1}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
          arcLabel={(d) =>
            `₱${Number(d.value).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`
          }
          tooltip={({ datum }) => (
            <div
              style={{
                padding: 6,
                fontSize: 13,
                background: "white",
                border: "1px solid #ccc",
              }}
            >
              <strong>{datum.label}</strong>: ₱
              {Number(datum.value).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          )}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateY: 56,
              itemWidth: 70,
              itemHeight: 14,
              itemTextColor: "#555",
              symbolSize: 10,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
          layers={["arcs", "arcLabels", "legends", CenteredMetric]}
        />
      </div>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      <div className="flex flex-row gap-4 mt-4">
        {(["savings", "needs", "wants"] as const).map((key) => (
          <InputBox
            key={key}
            inputBox={{
              id: key,
              fieldName: key.charAt(0).toUpperCase() + key.slice(1),
              value: (allocation[key] * 100).toString(),
            }}
            handleOnChange={handleAllocationChange(key)}
          >
            {<TbPercentage className="text-black" size={20} />}
          </InputBox>
        ))}
      </div>
    </Card>
  );
};

export default SalaryChart;
