import {formatCurrency, formatPercentage} from "@/lib/utils";
import {
  Cell,
  Legend,
  Pie,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const colors = ["0062FF", "12C6FF", "FF647F", "FF9354"];

type Props = {
  data?: {
    name: string;
    value: number;
  }[];
};

import CategoryTooltip from "./category-tooltip";

function RadialVariant({data}: Props) {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <RadialBarChart
        cx={"50%"}
        cy={"30%"}
        barSize={10}
        innerRadius={"90%"}
        outerRadius={"40%"}
        data={data?.map((item, idx) => ({
          ...item,
          fill: colors[idx % colors.length],
        }))}
      >
        <RadialBar
          label={{
            position: "insideStart",
            fill: "white",
            fontSize: "12px",
          }}
          background
          dataKey={"value"}
        />
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
                        {formatCurrency(entry.payload?.value)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            );
          }}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}

export default RadialVariant;
