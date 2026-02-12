# basic FastAPI endpoints
from fastapi import FastAPI
import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from src.data_utils import load_inventory, load_sales
from src.demand_forecasting import train_and_save, predict_future, load_model
from src.run_all import generate_report

app = FastAPI()

@app.post("/train")
def train_endpoint():
    train_and_save()
    return {"status":"model_trained"}

@app.post("/forecast")
def forecast_endpoint(store: int, item: int, days: int = 14):
    sales = load_sales()
    last_date = sales['date'].max()
    preds = predict_future(store, item, start_date=last_date, days=days)
    return preds.to_dict(orient="records")

@app.get("/inventory_report")
def inventory_report():
    metrics, insights = generate_report(days=14)
    return {"metrics": metrics.to_dict(orient="records"), "insights": insights}
