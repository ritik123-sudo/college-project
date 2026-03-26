import numpy as np
import pandas as pd
import joblib
import json
from pathlib import Path
from fastapi import FastAPI, HTTPException
from xgboost import XGBRegressor
import uvicorn

app = FastAPI()

# =========================
# PATHS
# =========================
ROOT = Path(__file__).resolve().parent
MODELS = ROOT / "models"
MODELS.mkdir(exist_ok=True)

MODEL_PATH = MODELS / "model.pkl"
COLS_PATH = MODELS / "columns.json"

# =========================
# DUMMY DATA
# =========================
def generate_dummy_sales(n=100):
    np.random.seed(42)
    dates = pd.date_range(start="2023-01-01", periods=n)

    return pd.DataFrame({
        "date": dates,
        "store": np.random.randint(1, 3, n),
        "item": np.random.randint(100, 105, n),
        "price": np.random.uniform(10, 100, n),
        "promo": np.random.randint(0, 2, n),
        "sales": (
        50 + 10 * np.sin(np.arange(n)/5)   
        + np.random.randint(0, 20, n)  
    ).astype(int)
        })

def generate_dummy_inventory():
    return pd.DataFrame({
        "product_id": [100, 101, 102, 103, 104],
        "current_stock": np.random.randint(300, 800, 5),
        "lead_time_days": np.random.randint(5, 10, 5)
    })

# =========================
# PREPROCESS
# =========================
def prepare(df):
    df = df.copy()

    if "date" in df.columns:
        df["day_of_week"] = df["date"].dt.dayofweek

    df["store"] = df["store"].astype(str)
    df["item"] = df["item"].astype(str)

    df = pd.get_dummies(df, columns=["store", "item"], drop_first=True)

    return df.fillna(0)

# =========================
# TRAIN MODEL ON STARTUP
# =========================
def train_model_once():
    if MODEL_PATH.exists() and COLS_PATH.exists():
        return

    df = generate_dummy_sales()
    df_p = prepare(df)

    X = df_p.drop(columns=["date", "sales"], errors="ignore")
    y = df["sales"]

    model = XGBRegressor(n_estimators=100, max_depth=5, random_state=42)
    model.fit(X, y)

    joblib.dump(model, MODEL_PATH)

    with open(COLS_PATH, "w") as f:
        json.dump(list(X.columns), f)

    print("✅ Model trained and saved")

# =========================
# LOAD MODEL
# =========================
def load_model():
    if not MODEL_PATH.exists():
        raise Exception("Model not trained")

    model = joblib.load(MODEL_PATH)

    with open(COLS_PATH) as f:
        cols = json.load(f)

    return model, cols

# =========================
# PREDICT
# =========================
def predict_future(store, item, start_date, days=14):
    model, cols = load_model()

    dates = pd.date_range(start=start_date, periods=days)

    df = pd.DataFrame({
        "date": dates,
        "store": str(store),
        "item": str(item),
        "price": 50,
        "promo": 0
    })

    df = prepare(df)

    # FIX: column alignment
    for c in cols:
        if c not in df.columns:
            df[c] = 0

    df = df[cols]

    preds = model.predict(df)

    return pd.DataFrame({
        "date": dates,
        "predicted_sales": preds.astype(float)
    })
# =========================
# INVENTORY LOGIC
# =========================
def compute_safety_stock(std, lt):
    return int(np.ceil(1.65 * std * np.sqrt(lt)))

def analyze_inventory(inv, forecast):
    grouped = forecast.groupby("product")["predicted_sales"].agg(["mean","std","sum"]).reset_index()

    result = []

    for _, row in inv.iterrows():
        pid = str(row["product_id"])
        stock = row["current_stock"]
        lt = row["lead_time_days"]

        g = grouped[grouped["product"] == pid]

        if not g.empty:
            avg = g["mean"].iloc[0]
            std = g["std"].iloc[0]
        else:
            avg, std = 0, 0

        reorder = avg * lt + compute_safety_stock(std, lt)
        days_left = stock / avg if avg > 0 else None

        if stock < reorder:
            status = "Critical"
        elif stock < reorder * 1.2:
            status = "Low"
        else:
            status = "Safe"

        result.append({
            "product": str(pid),
            "stock": int(stock),
            "reorder_point": float(round(reorder, 2)),
            "days_left": None if days_left is None else float(round(days_left, 2)),
            "status": status
        })

    return result

# =========================
# STARTUP TRAINING
# =========================
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    train_model_once()
    yield

app = FastAPI(lifespan=lifespan)
# =========================
# API
# =========================
@app.get("/")
def home():
    return {"message": "Inventory API running 🚀"}

@app.post("/inventory")
def inventory():
    try:
        inv = generate_dummy_inventory()

        forecasts = []
        for _, r in inv.iterrows():
            f = predict_future(1, int(r["product_id"]), "2024-01-01")
            f["product"] = str(r["product_id"])
            forecasts.append(f)

        forecast_df = pd.concat(forecasts)

        result = analyze_inventory(inv, forecast_df)

        return {"inventory": result}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# =========================
# RUN
# =========================
if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)