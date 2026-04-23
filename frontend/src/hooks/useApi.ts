import axios from 'axios';
import type {
  Dataset, ClassifierKey, TrainResponse, PredictResponse,
  DatasetInfo, PCAData, MetricsComparison, ConfusionMatrixData, RealVsPredicted,
} from '@/types';

const API = axios.create({ baseURL: '/api' });

export const api = {
  train: (dataset: Dataset, classifier: ClassifierKey) =>
    API.post<TrainResponse>('/train', { dataset, classifier }).then(r => r.data),

  predict: (dataset: Dataset, classifier: ClassifierKey, features: number[]) =>
    API.post<PredictResponse>('/predict', { dataset, classifier, features }).then(r => r.data),

  predictAndSave: (dataset: Dataset, classifier: ClassifierKey, features: number[]) =>
    API.post<PredictResponse>('/predict-and-save', { dataset, classifier, features }).then(r => r.data),

  getDatasetInfo: (dataset: Dataset) =>
    API.get<DatasetInfo>('/dataset/info', { params: { dataset } }).then(r => r.data),

  getConfusionMatrix: (dataset: Dataset, classifier: ClassifierKey) =>
    API.get<ConfusionMatrixData>('/visualize/confusion-matrix', { params: { dataset, classifier } }).then(r => r.data),

  getPCA: (dataset: Dataset) =>
    API.get<PCAData>('/visualize/pca', { params: { dataset } }).then(r => r.data),

  getRealVsPredicted: (dataset: Dataset, classifier: ClassifierKey) =>
    API.get<RealVsPredicted>('/visualize/real-vs-predicted', { params: { dataset, classifier } }).then(r => r.data),

  getMetricsComparison: (dataset: Dataset) =>
    API.get<MetricsComparison>('/metrics/comparison', { params: { dataset } }).then(r => r.data),

  getPredictionHistory: () =>
    API.get('/prediction-history').then(r => r.data),
};
