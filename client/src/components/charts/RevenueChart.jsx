import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function RevenueChart({ data = [] }) {
  if (!data.length) {
    return (
      <div className="h-80 flex items-center justify-center text-gray-400">
        No revenue data available.
      </div>
    );
  }

  return (
    <div className="w-full h-80 overflow-hidden">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
          />

          <YAxis
            tick={{ fontSize: 12 }}
          />

          <Tooltip
            formatter={(value) => [`₹${value}`, "Revenue"]}
          />

          <Line
            type="monotone"
            dataKey="revenue"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;