import { FILL_COLOR, STROKE_COLORS } from '@/constants';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export interface IPieChartProps {
  data: unknown[];
}
const CustomPieChart = ({ data }: IPieChartProps) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <PieChart>
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          labelLine={false}
          outerRadius={100}
          fill='#8884d8'
          dataKey='value'
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              stroke={STROKE_COLORS[index]}
              strokeWidth={2}
              fill={FILL_COLOR[index]}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
