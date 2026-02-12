import joblib
import numpy as np

# Load saved model
model = joblib.load("price_model.pkl")

# Check how many features model expects
print("Model expects:", model.n_features_in_, "features")

# Give EXACT number of features (2)
sample = np.array([[100, 1]])   # <-- Only 2 values

prediction = model.predict(sample)

print("Prediction:", prediction)


