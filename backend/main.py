"""
FastAPI main entry point for the Healthcare ML application.
Paper: "Exploratory Analysis of Heart Attack and Breast Cancer Early Stage Prediction"
DOI: https://ieeexplore.ieee.org/document/10941411
"""

import json
import os
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from models.heart_model import HeartModel
from models.cancer_model import CancerModel
from routes.train import create_train_router
from routes.predict import create_predict_router, PredictRequest
from routes.visualize import create_visualize_router
from database import get_db, PredictionRecord

# ── Instantiate ML models (loaded once at startup) ──
heart_model = HeartModel()
cancer_model = CancerModel()

# ── FastAPI app ──
app = FastAPI(
    title="Healthcare ML API",
    description=(
        "REST API for Heart Attack and Breast Cancer early-stage prediction "
        "using 5 ML classifiers. Based on IEEE Xplore paper DOI:10941411."
    ),
    version="2.0.0",
)

# ── CORS ──
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:3000"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Register routers ──
app.include_router(create_train_router(heart_model, cancer_model))
app.include_router(create_predict_router(heart_model, cancer_model))
app.include_router(create_visualize_router(heart_model, cancer_model))


# ── Additional endpoints ──
@app.get("/")
async def root():
    return {
        "message": "Healthcare ML API is running",
        "docs": "/docs",
        "paper": "https://ieeexplore.ieee.org/document/10941411",
    }


@app.get("/api/health")
async def health():
    return {"status": "ok"}


@app.get("/api/prediction-history")
async def prediction_history(db: Session = Depends(get_db)):
    records = db.query(PredictionRecord).order_by(
        PredictionRecord.created_at.desc()
    ).limit(50).all()
    return [
        {
            "id": r.id,
            "dataset": r.dataset,
            "classifier": r.classifier,
            "prediction": r.prediction,
            "label": r.label,
            "confidence": r.confidence,
            "created_at": r.created_at.isoformat() if r.created_at else None,
        }
        for r in records
    ]


# Override predict to also store in DB
@app.post("/api/predict-and-save")
async def predict_and_save(req: PredictRequest, db: Session = Depends(get_db)):
    model = heart_model if req.dataset == "heart" else cancer_model
    result = model.predict(req.classifier, req.features)
    record = PredictionRecord(
        dataset=req.dataset,
        classifier=req.classifier,
        prediction=result["prediction"],
        label=result["label"],
        confidence=result["confidence"],
        features=json.dumps(req.features),
    )
    db.add(record)
    db.commit()
    return result
