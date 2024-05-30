import {
  Tooltip,
  XAxis,
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Legend,
  Pie,
  Cell,
} from "recharts";
import {formatPercentage} from "@/lib/utils";

const colors = ["0062FF", "12C6FF", "FF647F", "FF9354"];

type Props = {
  data?: {
    name: string;
    value: number;
  }[];
};

import React from "react";
import CategoryTooltip from "./category-tooltip";

function PieVariant({data}: Props) {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <PieChart>
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={({payload}) => {
            return (
              <ul className="flex flex-col space-y-2">
                {payload?.map((entry, idx) => (
                  <li
                    key={`item-${idx}`}
                    className="flex items-center space-x-2"
                  >
                    <span
                      className="size-2 rounded-full"
                      style={{
                        backgroundColor: entry.color,
                      }}
                    />
                    <div className="space-x-1">
                      <span className="text-sm text-muted-foreground">
                        {entry.value}
                      </span>
                      <span className="text-sm">
                        {formatPercentage(entry.payload?.value)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            );
          }}
        />
        <Tooltip content={<CategoryTooltip />} />
        <Pie
          data={data}
          cx={"50%"}
          cy={"50%"}
          outerRadius={90}
          innerRadius={60}
          paddingAngle={2}
          fill="#8884d8"
          labelLine={false}
          dataKey={"value"}
        >
          {data?.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieVariant;
