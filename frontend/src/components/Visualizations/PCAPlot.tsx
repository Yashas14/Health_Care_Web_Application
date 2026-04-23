import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import type { PCAData } from '@/types';

interface Props {
  data: PCAData;
  datasetName: string;
}

export default function PCAPlot({ data, datasetName }: Props) {
  const class0 = data.points.filter(p => p.label === 0);
  const class1 = data.points.filter(p => p.label === 1);
  const label0 = datasetName === 'Heart Attack' ? 'No Disease' : 'Benign';
  const label1 = datasetName === 'Heart Attack' ? 'Disease' : 'Malignant';

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-1">PCA 2D Visualization</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
        Variance explained: PC1 {(data.explained_variance[0] * 100).toFixed(1)}%,
        PC2 {(data.explained_variance[1] * 100).toFixed(1)}%
      </p>
      <ResponsiveContainer width="100%" height={350}>
        <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
          <XAxis dataKey="x" name="PC1" tick={{ fontSize: 12 }} />
          <YAxis dataKey="y" name="PC2" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#f1f5f9',
            }}
          />
          <Legend />
          <Scatter name={label0} data={class0} fill="#00BFA6" opacity={0.7} />
          <Scatter name={label1} data={class1} fill="#ef4444" opacity={0.7} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
