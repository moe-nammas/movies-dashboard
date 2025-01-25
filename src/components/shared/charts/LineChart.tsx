import { STROKE_COLORS } from '@/constants';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const CustomLineChart = ({ data }: { data: unknown[] }) => {
  return (
    <ResponsiveContainer width='100%' height={400}>
      <LineChart data={data}>
        {/* <CartesianGrid strokeDasharray='3 3' /> */}
        <XAxis dataKey='year' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type='monotone'
          dataKey='nominations'
          stroke={STROKE_COLORS[0]}
          activeDot={{ r: 8 }}
        />
        <Line type='monotone' dataKey='wins' stroke={STROKE_COLORS[2]} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
