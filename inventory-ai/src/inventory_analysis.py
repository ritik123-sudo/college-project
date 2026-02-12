# compute reorder points, days_left, recommended_qty
import numpy as np
import pandas as pd

def compute_safety_stock(std_demand, lead_time, z=1.65):
    return int(np.ceil(z * std_demand * np.sqrt(lead_time)))

def analyze(inventory_df, forecast_df, days_horizon=14, lead_time_default=7):
    # forecast_df: columns date, product (string), predicted_sales
    grouped = forecast_df.groupby("product")["predicted_sales"].agg(["mean","std","sum"]).reset_index()
    out = []
    for _, row in inventory_df.iterrows():
        pid = str(row["product_id"])
        cs = float(row["current_stock"])
        lt = int(row.get("lead_time_days", lead_time_default))
        g = grouped[grouped["product"]==pid]
        if not g.empty:
            daily_avg = float(g["mean"].iloc[0])
            daily_std = float(g["std"].iloc[0])
            sum_next = float(g["sum"].iloc[0])
        else:
            daily_avg = 0.0; daily_std = 0.0; sum_next = 0.0
        safety = compute_safety_stock(daily_std, lt)
        reorder_point = daily_avg * lt + safety
        days_left = None if daily_avg==0 else cs / max(daily_avg,1e-6)
        recommended = max(0, int(np.ceil(sum_next - cs)))
        status = "Critical" if cs < reorder_point else ("Low" if cs < reorder_point*1.2 else "In Stock")
        out.append({
            "product": pid, "current_stock": cs, "lead_time": lt,
            "daily_avg": round(daily_avg,3), "safety_stock": safety,
            "reorder_point": round(reorder_point,3), "days_left": None if days_left is None else round(days_left,2),
            "recommended_qty": recommended, "status": status
        })
    return pd.DataFrame(out)
