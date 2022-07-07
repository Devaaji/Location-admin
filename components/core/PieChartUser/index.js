import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Label as RechartsLabel,
} from "recharts";

const PieChartAdmin = () => {
  const pieData = useMemo(() => [
    {
      name: "Grup A",
      value: 400,
      fill: "#0088FE",
    },
    {
      name: "Grup B",
      value: 100,
      fill: "#00C49F",
    },
    {
      name: "Grup C",
      value: 250,
      fill: "#FFBB28",
    },
    {
      name: "Grup D",
      value: 70,
      fill: "#FF8042",
    },
  ]);

  return (
    <div className="d mr-10 w-1/3 flex flex-col">
      <div className="text-lg font-semibold">Tiap Kehadiran :</div>
      <div className="w-full h-96 shadow-lg rounded-md p-10 flex flex-row">
        <div className="w-1/2">
          <ResponsiveContainer width="100%">
            <PieChart width={200} height={200}>
              <Pie
                data={pieData}
                cx={80}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((data) => (
                  <Cell key={data.value} fill={data.fill} />
                ))}
                <RechartsLabel position="center" fontSize="1.5em">
                  23
                </RechartsLabel>
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="border-l border-gray-300 w-1/2">
          <div className="font-semibold text-center">Total Kehadiran</div>
        </div>
      </div>
    </div>
  );
};

export default PieChartAdmin;
