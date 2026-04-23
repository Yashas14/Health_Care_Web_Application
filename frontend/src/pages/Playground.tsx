import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, HeartPulse, Ribbon } from 'lucide-react';
import { useMLModel } from '@/hooks/useMLModel';
import type { ClassifierKey, Dataset } from '@/types';
import ClassifierSelector from '@/components/ModelPlayground/ClassifierSelector';
import MetricsDisplay from '@/components/Visualizations/MetricsDisplay';
import ComparisonChart from '@/components/Visualizations/ComparisonChart';
import PCAPlot from '@/components/Visualizations/PCAPlot';
import ConfusionMatrixChart from '@/components/Visualizations/ConfusionMatrixChart';
import RealVsPredictedChart from '@/components/Visualizations/RealVsPredictedChart';
import { cn } from '@/lib/utils';

export default function Playground() {
  const [dataset, setDataset] = useState<Dataset>('heart');
  const [classifier, setClassifier] = useState<ClassifierKey>('rf');
  const {
    loading, error, trainResult, pcaData, metricsComparison, confusionMatrix, realVsPredicted,
    train, fetchPCA, fetchMetricsComparison, fetchConfusionMatrix, fetchRealVsPredicted, setError,
  } = useMLModel();

  useEffect(() => {
    fetchPCA(dataset);
  }, [dataset]);

  const handleTrain = async () => {
    setError(null);
    const res = await train(dataset, classifier);
    if (res) {
      fetchConfusionMatrix(dataset, classifier);
      fetchRealVsPredicted(dataset, classifier);
    }
  };

  const handleCompareAll = async () => {
    setError(null);
    await fetchMetricsComparison(dataset);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <div className="p-3 rounded-2xl bg-teal-500/10">
          <FlaskConical size={32} className="text-teal-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Model Playground</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Compare classifiers and explore model performance
          </p>
        </div>
      </motion.div>

      {/* Dataset toggle */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Select Dataset</h3>
        <div className="flex gap-4">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setDataset('heart')}
            className={cn(
              'flex items-center gap-3 px-6 py-4 rounded-xl border-2 transition-all flex-1',
              dataset === 'heart'
                ? 'border-red-500 bg-red-500/10'
                : 'border-gray-200 dark:border-navy-700 hover:border-gray-300 dark:hover:border-navy-600'
            )}
          >
            <HeartPulse size={24} className={dataset === 'heart' ? 'text-red-500' : 'text-gray-400'} />
            <div className="text-left">
              <p className="font-semibold">Heart Attack</p>
              <p className="text-xs text-gray-500">13 features, 303 samples</p>
            </div>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setDataset('cancer')}
            className={cn(
              'flex items-center gap-3 px-6 py-4 rounded-xl border-2 transition-all flex-1',
              dataset === 'cancer'
                ? 'border-pink-500 bg-pink-500/10'
                : 'border-gray-200 dark:border-navy-700 hover:border-gray-300 dark:hover:border-navy-600'
            )}
          >
            <Ribbon size={24} className={dataset === 'cancer' ? 'text-pink-500' : 'text-gray-400'} />
            <div className="text-left">
              <p className="font-semibold">Breast Cancer</p>
              <p className="text-xs text-gray-500">30 features, 569 samples</p>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Classifier selector */}
      <div className="glass-card p-6">
        <ClassifierSelector
          selected={classifier}
          onSelect={setClassifier}
          loading={loading}
          onTrain={handleTrain}
        />
        <div className="mt-4">
          <button
            onClick={handleCompareAll}
            disabled={loading}
            className="btn-secondary flex items-center gap-2"
          >
            {loading ? 'Comparing...' : 'Compare All 5 Classifiers'}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Metrics from single train */}
      {trainResult && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <MetricsDisplay result={trainResult} />
          </div>
          {confusionMatrix && <ConfusionMatrixChart data={confusionMatrix} />}
        </div>
      )}

      {/* Comparison chart */}
      {metricsComparison && (
        <ComparisonChart data={metricsComparison} />
      )}

      {/* Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {pcaData && <PCAPlot data={pcaData} datasetName={dataset === 'heart' ? 'Heart Attack' : 'Breast Cancer'} />}
        {realVsPredicted && <RealVsPredictedChart data={realVsPredicted} />}
      </div>
    </div>
  );
}
