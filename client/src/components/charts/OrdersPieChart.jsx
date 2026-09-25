import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

function OrdersPieChart({ data = [] }) {
  if (!data.length) {
    return (
      <div className="h-80 flex items-center justify-center text-gray-400">
        No order data available.
      </div>
    );
  }

  return (
    <div className="w-full h-80 overflow-hidden">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OrdersPieChart;