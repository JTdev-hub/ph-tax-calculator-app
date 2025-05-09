import { ComputedSalary } from "../types/global";
import Card from "./Card";
import { ResponsivePie } from "@nivo/pie";

interface Props {
  computedSalary: ComputedSalary;
}

const SalaryChart = ({ computedSalary }: Props) => {
  const data = [
    {
      id: "needs",
      label: "Needs",
      value: computedSalary.netSalary * 0.5,
      color: "hsl(190, 70%, 50%)",
    },
    {
      id: "savings",
      label: "Savings",
      value: computedSalary.netSalary * 0.3,
      color: "hsl(145, 60%, 50%)",
    },
    {
      id: "wants",
      label: "Wants",
      value: computedSalary.netSalary * 0.2,
      color: "hsl(40, 90%, 55%)",
    },
  ];

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
    <Card className="bg-gray-300/40 p-4 sm:p-6 rounded-lg shadow-lg">
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
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor={{ from: "color" }}
          arcLinkLabelsThickness={2}
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
              itemWidth: 60,
              itemHeight: 14,
              itemTextColor: "#555",
              symbolSize: 12,
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
          layers={[
            "arcs",
            "arcLabels",
            "arcLinkLabels",
            "legends",
            CenteredMetric,
          ]}
        />
      </div>
    </Card>
  );
};

export default SalaryChart;
