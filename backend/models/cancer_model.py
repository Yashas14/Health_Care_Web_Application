"""
Breast Cancer ML Pipeline
Faithful to the IEEE paper: same dataset, same preprocessing, same classifiers with default hyperparameters.
"""

import time
import numpy as np
import pandas as pd
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.decomposition import PCA
from sklearn.metrics import (
    accuracy_score, confusion_matrix, precision_recall_fscore_support, mean_squared_error
)
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier

DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "BreastCancer.csv"

FEATURE_COLUMNS = [
    "radius_mean", "texture_mean", "perimeter_mean", "area_mean",
    "smoothness_mean", "compactness_mean", "concavity_mean",
    "concave points_mean", "symmetry_mean", "fractal_dimension_mean",
    "radius_se", "texture_se", "perimeter_se", "area_se",
    "smoothness_se", "compactness_se", "concavity_se",
    "concave points_se", "symmetry_se", "fractal_dimension_se",
    "radius_worst", "texture_worst", "perimeter_worst", "area_worst",
    "smoothness_worst", "compactness_worst", "concavity_worst",
    "concave points_worst", "symmetry_worst", "fractal_dimension_worst",
]
TARGET_COLUMN = "diagnosis"

FEATURE_META = {
    "radius_mean": {"label": "Radius Mean", "min": 5.0, "max": 30.0, "step": 0.1, "default": 14.0},
    "texture_mean": {"label": "Texture Mean", "min": 9.0, "max": 40.0, "step": 0.1, "default": 19.0},
    "perimeter_mean": {"label": "Perimeter Mean", "min": 40.0, "max": 200.0, "step": 0.1, "default": 92.0},
    "area_mean": {"label": "Area Mean", "min": 140.0, "max": 2600.0, "step": 1.0, "default": 650.0},
    "smoothness_mean": {"label": "Smoothness Mean", "min": 0.05, "max": 0.17, "step": 0.001, "default": 0.1},
    "compactness_mean": {"label": "Compactness Mean", "min": 0.02, "max": 0.35, "step": 0.001, "default": 0.1},
    "concavity_mean": {"label": "Concavity Mean", "min": 0.0, "max": 0.45, "step": 0.001, "default": 0.09},
    "concave points_mean": {"label": "Concave Points Mean", "min": 0.0, "max": 0.2, "step": 0.001, "default": 0.05},
    "symmetry_mean": {"label": "Symmetry Mean", "min": 0.1, "max": 0.35, "step": 0.001, "default": 0.18},
    "fractal_dimension_mean": {"label": "Fractal Dimension Mean", "min": 0.04, "max": 0.1, "step": 0.001, "default": 0.06},
    "radius_se": {"label": "Radius SE", "min": 0.1, "max": 3.0, "step": 0.01, "default": 0.4},
    "texture_se": {"label": "Texture SE", "min": 0.3, "max": 5.0, "step": 0.01, "default": 1.2},
    "perimeter_se": {"label": "Perimeter SE", "min": 0.7, "max": 22.0, "step": 0.1, "default": 3.0},
    "area_se": {"label": "Area SE", "min": 6.0, "max": 550.0, "step": 1.0, "default": 40.0},
    "smoothness_se": {"label": "Smoothness SE", "min": 0.001, "max": 0.03, "step": 0.001, "default": 0.007},
    "compactness_se": {"label": "Compactness SE", "min": 0.002, "max": 0.14, "step": 0.001, "default": 0.025},
    "concavity_se": {"label": "Concavity SE", "min": 0.0, "max": 0.4, "step": 0.001, "default": 0.03},
    "concave points_se": {"label": "Concave Points SE", "min": 0.0, "max": 0.05, "step": 0.001, "default": 0.01},
    "symmetry_se": {"label": "Symmetry SE", "min": 0.007, "max": 0.08, "step": 0.001, "default": 0.02},
    "fractal_dimension_se": {"label": "Fractal Dimension SE", "min": 0.0, "max": 0.03, "step": 0.001, "default": 0.004},
    "radius_worst": {"label": "Radius Worst", "min": 7.0, "max": 37.0, "step": 0.1, "default": 16.0},
    "texture_worst": {"label": "Texture Worst", "min": 12.0, "max": 50.0, "step": 0.1, "default": 25.0},
    "perimeter_worst": {"label": "Perimeter Worst", "min": 50.0, "max": 260.0, "step": 0.1, "default": 107.0},
    "area_worst": {"label": "Area Worst", "min": 180.0, "max": 4300.0, "step": 1.0, "default": 880.0},
    "smoothness_worst": {"label": "Smoothness Worst", "min": 0.07, "max": 0.23, "step": 0.001, "default": 0.13},
    "compactness_worst": {"label": "Compactness Worst", "min": 0.02, "max": 1.1, "step": 0.01, "default": 0.25},
    "concavity_worst": {"label": "Concavity Worst", "min": 0.0, "max": 1.3, "step": 0.01, "default": 0.27},
    "concave points_worst": {"label": "Concave Points Worst", "min": 0.0, "max": 0.3, "step": 0.001, "default": 0.11},
    "symmetry_worst": {"label": "Symmetry Worst", "min": 0.15, "max": 0.66, "step": 0.01, "default": 0.29},
    "fractal_dimension_worst": {"label": "Fractal Dim Worst", "min": 0.05, "max": 0.21, "step": 0.001, "default": 0.08},
}


class CancerModel:
    def __init__(self):
        self.df = pd.read_csv(DATA_PATH)
        self.le = LabelEncoder()
        self.df[TARGET_COLUMN] = self.le.fit_transform(self.df[TARGET_COLUMN])
        self.df.replace([np.inf, -np.inf], np.nan, inplace=True)
        self.df.dropna(inplace=True)

        self.X = self.df[FEATURE_COLUMNS].copy()
        self.Y = self.df[TARGET_COLUMN].copy()
        self.trained_models: dict = {}
        self.metrics_cache: dict = {}

    def _get_classifier(self, name: str):
        clfs = {
            "lr": LogisticRegression(max_iter=1000),
            "knn": KNeighborsClassifier(),
            "svm": SVC(probability=True),
            "rf": RandomForestClassifier(),
            "xgb": XGBClassifier(eval_metric="logloss"),
        }
        return clfs[name]

    def train(self, classifier: str):
        X_train, X_test, Y_train, Y_test = train_test_split(
            self.X, self.Y, test_size=0.2, random_state=65
        )

        scaler = StandardScaler()
        X_train_sc = scaler.fit_transform(X_train)
        X_test_sc = scaler.transform(X_test)

        clf = self._get_classifier(classifier)

        start = time.perf_counter()
        clf.fit(X_train_sc, Y_train)
        fit_time = time.perf_counter() - start

        start = time.perf_counter()
        Y_pred = clf.predict(X_test_sc)
        pred_time = time.perf_counter() - start

        acc = accuracy_score(Y_test, Y_pred)
        mse = mean_squared_error(Y_test, Y_pred)
        precision, recall, f1, _ = precision_recall_fscore_support(
            Y_test, Y_pred, pos_label=1, average="binary"
        )
        cm = confusion_matrix(Y_test, Y_pred).tolist()

        self.trained_models[classifier] = {"clf": clf, "scaler": scaler}
        self.metrics_cache[classifier] = {
            "accuracy": round(acc, 4),
            "precision": round(precision, 4),
            "recall": round(recall, 4),
            "f1": round(f1, 4),
            "mse": round(mse, 4),
            "fit_time": round(fit_time, 4),
            "pred_time": round(pred_time, 4),
            "execution_time": round(fit_time + pred_time, 4),
            "confusion_matrix": cm,
            "y_test": Y_test.tolist(),
            "y_pred": Y_pred.tolist(),
        }
        return self.metrics_cache[classifier]

    def predict(self, classifier: str, features: list[float]):
        if classifier not in self.trained_models:
            self.train(classifier)
        model_info = self.trained_models[classifier]
        df = pd.DataFrame([features], columns=FEATURE_COLUMNS)
        df_sc = model_info["scaler"].transform(df)
        pred = model_info["clf"].predict(df_sc)[0]
        proba = None
        if hasattr(model_info["clf"], "predict_proba"):
            proba = model_info["clf"].predict_proba(df_sc)[0]
        confidence = float(max(proba)) if proba is not None else None
        return {
            "prediction": int(pred),
            "label": "High Risk" if pred == 1 else "Low Risk",
            "confidence": round(confidence, 4) if confidence else None,
        }

    def get_confusion_matrix(self, classifier: str):
        if classifier not in self.metrics_cache:
            self.train(classifier)
        cm = self.metrics_cache[classifier]["confusion_matrix"]
        return {"matrix": cm, "labels": ["Benign", "Malignant"]}

    def get_pca(self):
        scaler = StandardScaler()
        X_sc = scaler.fit_transform(self.X)
        pca = PCA(n_components=2)
        X_pca = pca.fit_transform(X_sc)
        points = [
            {"x": round(float(X_pca[i, 0]), 4),
             "y": round(float(X_pca[i, 1]), 4),
             "label": int(self.Y.iloc[i])}
            for i in range(len(X_pca))
        ]
        return {
            "points": points,
            "explained_variance": [round(float(v), 4) for v in pca.explained_variance_ratio_],
        }

    def get_real_vs_predicted(self, classifier: str):
        if classifier not in self.metrics_cache:
            self.train(classifier)
        return {
            "y_test": self.metrics_cache[classifier]["y_test"],
            "y_pred": self.metrics_cache[classifier]["y_pred"],
        }

    def compare_all(self):
        results = {}
        for clf_key in ["lr", "knn", "svm", "rf", "xgb"]:
            if clf_key not in self.metrics_cache:
                self.train(clf_key)
            results[clf_key] = self.metrics_cache[clf_key]
        return results

    def info(self):
        return {
            "name": "Breast Cancer",
            "samples": len(self.df),
            "features": len(FEATURE_COLUMNS),
            "classes": int(self.Y.nunique()),
            "feature_names": FEATURE_COLUMNS,
            "feature_meta": FEATURE_META,
            "class_distribution": self.Y.value_counts().to_dict(),
        }
