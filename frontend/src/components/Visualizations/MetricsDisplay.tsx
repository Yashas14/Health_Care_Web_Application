import { motion } from 'framer-motion';
import type { TrainResponse } from '@/types';

interface Props {
  result: TrainResponse;
}

const metrics = [
  { key: 'accuracy', label: 'Accuracy', color: 'bg-teal-500' },
  { key: 'precision', label: 'Precision', color: 'bg-blue-500' },
  { key: 'recall', label: 'Recall', color: 'bg-purple-500' },
  { key: 'f1', label: 'F1 Score', color: 'bg-orange-500' },
] as const;

export default function MetricsDisplay({ result }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Model Metrics</h3>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-500">
          Trained in {result.execution_time}s
        </span>
      </div>

      <div className="space-y-3">
        {metrics.map((m, i) => {
          const val = result[m.key];
          return (
            <div key={m.key} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-600 dark:text-gray-400">{m.label}</span>
                <span className="font-bold">{(val * 100).toFixed(1)}%</span>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-navy-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${val * 100}%` }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }}
                  className={`h-full rounded-full ${m.color}`}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="glass-card p-3 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">MSE</p>
          <p className="text-lg font-bold">{result.mse.toFixed(4)}</p>
        </div>
        <div className="glass-card p-3 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">Fit Time</p>
          <p className="text-lg font-bold">{result.fit_time.toFixed(4)}s</p>
        </div>
      </div>
    </div>
  );
}
