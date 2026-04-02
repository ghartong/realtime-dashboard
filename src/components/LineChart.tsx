import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { generateMockData, type DataPoint } from '../lib/mockData';

export default function LineChartComponent({ metric }: { metric: DataPoint }) {
    const data = generateMockData(metric, 20).map((point) => ({
        name: new Date(point.timestamp).toLocaleTimeString(),
        value: point.value
    }));

  return (
    <LineChart
      style={{ width: '100%', maxWidth: '700px', height: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="purple" strokeWidth={2} name="CPU Usage"/>
        <XAxis dataKey="name" />
        <YAxis dataKey={"value"} />
        <Legend />
    </LineChart>
  );
}