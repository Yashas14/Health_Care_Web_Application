import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import type { MetricsComparison } from '@/types';

interface Props {
  data: MetricsComparison;
}

export default function ComparisonChart({ data }: Props) {
  const chartData = data.classifiers.map((name, i) => ({
    name,
    Accuracy: +(data.accuracies[i] * 100).toFixed(1),
    Precision: +(data.precisions[i] * 100).toFixed(1),
    Recall: +(data.recalls[i] * 100).toFixed(1),
    F1: +(data.f1_scores[i] * 100).toFixed(1),
  }));

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">Classifier Comparison</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} unit="%" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#f1f5f9',
            }}
          />
          <Legend />
          <Bar dataKey="Accuracy" fill="#00BFA6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Precision" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Recall" fill="#a855f7" radius={[4, 4, 0, 0]} />
          <Bar dataKey="F1" fill="#f97316" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
