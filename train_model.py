import pandas as pd
from xgboost import XGBRegressor
import joblib

# Load data
df = pd.read_csv("sales_data.csv")

# Features (inputs)
X = df[["selling_price", "competitor_price"]]

# Target (output)
y = df["quantity_sold"]

# Train model
model = XGBRegressor()
model.fit(X, y)

# Save model
joblib.dump(model, "price_model.pkl")

print("Model trained and saved!")
