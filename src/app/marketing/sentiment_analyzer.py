# ============================================================
# SENTIMENT ANALYZER — Train + Predict + FastAPI
# ============================================================

import pickle
import re
import os
import pandas as pd
import nltk
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('punkt_tab')

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ============================================================
# PATHS
# ============================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'models', 'sentiment_model.pkl')
VECTORIZER_PATH = os.path.join(BASE_DIR, 'models', 'tfidf_vectorizer.pkl')
DATA_PATH = os.path.join(BASE_DIR, 'data', 'Tweets.csv')

# ============================================================
# STEP 1 — TEXT CLEANING FUNCTIONS
# ============================================================

def clean_text(text):
    """Lowercase aur special characters remove karo"""
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    return text

def remove_stopwords(text):
    """Common English stopwords remove karo"""
    stop_words = set(stopwords.words('english'))
    tokens = word_tokenize(text)
    return ' '.join([word for word in tokens if word not in stop_words])

# ============================================================
# STEP 2 — TRAIN MODEL (sirf ek baar chalao)
# ============================================================

def train_and_save_model():
    """Tweets.csv se model train karo aur .pkl files save karo"""
    print("\n📦 Loading dataset...")
    df = pd.read_csv(DATA_PATH)
    print(df.head())
    print(df.columns)
    print(df['airline_sentiment'].value_counts())

    print("\n🔧 Cleaning text...")
    df['clean_text'] = df['text'].apply(clean_text)
    df['clean_text'] = df['clean_text'].apply(remove_stopwords)
    print("Text preprocessing done ✅")

    # TF-IDF
    tfidf = TfidfVectorizer(max_features=5000)
    X = tfidf.fit_transform(df['clean_text'])
    y = df['airline_sentiment']
    print("Feature matrix shape:", X.shape)

    # Train/Test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # Model train
    print("\n🤖 Training model...")
    model = LogisticRegression(max_iter=1000)
    model.fit(X_train, y_train)

    # Accuracy
    y_pred = model.predict(X_test)
    print("Accuracy:", accuracy_score(y_test, y_pred))
    print("\nClassification Report:\n", classification_report(y_test, y_pred))

    # Save model aur vectorizer
    os.makedirs(os.path.join(BASE_DIR, 'models'), exist_ok=True)
    with open(MODEL_PATH, 'wb') as f:
        pickle.dump(model, f)
    with open(VECTORIZER_PATH, 'wb') as f:
        pickle.dump(tfidf, f)
    print("\nModel and Vectorizer saved ✅")

# ============================================================
# STEP 3 — LOAD TRAINED MODEL
# ============================================================

with open(MODEL_PATH, 'rb') as f:
    model = pickle.load(f)

with open(VECTORIZER_PATH, 'rb') as f:
    vectorizer = pickle.load(f)

print("✅ Model and vectorizer loaded successfully!")

# ============================================================
# STEP 4 — PREDICT FUNCTIONS
# ============================================================

def predict_sentiment(text):
    """
    Single text ka sentiment predict karo

    Args:
        text (str): Review ya comment

    Returns:
        dict: sentiment, confidence
    """
    cleaned = clean_text(text)
    cleaned = remove_stopwords(cleaned)
    features = vectorizer.transform([cleaned])
    prediction = model.predict(features)[0]
    probabilities = model.predict_proba(features)[0]
    confidence = max(probabilities)

    return {
        "text": text,
        "sentiment": prediction,
        "confidence": round(float(confidence), 2)
    }


def analyze_multiple_reviews(reviews_list):
    """
    Multiple reviews ka sentiment analyze karo

    Args:
        reviews_list (list): List of review texts

    Returns:
        dict: results + summary
    """
    results = []
    for review in reviews_list:
        result = predict_sentiment(review)
        results.append(result)

    sentiments = [r['sentiment'] for r in results]
    summary = {
        'positive': sentiments.count('positive'),
        'negative': sentiments.count('negative'),
        'neutral': sentiments.count('neutral')
    }

    return {
        'results': results,
        'summary': summary,
        'total': len(results)
    }

# ============================================================
# STEP 5 — FASTAPI
# ============================================================

app = FastAPI(title="Sentiment Analyzer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class SentimentRequest(BaseModel):
    text: str

class MultipleReviewsRequest(BaseModel):
    reviews: list

@app.get("/")
def home():
    return {"message": "Sentiment Analyzer API", "status": "running"}

@app.post("/analyze-sentiment")
def analyze(request: SentimentRequest):
    return predict_sentiment(request.text)

@app.post("/analyze-multiple")
def analyze_multiple(request: MultipleReviewsRequest):
    return analyze_multiple_reviews(request.reviews)

# ============================================================
# STEP 6 — TEST (sirf direct run karne pe chalega)
# ============================================================

if __name__ == "__main__":
    print("\n=== Testing Sentiment Analyzer ===\n")

    test_reviews = [
        "This product is amazing! Best purchase ever.",
        "Terrible quality, complete waste of money.",
        "It's okay, nothing special."
    ]

    for review in test_reviews:
        result = predict_sentiment(review)
        print(f"📝 Review: {result['text']}")
        print(f"😊 Sentiment: {result['sentiment']} (Confidence: {result['confidence']})\n")

    print("\n=== Batch Analysis ===\n")
    batch_result = analyze_multiple_reviews(test_reviews)
    print(f"Total Reviews: {batch_result['total']}")
    print(f"Summary: {batch_result['summary']}")
