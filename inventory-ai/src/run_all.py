# train model and run inventory report (example runner)
from .demand_forecasting import train_and_save, predict_future, load_model
from .data_utils import load_inventory, load_sales
from .inventory_analysis import analyze
from .insights_engine import generate
import pandas as pd

def train():
    train_and_save()

def generate_report(days=14):
    inv = load_inventory()
    sales = load_sales()
    last_date = sales['date'].max()
    forecasts = []
    for _, r in inv.iterrows():
        pid = r['product_id']
        f = predict_future(store=1, item=int(pid), start_date=last_date, days=days, price=0.0, promo=0)
        f['product'] = str(pid)
        forecasts.append(f[['date','product','predicted_sales']])
    forecast_df = pd.concat(forecasts, ignore_index=True)
    metrics = analyze(inv, forecast_df, days_horizon=days)
    insights = generate(metrics)
    return metrics, insights

if __name__ == "__main__":
    print("Training model...")
    train()
    print("Generating report...")
    m,i = generate_report(14)
    print(m)
    print(i)
