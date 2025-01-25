import { FILL_COLOR, STROKE_COLORS } from '@/constants';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const CustomBarChart = ({ data }: { data: unknown[] }) => {
  return (
    <ResponsiveContainer width='100%' height={1200}>
      <BarChart data={data} layout='vertical'>
        <XAxis type='number' />
        <YAxis
          dataKey='title'
          type='category'
          width={150} // Adjust width for longer titles
        />
        <Tooltip cursor={{ fill: '#2b2863' }} />
        <Legend />
        <Bar
          dataKey='oscar_nominations'
          fill={FILL_COLOR[0]}
          stroke={STROKE_COLORS[0]}
          strokeWidth={2}
        />
        <Bar
          dataKey='oscar_winning'
          fill={FILL_COLOR[2]}
          stroke={STROKE_COLORS[2]}
          strokeWidth={2}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
