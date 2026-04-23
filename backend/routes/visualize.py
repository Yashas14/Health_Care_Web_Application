"""Visualization endpoints — confusion matrix, PCA, metrics comparison, real vs predicted."""

from fastapi import APIRouter, HTTPException, Query
from typing import Literal

router = APIRouter(prefix="/api", tags=["visualize"])


def create_visualize_router(heart_model, cancer_model):

    def _get_model(dataset: str):
        return heart_model if dataset == "heart" else cancer_model

    @router.get("/visualize/confusion-matrix")
    async def confusion_matrix_endpoint(
        dataset: Literal["heart", "cancer"] = Query(...),
        classifier: Literal["lr", "knn", "svm", "rf", "xgb"] = Query(...)
    ):
        model = _get_model(dataset)
        try:
            return model.get_confusion_matrix(classifier)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @router.get("/visualize/pca")
    async def pca_endpoint(
        dataset: Literal["heart", "cancer"] = Query(...)
    ):
        model = _get_model(dataset)
        try:
            return model.get_pca()
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @router.get("/visualize/real-vs-predicted")
    async def real_vs_predicted(
        dataset: Literal["heart", "cancer"] = Query(...),
        classifier: Literal["lr", "knn", "svm", "rf", "xgb"] = Query(...)
    ):
        model = _get_model(dataset)
        try:
            return model.get_real_vs_predicted(classifier)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @router.get("/metrics/comparison")
    async def metrics_comparison(
        dataset: Literal["heart", "cancer"] = Query(...)
    ):
        model = _get_model(dataset)
        try:
            results = model.compare_all()
            classifier_names = {
                "lr": "Logistic Regression",
                "knn": "KNN",
                "svm": "SVM",
                "rf": "Random Forest",
                "xgb": "XGBoost",
            }
            return {
                "classifiers": [classifier_names[k] for k in results],
                "classifier_keys": list(results.keys()),
                "accuracies": [results[k]["accuracy"] for k in results],
                "precisions": [results[k]["precision"] for k in results],
                "recalls": [results[k]["recall"] for k in results],
                "f1_scores": [results[k]["f1"] for k in results],
                "mse_values": [results[k]["mse"] for k in results],
                "execution_times": [results[k]["execution_time"] for k in results],
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @router.get("/dataset/info")
    async def dataset_info(
        dataset: Literal["heart", "cancer"] = Query(...)
    ):
        model = _get_model(dataset)
        try:
            return model.info()
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    return router
