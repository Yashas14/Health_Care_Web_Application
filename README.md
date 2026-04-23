# 🏥 Healthcare ML — Heart Attack & Breast Cancer Prediction

> A modern full-stack healthcare prediction system powered by 5 machine learning classifiers.
> Based on peer-reviewed research published in **IEEE Xplore**.

## 📄 Paper Citation

**"Exploratory Analysis of Heart Attack and Breast Cancer Early Stage Prediction: Revolutionizing Patient-Centric Healthcare with Technology"**

- **Published in:** IEEE Xplore Digital Library (ICCSP 2024)
- **DOI:** [10.1109/ICCSP60870.2024.10941411](https://ieeexplore.ieee.org/document/10941411)

---
## ⚙️ Model Playground  

Experiment with various classification algorithms for disease prediction:

- 🧮 Logistic Regression  
- 👣 K-Nearest Neighbors (KNN)  
- 🌲 Random Forest  
- 💫 Support Vector Machine (SVM)  
- 🚀 XGBoost  

### 📊 Visualization Galore  
- 🧬 PCA-based 2D projections  
- 📉 Real vs. Predicted Value Plots  
- 🔥 Confusion Matrix Heatmap  
- 📈 Dynamic Metric Display: Precision, Recall, F1-Score, Accuracy & MSE  

### 👤 User Custom Input Section  
Predict outcomes using sliders for each health feature — simulate real-world test cases!

### ⏱️ Efficient Execution Time Display  
Track model inference time for performance comparison.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, TypeScript, Tailwind CSS, Framer Motion, Recharts, Lucide Icons |
| **Backend** | FastAPI (Python), Pydantic, SQLAlchemy |
| **ML Pipeline** | scikit-learn, XGBoost, PCA, StandardScaler |
| **Database** | SQLite (prediction history) |
| **Build Tool** | Vite |

---

## 📁 Project Structure

```
MediPredict_Health_Care_Web_Application/
├── backend/
│   ├── main.py                  # FastAPI entry point
│   ├── database.py              # SQLite prediction history
│   ├── models/
│   │   ├── heart_model.py       # Heart attack ML pipeline
│   │   └── cancer_model.py      # Breast cancer ML pipeline
│   ├── routes/
│   │   ├── predict.py           # /predict endpoint
│   │   ├── train.py             # /train endpoint
│   │   └── visualize.py         # /metrics, /confusion_matrix, /pca
│   ├── data/
│   │   ├── heart.csv
│   │   └── BreastCancer.csv
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   ├── pages/                # Route pages
│   │   ├── hooks/                # Custom hooks & API layer
│   │   ├── types/                # TypeScript type definitions
│   │   └── App.tsx               # Root app with routing
│   ├── tailwind.config.js
│   └── package.json
│
├── .env.example
├── .gitignore
├── settings.json
└── README.md
```

---

## 🛠️ Setup Instructions

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm or yarn

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.
Interactive docs at `http://localhost:8000/docs`.

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔌 API Documentation

### Train a Model
```
POST /api/train
Body: { "dataset": "heart" | "cancer", "classifier": "lr" | "knn" | "svm" | "rf" | "xgb" }
Response: { accuracy, precision, recall, f1, mse, execution_time, confusion_matrix, ... }
```

### Make a Prediction
```
POST /api/predict
Body: { "dataset": "heart" | "cancer", "classifier": "lr|knn|svm|rf|xgb", "features": [float, ...] }
Response: { prediction: 0|1, label: "Low Risk"|"High Risk", confidence: float }
```

### Get Confusion Matrix
```
GET /api/visualize/confusion-matrix?dataset=heart&classifier=rf
Response: { matrix: [[TN,FP],[FN,TP]], labels: ["No Disease","Disease"] }
```

### Get PCA Visualization
```
GET /api/visualize/pca?dataset=heart
Response: { points: [{x, y, label}], explained_variance: [float, float] }
```

### Compare All Classifiers
```
GET /api/metrics/comparison?dataset=heart
Response: { classifiers, accuracies, precisions, recalls, f1_scores, mse_values, execution_times }
```

### Real vs Predicted
```
GET /api/visualize/real-vs-predicted?dataset=heart&classifier=rf
Response: { y_test: [...], y_pred: [...] }
```

### Dataset Info
```
GET /api/dataset/info?dataset=heart
Response: { name, samples, features, classes, feature_names, feature_meta, class_distribution }
```

### Prediction History
```
GET /api/prediction-history
Response: [{ id, dataset, classifier, prediction, label, confidence, created_at }]
```

---

## 🔬 ML Pipeline (Paper-Faithful)

- **Datasets:** Heart Disease (UCI, 303 samples, 13 features), Breast Cancer Wisconsin (569 samples, 30 features)
- **Preprocessing:** StandardScaler normalization, LabelEncoder for categoricals
- **Train/Test Split:** 80/20 with random_state=65
- **Classifiers:** Logistic Regression, KNN, SVM (RBF), Random Forest, XGBoost — all with sklearn defaults
- **Metrics:** Accuracy, Precision, Recall, F1-Score, MSE
- **Visualizations:** PCA 2D scatter, Confusion Matrix heatmap, Real vs Predicted comparison

---

## 📸 Screenshots

> Screenshots to be added after first run.
<img width="1898" height="943" alt="image" src="https://github.com/user-attachments/assets/5d994b6e-98b8-4df3-b0ce-a98395507f9a" />
<img width="1904" height="939" alt="image" src="https://github.com/user-attachments/assets/e4ba9af6-6d94-4821-9d0c-19bc7fa2d4fa" />
<img width="1907" height="942" alt="image" src="https://github.com/user-attachments/assets/b40a3408-7ed2-41a2-9bcc-6bc08643f71b" />
<img width="1906" height="946" alt="image" src="https://github.com/user-attachments/assets/2a0388a2-e74e-4d90-8a5c-54f110a78f3e" />
<img width="1910" height="940" alt="image" src="https://github.com/user-attachments/assets/abc65869-cd26-47cc-9776-e323a75f0e31" />

---

## 📝 License

This project is based on research published through IEEE.
Please cite the paper if you use this work.



## 🤝 Connect With Me

**👨‍💻 Yashas D**  
🔗 [LinkedIn](https://www.linkedin.com/in/yashasd2004/)  
📬 [GitHub](https://github.com/Yashas14)  

> ⭐ If you found this project insightful or helpful, don’t forget to **star ⭐ the repo**, **raise issues**, or contribute! Let’s build impactful solutions together.
