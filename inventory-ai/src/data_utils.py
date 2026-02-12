# load CSVs
import pandas as pd
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"

def load_sales():
    return pd.read_csv(DATA / "sales_history.csv", parse_dates=["date"])

def load_inventory():
    return pd.read_csv(DATA / "inventory.csv")

