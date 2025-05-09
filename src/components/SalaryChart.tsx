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
    },
    {
      id: "savings",
      label: "Savings",
      value: computedSalary.netSalary * 0.3,
    },
    {
      id: "wants",
      label: "Wants",
      value: computedSalary.netSalary * 0.2,
    },
  ];

  return (
    <Card className="bg-gray-300/40 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-purple-600 mb-2">
        Salary Allocation Breakdown
      </h2>
      <div className="h-[400px] sm:h-[500px]">
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 120, bottom: 60, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={{ scheme: "paired" }}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#555"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
          arcLabel={(d) => `₱${Number(d.value).toLocaleString()}`}
          tooltip={({ datum }) => (
            <div
              style={{
                padding: 8,
                background: "white",
                border: "1px solid #ccc",
              }}
            >
              <strong>{datum.label}</strong>: ₱
              {Number(datum.value).toLocaleString()}
            </div>
          )}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateY: 56,
              itemWidth: 80,
              itemHeight: 18,
              itemTextColor: "#555",
              symbolSize: 14,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                    itemBackground: "rgba(0, 0, 0, .03)",
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </Card>
  );
};

export default SalaryChart;
