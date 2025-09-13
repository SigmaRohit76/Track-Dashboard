import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

export default function TrackChart({ alignment }) {
  const sampleData = [
    { pos: 0, align: alignment },
    { pos: 10, align: alignment + Math.random() * 2 },
    { pos: 20, align: alignment + Math.random() * -2 },
  ];
  return (
    <LineChart width={300} height={200} data={sampleData}>
      <Line type="monotone" dataKey="align" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="pos" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
}
