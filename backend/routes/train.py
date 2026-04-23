"""Train endpoint — trains a selected classifier on a selected dataset."""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Literal

router = APIRouter(prefix="/api", tags=["train"])


class TrainRequest(BaseModel):
    dataset: Literal["heart", "cancer"]
    classifier: Literal["lr", "knn", "svm", "rf", "xgb"]


class TrainResponse(BaseModel):
    accuracy: float
    precision: float
    recall: float
    f1: float
    mse: float
    execution_time: float
    fit_time: float
    pred_time: float
    confusion_matrix: list
    y_test: list
    y_pred: list


def create_train_router(heart_model, cancer_model):
    @router.post("/train", response_model=TrainResponse)
    async def train(req: TrainRequest):
        model = heart_model if req.dataset == "heart" else cancer_model
        try:
            result = model.train(req.classifier)
            return TrainResponse(**result)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    return router
