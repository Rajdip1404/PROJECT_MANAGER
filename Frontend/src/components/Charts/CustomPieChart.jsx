import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({
  data,
  colors,
}) => {
  return (
      <ResponsiveContainer width="100%" minWidth={335} height={370}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="45%" // Moved chart up for more space
            outerRadius={130}
            innerRadius={95}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />}/>
          <Legend
            content={<CustomLegend />}
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
  );
};

export default CustomPieChart;
