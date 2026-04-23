import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { PredictResponse } from '@/types';

interface Props {
  result: PredictResponse | null;
}

export default function PredictionResult({ result }: Props) {
  if (!result) return null;

  const isHighRisk = result.prediction === 1;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={result.label}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        transition={{ duration: 0.4, type: 'spring' }}
        className={`glass-card p-8 text-center border-2 ${
          isHighRisk
            ? 'border-red-500/50 bg-red-500/5'
            : 'border-green-500/50 bg-green-500/5'
        }`}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-4"
        >
          {isHighRisk ? (
            <AlertTriangle size={64} className="mx-auto text-red-500" />
          ) : (
            <CheckCircle2 size={64} className="mx-auto text-green-500" />
          )}
        </motion.div>

        <h2 className={`text-3xl font-bold mb-2 ${isHighRisk ? 'text-red-500' : 'text-green-500'}`}>
          {isHighRisk ? 'HIGH RISK ⚠️' : 'LOW RISK ✅'}
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {isHighRisk
            ? 'The model indicates elevated risk. Please consult a healthcare professional.'
            : 'The model indicates low risk based on the provided features.'}
        </p>

        {result.confidence !== null && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-navy-700">
            <span className="text-sm text-gray-500 dark:text-gray-400">Confidence:</span>
            <span className="text-lg font-bold">{(result.confidence * 100).toFixed(1)}%</span>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
