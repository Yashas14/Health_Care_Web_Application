import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import type { RealVsPredicted } from '@/types';

interface Props {
  data: RealVsPredicted;
}

export default function RealVsPredictedChart({ data }: Props) {
  const points = data.y_test.map((val, i) => ({
    index: i,
    actual: val,
    predicted: data.y_pred[i],
  }));

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">Real vs Predicted Values</h3>
      <ResponsiveContainer width="100%" height={350}>
        <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
          <XAxis dataKey="index" name="Sample" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} domain={[-0.2, 1.2]} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#f1f5f9',
            }}
          />
          <Legend />
          <Scatter
            name="Actual"
            data={points.map(p => ({ index: p.index, value: p.actual }))}
            dataKey="value"
            fill="#ef4444"
            shape="circle"
            opacity={0.8}
          />
          <Scatter
            name="Predicted"
            data={points.map(p => ({ index: p.index, value: p.predicted }))}
            dataKey="value"
            fill="#facc15"
            shape="diamond"
            opacity={0.8}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
