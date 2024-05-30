import {format} from "date-fns";

import {
  Tooltip,
  XAxis,
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import CustomTooltip from "@/components/custom-tooltip";

type Props = {
  data?: {
    date: Date | string;
    income: number;
    expenses: number;
  }[];
};

const LineVariant = ({data}: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickFormatter={(value) => format(value, "dd MMM")}
          style={{fontSize: "12px"}}
          tickMargin={16}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          dataKey="income"
          dot={false}
          strokeWidth={2}
          stroke="#3b82f6"
          className="drop-shadow-sm"
        />
        <Line
          dataKey="expenses"
          strokeWidth={2}
          dot={false}
          stroke="#f43f5e"
          className="drop-shadow-sm"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default LineVariant;
