import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({ data }) => {
    console.log(data);
  const getBarColor = (entry) => {
    switch (entry?.priority) {
      case "High":
        return "#EC2309";
      case "Medium":
        return "#A63CF7";
      case "Low":
        return "#1DD34A";
      default:
        return "black";
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      // console.log(payload)
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p
            className={`text-xs font-semibold bg-blend-soft-light text-purple-600 mb-1`}
          >
            {payload[0].payload.priority}
          </p>
          <p className="tet-sm text-gray-700">
            Count :{" "}
            <span className="text-sm font-medium text-gray-900">
              ${payload[0].payload.count}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={345}>
        <BarChart
          data={data}
        //   margin={{
        //     top: 5,
        //     right: 30,
        //     left: 20,
        //     bottom: 5,
        //   }}
        >
          <CartesianGrid stroke="none" />
          <XAxis dataKey="priority" tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={CustomTooltip} cursor={{ fill: "transparent" }} />
          <Bar
            dataKey="count"
            nameKey="priority"
            fill="#8884d8"
            radius={[10, 10, 0, 0]}
            activeDot={{ r: 8, fill: "yellow" }}
            activeStyle={{ fill: "green" }}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
