# train & use XGBoost model (minimal, easy)
import joblib
import pandas as pd
import numpy as np
from xgboost import XGBRegressor
from .data_utils import load_sales
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MODELS = ROOT / "models"
MODELS.mkdir(exist_ok=True)
MODEL_PATH = MODELS / "demand_model.pkl"

def prepare(df):
    df = df.copy()
    df["day_of_week"] = df["date"].dt.dayofweek
    df["store"] = df["store"].astype(str)
    df["item"] = df["item"].astype(str)
    # keep price & promo if present
    df = pd.get_dummies(df, columns=["store","item"], drop_first=True)
    return df.fillna(0)

def train_and_save():
    df = load_sales()
    df = prepare(df)
    X = df.drop(columns=["date","sales"])
    y = df["sales"]
    # simple time split
    split = int(len(X)*0.8)
    X_train, X_val = X.iloc[:split], X.iloc[split:]
    y_train, y_val = y.iloc[:split], y.iloc[split:]
    model = XGBRegressor(n_estimators=200, learning_rate=0.05, max_depth=6, subsample=0.8,
                         colsample_bytree=0.8, random_state=42, verbosity=0)
    model.fit(X_train, y_train, eval_set=[(X_val, y_val)], verbose=False)
    joblib.dump((model, X.columns.tolist()), MODEL_PATH)
    print("Saved model to", MODEL_PATH)
    return model

def load_model():
    model, cols = joblib.load(MODEL_PATH)
    return model, cols

def predict_future(store, item, start_date, days=14, price=0.0, promo=0):
    model, cols = load_model()
    dates = pd.date_range(start=pd.to_datetime(start_date) + pd.Timedelta(days=1), periods=days)
    df = pd.DataFrame({"date": dates, "store": str(store), "item": str(item), "price": price, "promo": promo})
    df = prepare(df)
    # ensure all training columns exist
    for c in cols:
        if c not in df.columns:
            df[c] = 0
    X = df[cols]
    preds = model.predict(X)
    return pd.DataFrame({"date": dates, "predicted_sales": np.round(preds,3)})
