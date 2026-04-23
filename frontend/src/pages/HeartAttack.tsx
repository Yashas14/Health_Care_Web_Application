import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeartPulse } from 'lucide-react';
import { useMLModel } from '@/hooks/useMLModel';
import type { ClassifierKey } from '@/types';
import StatsCards from '@/components/Dashboard/StatsCards';
import ClassifierSelector from '@/components/ModelPlayground/ClassifierSelector';
import MetricsDisplay from '@/components/Visualizations/MetricsDisplay';
import PCAPlot from '@/components/Visualizations/PCAPlot';
import ConfusionMatrixChart from '@/components/Visualizations/ConfusionMatrixChart';
import RealVsPredictedChart from '@/components/Visualizations/RealVsPredictedChart';
import PredictionForm from '@/components/Predictor/PredictionForm';
import PredictionResult from '@/components/Results/PredictionResult';

export default function HeartAttack() {
  const [classifier, setClassifier] = useState<ClassifierKey>('rf');
  const {
    loading, error, trainResult, predictResult, datasetInfo, pcaData, confusionMatrix, realVsPredicted,
    train, predict, fetchDatasetInfo, fetchPCA, fetchConfusionMatrix, fetchRealVsPredicted, setError,
  } = useMLModel();

  useEffect(() => {
    fetchDatasetInfo('heart');
    fetchPCA('heart');
  }, []);

  const handleTrain = async () => {
    setError(null);
    const res = await train('heart', classifier);
    if (res) {
      fetchConfusionMatrix('heart', classifier);
      fetchRealVsPredicted('heart', classifier);
    }
  };

  const handlePredict = async (features: number[]) => {
    await predict('heart', classifier, features);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <div className="p-3 rounded-2xl bg-red-500/10">
          <HeartPulse size={32} className="text-red-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Heart Attack Prediction</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Predict heart attack risk using 13 clinical features
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      {datasetInfo && (
        <StatsCards
          samples={datasetInfo.samples}
          features={datasetInfo.features}
          bestAccuracy={trainResult?.accuracy ?? null}
          predictions={0}
        />
      )}

      {/* Classifier selector + train */}
      <div className="glass-card p-6">
        <ClassifierSelector
          selected={classifier}
          onSelect={setClassifier}
          loading={loading}
          onTrain={handleTrain}
        />
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Metrics */}
      {trainResult && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <MetricsDisplay result={trainResult} />
          </div>
          {confusionMatrix && <ConfusionMatrixChart data={confusionMatrix} />}
        </div>
      )}

      {/* Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {pcaData && <PCAPlot data={pcaData} datasetName="Heart Attack" />}
        {realVsPredicted && <RealVsPredictedChart data={realVsPredicted} />}
      </div>

      {/* Prediction form */}
      {datasetInfo && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PredictionForm
            datasetInfo={datasetInfo}
            onPredict={handlePredict}
            loading={loading}
          />
          <PredictionResult result={predictResult} />
        </div>
      )}
    </div>
  );
}
