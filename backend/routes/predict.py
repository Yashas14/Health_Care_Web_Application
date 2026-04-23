"""Predict endpoint — makes predictions with custom user input."""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Literal

router = APIRouter(prefix="/api", tags=["predict"])


class PredictRequest(BaseModel):
    dataset: Literal["heart", "cancer"]
    classifier: Literal["lr", "knn", "svm", "rf", "xgb"]
    features: list[float]


class PredictResponse(BaseModel):
    prediction: int
    label: str
    confidence: float | None = None


def create_predict_router(heart_model, cancer_model):
    @router.post("/predict", response_model=PredictResponse)
    async def predict(req: PredictRequest):
        model = heart_model if req.dataset == "heart" else cancer_model
        expected = len(model.X.columns)
        if len(req.features) != expected:
            raise HTTPException(
                status_code=400,
                detail=f"Expected {expected} features, got {len(req.features)}"
            )
        try:
            result = model.predict(req.classifier, req.features)
            return PredictResponse(**result)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    return router
