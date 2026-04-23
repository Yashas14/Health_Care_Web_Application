import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { DatasetInfo } from '@/types';

interface Props {
  datasetInfo: DatasetInfo;
  onPredict: (features: number[]) => void;
  loading?: boolean;
}

export default function PredictionForm({ datasetInfo, onPredict, loading }: Props) {
  const [values, setValues] = useState<Record<string, number>>({});

  useEffect(() => {
    const defaults: Record<string, number> = {};
    for (const name of datasetInfo.feature_names) {
      const meta = datasetInfo.feature_meta[name];
      defaults[name] = meta?.default ?? meta?.min ?? 0;
    }
    setValues(defaults);
  }, [datasetInfo]);

  const handleChange = (name: string, value: number) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const features = datasetInfo.feature_names.map(name => values[name] ?? 0);
    onPredict(features);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">Custom Prediction Input</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Adjust the sliders below to enter patient data for prediction.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-h-[500px] overflow-y-auto pr-2">
        {datasetInfo.feature_names.map((name) => {
          const meta = datasetInfo.feature_meta[name];
          if (!meta) return null;
          const val = values[name] ?? meta.default;
          return (
            <div key={name} className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {meta.label}
                </label>
                <span className="text-sm font-bold text-teal-500 min-w-[60px] text-right">
                  {typeof val === 'number' ? (meta.step < 1 ? val.toFixed(3) : val) : val}
                </span>
              </div>
              <input
                type="range"
                min={meta.min}
                max={meta.max}
                step={meta.step}
                value={val}
                onChange={e => handleChange(name, parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-navy-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>{meta.min}</span>
                <span>{meta.max}</span>
              </div>
            </div>
          );
        })}
      </div>

      <motion.button
        whileTap={{ scale: 0.96 }}
        type="submit"
        disabled={loading}
        className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
            Predicting...
          </>
        ) : (
          'Get Prediction'
        )}
      </motion.button>
    </form>
  );
}
