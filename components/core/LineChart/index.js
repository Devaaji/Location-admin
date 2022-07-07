import React from "react";
import {
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import useRemoteLineChartAdmin from "../../../hooks/remote/useRemoteLineChartAdmin";

const LineChartAdmin = () => {
  const { data } = useRemoteLineChartAdmin();

  const LineChartAdmin = data?.data.dataAbsen;

  console.log(LineChartAdmin);
  return (
    <div className="flex flex-col w-full">
      <div className="text-lg font-semibold">Jumlah Absen Karyawan:</div>
      <div className="w-full h-96 shadow-lg rounded-md p-10">
        <ResponsiveContainer width="100%">
          <BarChart
            width={500}
            height={300}
            data={LineChartAdmin}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis
              dataKey="date"
              scale="point"
              padding={{ left: 10, right: 10 }}
            />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="masuk" fill="#82ca9d" background={{ fill: "#eee" }} />
            <Bar
              dataKey="pulang"
              fill="#8884d8"
              background={{ fill: "#eee" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartAdmin;
