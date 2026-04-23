"""
Heart Attack ML Pipeline
Faithful to the IEEE paper: same dataset, same preprocessing, same classifiers with default hyperparameters.
"""

import time
import pandas as pd
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.metrics import (
    accuracy_score, confusion_matrix, precision_recall_fscore_support, mean_squared_error
)
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier

DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "heart.csv"

FEATURE_COLUMNS = [
    "age", "sex", "cp", "trtbps", "chol", "fbs", "restecg",
    "thalachh", "exng", "oldpeak", "slp", "caa", "thall"
]
TARGET_COLUMN = "output"

FEATURE_META = {
    "age": {"label": "Age", "min": 20, "max": 100, "step": 1, "default": 50},
    "sex": {"label": "Sex (0=F, 1=M)", "min": 0, "max": 1, "step": 1, "default": 1},
    "cp": {"label": "Chest Pain Type (0-3)", "min": 0, "max": 3, "step": 1, "default": 1},
    "trtbps": {"label": "Resting Blood Pressure", "min": 90, "max": 200, "step": 1, "default": 130},
    "chol": {"label": "Cholesterol (mg/dl)", "min": 100, "max": 600, "step": 1, "default": 250},
    "fbs": {"label": "Fasting Blood Sugar > 120", "min": 0, "max": 1, "step": 1, "default": 0},
    "restecg": {"label": "Resting ECG (0-2)", "min": 0, "max": 2, "step": 1, "default": 0},
    "thalachh": {"label": "Max Heart Rate", "min": 60, "max": 220, "step": 1, "default": 150},
    "exng": {"label": "Exercise Induced Angina", "min": 0, "max": 1, "step": 1, "default": 0},
    "oldpeak": {"label": "ST Depression", "min": 0.0, "max": 7.0, "step": 0.1, "default": 1.0},
    "slp": {"label": "Slope (0-2)", "min": 0, "max": 2, "step": 1, "default": 1},
    "caa": {"label": "Number of Major Vessels (0-4)", "min": 0, "max": 4, "step": 1, "default": 0},
    "thall": {"label": "Thalassemia (0-3)", "min": 0, "max": 3, "step": 1, "default": 2},
}


class HeartModel:
    def __init__(self):
        self.df = pd.read_csv(DATA_PATH)
        self.X = self.df[FEATURE_COLUMNS].copy()
        self.Y = self.df[TARGET_COLUMN].copy()
        self.trained_models: dict = {}
        self.metrics_cache: dict = {}

    # ---- helpers ----
    def _get_classifier(self, name: str):
        clfs = {
            "lr": LogisticRegression(max_iter=1000),
            "knn": KNeighborsClassifier(),
            "svm": SVC(probability=True),
            "rf": RandomForestClassifier(),
            "xgb": XGBClassifier(eval_metric="logloss"),
        }
        return clfs[name]

    # ---- train ----
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

        # cache
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

    # ---- predict custom input ----
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

    # ---- confusion matrix ----
    def get_confusion_matrix(self, classifier: str):
        if classifier not in self.metrics_cache:
            self.train(classifier)
        cm = self.metrics_cache[classifier]["confusion_matrix"]
        return {"matrix": cm, "labels": ["No Disease", "Disease"]}

    # ---- PCA ----
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

    # ---- real vs predicted ----
    def get_real_vs_predicted(self, classifier: str):
        if classifier not in self.metrics_cache:
            self.train(classifier)
        return {
            "y_test": self.metrics_cache[classifier]["y_test"],
            "y_pred": self.metrics_cache[classifier]["y_pred"],
        }

    # ---- compare all classifiers ----
    def compare_all(self):
        results = {}
        for clf_key in ["lr", "knn", "svm", "rf", "xgb"]:
            if clf_key not in self.metrics_cache:
                self.train(clf_key)
            results[clf_key] = self.metrics_cache[clf_key]
        return results

    # ---- dataset info ----
    def info(self):
        return {
            "name": "Heart Attack",
            "samples": len(self.df),
            "features": len(FEATURE_COLUMNS),
            "classes": int(self.Y.nunique()),
            "feature_names": FEATURE_COLUMNS,
            "feature_meta": FEATURE_META,
            "class_distribution": self.Y.value_counts().to_dict(),
        }
