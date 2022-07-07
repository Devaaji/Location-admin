import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import useRemoteAllKaryawan from "../../../hooks/remote/useRemoteAllKaryawan";

const data = [
  { name: "1", value: 400 },
  { name: "2", value: 200 },
];

const COLORS = ["#0088FE", "#FFDEDE"];

const PieChartAdmin = () => {
  const { data: GetKaryawan } = useRemoteAllKaryawan();

  return (
    <div className="d mr-10 w-1/3 flex flex-col">
      <div className="text-lg font-semibold">Gambaran Umum Karyawan :</div>
      <div className="w-full h-96 shadow-lg rounded-md p-10 flex flex-row">
        <div className="w-1/2">
          <ResponsiveContainer width="100%">
            <PieChart width={200} height={200}>
              <Pie
                data={data}
                cx={80}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="border-l border-gray-300 w-1/2 flex flex-col justify-center  items-center">
          <div className="flex flex-row items-center justify-center">
            <div className="bg-blue-500 w-2 h-2 border border-black mr-5"></div>
            <div className="font-semibold text-center">Jumlah Karyawan</div>
          </div>
          <div className="text-center font-bold text-4xl mb-3">
            {GetKaryawan?.data.users.verified}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChartAdmin;
