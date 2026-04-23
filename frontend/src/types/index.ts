// ---- Types shared across the frontend ----

export type Dataset = 'heart' | 'cancer';
export type ClassifierKey = 'lr' | 'knn' | 'svm' | 'rf' | 'xgb';

export interface ClassifierOption {
  key: ClassifierKey;
  label: string;
  description: string;
  icon: string;
}

export const CLASSIFIERS: ClassifierOption[] = [
  { key: 'lr', label: 'Logistic Regression', description: 'Linear model for binary classification', icon: 'TrendingUp' },
  { key: 'knn', label: 'KNN', description: 'K-Nearest Neighbors classifier', icon: 'Users' },
  { key: 'svm', label: 'SVM', description: 'Support Vector Machine', icon: 'Maximize2' },
  { key: 'rf', label: 'Random Forest', description: 'Ensemble of decision trees', icon: 'TreePine' },
  { key: 'xgb', label: 'XGBoost', description: 'Extreme Gradient Boosting', icon: 'Zap' },
];

export interface TrainResponse {
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  mse: number;
  execution_time: number;
  fit_time: number;
  pred_time: number;
  confusion_matrix: number[][];
  y_test: number[];
  y_pred: number[];
}

export interface PredictResponse {
  prediction: number;
  label: string;
  confidence: number | null;
}

export interface DatasetInfo {
  name: string;
  samples: number;
  features: number;
  classes: number;
  feature_names: string[];
  feature_meta: Record<string, FeatureMeta>;
  class_distribution: Record<string, number>;
}

export interface FeatureMeta {
  label: string;
  min: number;
  max: number;
  step: number;
  default: number;
}

export interface PCAData {
  points: { x: number; y: number; label: number }[];
  explained_variance: number[];
}

export interface MetricsComparison {
  classifiers: string[];
  classifier_keys: string[];
  accuracies: number[];
  precisions: number[];
  recalls: number[];
  f1_scores: number[];
  mse_values: number[];
  execution_times: number[];
}

export interface ConfusionMatrixData {
  matrix: number[][];
  labels: string[];
}

export interface RealVsPredicted {
  y_test: number[];
  y_pred: number[];
}
