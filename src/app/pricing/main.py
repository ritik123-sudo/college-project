from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import numpy as np
import xgboost as xgb

# ------------------------------
# LOAD MODEL (IMPORTANT)
# ------------------------------
def load_model_xgb(path):
    model = xgb.XGBRegressor()
    model.load_model(path)
    return model

xgb_model = load_model_xgb("price_optimization_xgb.json")

# ------------------------------
# DUMMY DATA (TEMP FIX)
# ------------------------------
# NOTE: Later replace with database or real-time data
data = pd.DataFrame({
    "units_sold": np.random.randint(200, 400, size=20)
})

# ------------------------------
# CORE FUNCTIONS
# ------------------------------
def predict_units_sold(model, cost_price, selling_price, competitor_price, date):
    date = pd.to_datetime(date)

    day_of_week = date.weekday()
    week_of_year = int(date.isocalendar().week)
    month = date.month

    competitor_gap = selling_price - competitor_price

    lag_1 = data["units_sold"].iloc[-1]
    lag_2 = data["units_sold"].iloc[-2]
    ma_7 = data["units_sold"].tail(7).mean()
    ma_14 = data["units_sold"].tail(14).mean()

    row = pd.DataFrame([{
        "cost_price": cost_price,
        "selling_price": selling_price,
        "competitor_price": competitor_price,
        "competitor_gap": competitor_gap,
        "day_of_week": day_of_week,
        "week_of_year": week_of_year,
        "month": month,
        "ma_7": ma_7,
        "ma_14": ma_14,
        "lag_1": lag_1,
        "lag_2": lag_2,
    }])

    prediction = model.predict(row)[0]
    return round(float(prediction), 2)


def calculate_profit(selling_price, predicted_units, cost_price):
    return (selling_price - cost_price) * predicted_units


def find_optimal_price(model, cost_price, competitor_price, date):
    min_price = max(cost_price, competitor_price * 0.8)
    max_price = competitor_price * 1.2

    prices = np.arange(min_price, max_price + 1, 1)
    profits = []

    for price in prices:
        units = predict_units_sold(model, cost_price, price, competitor_price, date)
        profit = calculate_profit(price, units, cost_price)
        profits.append(profit)

    profits = np.array(profits)
    idx = profits.argmax()

    optimal_price = prices[idx]
    optimal_units = predict_units_sold(model, cost_price, optimal_price, competitor_price, date)
    max_profit = profits[idx]

    return {
        "optimal_price": round(float(optimal_price), 2),
        "predicted_units": optimal_units,
        "expected_profit": round(float(max_profit), 2)
    }


def simulate_price_scenario(model, cost_price, competitor_price, base_price, date):
    changes = [-10, -5, 0, 5, 10]
    results = []

    for change in changes:
        new_price = base_price * (1 + change / 100)
        units = predict_units_sold(model, cost_price, new_price, competitor_price, date)
        profit = calculate_profit(new_price, units, cost_price)

        results.append({
            "price_change_%": change,
            "selling_price": round(float(new_price), 2),
            "predicted_units": units,
            "expected_profit": round(float(profit), 2)
        })

    return results


def price_optimization_engine(model, cost_price, competitor_price, base_price, date):

    predicted_units = predict_units_sold(
        model, cost_price, base_price, competitor_price, date
    )

    optimal_price_info = find_optimal_price(
        model, cost_price, competitor_price, date
    )

    scenario_simulation = simulate_price_scenario(
        model, cost_price, competitor_price, base_price, date
    )

    return {
        "predicted_units_at_base_price": predicted_units,
        "optimal_price_info": optimal_price_info,
        "scenario_simulation": scenario_simulation
    }

# ------------------------------
# FASTAPI PART
# ------------------------------
app = FastAPI(title="BizGenius AI - Price Optimization API")

class PriceRequest(BaseModel):
    cost_price: float
    competitor_price: float
    base_price: float
    date: str


@app.get("/")
def home():
    return {"message": "API running successfully 🚀"}


@app.post("/predict_price")
def predict_price(request: PriceRequest):

    result = price_optimization_engine(
        model=xgb_model,
        cost_price=request.cost_price,
        competitor_price=request.competitor_price,
        base_price=request.base_price,
        date=request.date
    )

    return result