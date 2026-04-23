import { useState, useCallback } from 'react';
import { api } from './useApi';
import type {
  Dataset, ClassifierKey, TrainResponse, PredictResponse,
  DatasetInfo, PCAData, MetricsComparison, ConfusionMatrixData, RealVsPredicted,
} from '@/types';

export function useMLModel() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trainResult, setTrainResult] = useState<TrainResponse | null>(null);
  const [predictResult, setPredictResult] = useState<PredictResponse | null>(null);
  const [datasetInfo, setDatasetInfo] = useState<DatasetInfo | null>(null);
  const [pcaData, setPcaData] = useState<PCAData | null>(null);
  const [metricsComparison, setMetricsComparison] = useState<MetricsComparison | null>(null);
  const [confusionMatrix, setConfusionMatrix] = useState<ConfusionMatrixData | null>(null);
  const [realVsPredicted, setRealVsPredicted] = useState<RealVsPredicted | null>(null);

  const train = useCallback(async (dataset: Dataset, classifier: ClassifierKey) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.train(dataset, classifier);
      setTrainResult(res);
      return res;
    } catch (e: any) {
      setError(e?.response?.data?.detail || e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const predict = useCallback(async (dataset: Dataset, classifier: ClassifierKey, features: number[]) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.predictAndSave(dataset, classifier, features);
      setPredictResult(res);
      return res;
    } catch (e: any) {
      setError(e?.response?.data?.detail || e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDatasetInfo = useCallback(async (dataset: Dataset) => {
    try {
      const res = await api.getDatasetInfo(dataset);
      setDatasetInfo(res);
      return res;
    } catch (e: any) {
      setError(e?.response?.data?.detail || e.message);
      return null;
    }
  }, []);

  const fetchPCA = useCallback(async (dataset: Dataset) => {
    try {
      const res = await api.getPCA(dataset);
      setPcaData(res);
      return res;
    } catch (e: any) {
      setError(e?.response?.data?.detail || e.message);
      return null;
    }
  }, []);

  const fetchMetricsComparison = useCallback(async (dataset: Dataset) => {
    setLoading(true);
    try {
      const res = await api.getMetricsComparison(dataset);
      setMetricsComparison(res);
      return res;
    } catch (e: any) {
      setError(e?.response?.data?.detail || e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchConfusionMatrix = useCallback(async (dataset: Dataset, classifier: ClassifierKey) => {
    try {
      const res = await api.getConfusionMatrix(dataset, classifier);
      setConfusionMatrix(res);
      return res;
    } catch (e: any) {
      setError(e?.response?.data?.detail || e.message);
      return null;
    }
  }, []);

  const fetchRealVsPredicted = useCallback(async (dataset: Dataset, classifier: ClassifierKey) => {
    try {
      const res = await api.getRealVsPredicted(dataset, classifier);
      setRealVsPredicted(res);
      return res;
    } catch (e: any) {
      setError(e?.response?.data?.detail || e.message);
      return null;
    }
  }, []);

  return {
    loading, error, trainResult, predictResult, datasetInfo,
    pcaData, metricsComparison, confusionMatrix, realVsPredicted,
    train, predict, fetchDatasetInfo, fetchPCA, fetchMetricsComparison,
    fetchConfusionMatrix, fetchRealVsPredicted, setError,
  };
}
