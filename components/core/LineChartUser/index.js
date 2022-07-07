import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  YAxis,
} from "recharts";

const data = [
  {
    date: "Minggu -1",
    masuk: 1,
    pulang: 1,
  },
  {
    day: "Bulan ke-2",
    masuk: 1,
    pulang: 1,
  },
  {
    day: "Minggu -3",
    masuk: 2000,
    pulang: 9800,
  },
  {
    day: "Minggu -4",
    masuk: 2780,
    pulang: 3908,
  },
  {
    day: "Minggu -5",
    masuk: 1890,
    pulang: 4800,
  },
  {
    day: "Minggu -6",
    masuk: 2390,
    pulang: 3800,
  },
  {
    day: "Minggu -7",
    masuk: 3490,
    pulang: 4300,
  },
];

const LineChartAdmin = (props) => {
  const dataCahart = props.data?.data.dataAbsen;

  return (
    <div className="flex flex-col w-4/6">
      <div className="text-lg font-semibold">Total Absen Minggu ini :</div>
      <div className="w-full h-96 shadow-lg rounded-md p-10">
        <ResponsiveContainer width="100%">
          <LineChart
            width={500}
            height={400}
            data={dataCahart}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="masuk"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="pulang" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartAdmin;
