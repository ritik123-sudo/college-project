# ================== IMPORTS ==================
import re
import datetime
import pandas as pd

from fastapi import FastAPI
from pydantic import BaseModel

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier

from prophet import Prophet

# ================== FASTAPI ==================
app = FastAPI()

# ================== ML MODEL ==================
texts = [
    "dominos pizza","pizza hut order","mcdonalds burger","burger king meal",
    "kfc chicken bucket","subway sandwich","restaurant dinner","cafe coffee bill",
    "starbucks latte","food delivery zomato",

    "uber ride","ola cab","taxi fare","bus ticket",
    "train ticket","metro recharge","flight ticket","cab booking",
    "auto rickshaw ride","fuel petrol pump",

    "electricity bill","water bill","internet recharge","wifi bill",
    "mobile recharge","gas bill","broadband bill","dth recharge",
    "tv cable bill","utility payment",

    "grocery store purchase","supermarket shopping","vegetables fruits",
    "kirana store bill","milk bread eggs","fruit shop purchase",
    "vegetable market bill","grocery mart bill","daily grocery items",
    "household grocery",

    "amazon order","flipkart purchase","online shopping",
    "clothing store","electronics purchase","mobile phone purchase",
    "laptop purchase","shoes purchase","fashion store bill","retail store purchase",

    "medical pharmacy","doctor consultation","hospital bill",
    "clinic visit fee","medicine purchase","lab test bill",
    "health checkup","diagnostic center bill","pharmacy bill","hospital payment"
]

labels = (
    ["food"]*10 +
    ["transport"]*10 +
    ["utilities"]*10 +
    ["grocery"]*10 +
    ["shopping"]*10 +
    ["health"]*10
)

vectorizer = TfidfVectorizer(ngram_range=(1,2))
X = vectorizer.fit_transform(texts)

clf_model = RandomForestClassifier(n_estimators=200)
clf_model.fit(X, labels)

# ================== STORAGE ==================
database = []

# ================== FUNCTIONS ==================

def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9 ]', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def extract_amount(text):
    nums = [int(n) for n in re.findall(r'\d+', text)]
    nums = [n for n in nums if 50 < n < 50000]
    return max(nums) if nums else 0

def extract_date(text):
    match = re.search(r'\d{2}/\d{2}/\d{4}', text)
    return match.group() if match else str(datetime.date.today())

def predict_category(text):
    text = clean_text(text)
    vec = vectorizer.transform([text])
    return clf_model.predict(vec)[0]

def save_expense(amount, category, date):
    database.append({
        "amount": amount,
        "category": category,
        "date": date
    })

def process_expense(text):
    amount = extract_amount(text)
    date = extract_date(text)
    category = predict_category(text)

    save_expense(amount, category, date)

    return {
        "amount": amount,
        "date": date,
        "category": category
    }

def prepare_dataframe():
    if len(database) < 2:
        sample_amounts = [500, 800, 1200]
        dates = pd.date_range(start="2026-03-24", periods=len(sample_amounts))

        temp = []
        for i in range(len(sample_amounts)):
            temp.append({
                "date": dates[i],
                "amount": sample_amounts[i]
            })
        df = pd.DataFrame(temp)
    else:
        df = pd.DataFrame(database)

    df["date"] = pd.to_datetime(df["date"], errors='coerce')
    df = df.dropna()

    df = df.groupby("date")["amount"].sum().reset_index()
    df.columns = ["ds", "y"]

    return df

def forecast_expenses(df):
    if len(df) < 2:
        return "Not enough data"

    model = Prophet()
    model.fit(df)

    future = model.make_future_dataframe(periods=5)
    forecast = model.predict(future)

    return forecast[["ds", "yhat"]].tail().to_dict()

# ================== API ==================

class TextInput(BaseModel):
    text: str

@app.get("/")
def home():
    return {"message": "Expense API Running 🚀"}

@app.post("/predict")
def predict(data: TextInput):
    expense = process_expense(data.text)
    df = prepare_dataframe()
    forecast = forecast_expenses(df)

    return {
        "expense": expense,
        "forecast": forecast
    }