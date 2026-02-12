from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

model = joblib.load("price_model.pkl")

def predict_demand(price, competitor_price):
    return float(model.predict([[price, competitor_price]])[0])

def calculate_elasticity(current_price, competitor_price):
    demand_now = predict_demand(current_price, competitor_price)
    demand_up = predict_demand(current_price * 1.1, competitor_price)

    percent_change_demand = (demand_up - demand_now) / demand_now
    percent_change_price = 0.1

    elasticity = percent_change_demand / percent_change_price
    return round(elasticity, 2)

def competitor_difference(price, competitor_price):
    diff_percent = ((price - competitor_price) / competitor_price) * 100
    return round(diff_percent, 2)

def find_best_price(cost, competitor):
    best_price = cost
    best_profit = -1
    best_demand = 0

    for price in np.arange(cost + 5, cost * 2, 1):
        demand = predict_demand(price, competitor)
        profit = (price - cost) * demand

        if profit > best_profit:
            best_profit = profit
            best_price = price
            best_demand = demand

    return best_price, best_demand, best_profit

@app.route("/optimize", methods=["POST"])
def optimize():
    data = request.json
    cost = float(data["cost_price"])
    competitor = float(data["competitor_price"])
    current_price = float(data["current_price"])

    recommended_price, demand, profit = find_best_price(cost, competitor)

    revenue = recommended_price * demand
    elasticity = calculate_elasticity(current_price, competitor)
    competitor_gap = competitor_difference(current_price, competitor)
@app.route("/test")
def test():
    price, demand, profit = find_best_price(80, 100)
    return {
    "price": float(price),
    "demand": float(demand),
    "profit": float(profit)
}



    return jsonify({
        "recommended_price": round(recommended_price, 2),
        "expected_demand": round(demand, 2),
        "expected_revenue": round(revenue, 2),
        "expected_profit": round(profit, 2),
        "price_elasticity": elasticity,
        "competitor_difference_percent": competitor_gap
    })

if __name__ == "__main__":
    app.run(debug=True)
