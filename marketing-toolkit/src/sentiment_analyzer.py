import pickle
import re
import os
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

# Get the project root directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Load trained model and vectorizer
MODEL_PATH = os.path.join(BASE_DIR, 'models', 'sentiment_model.pkl')
VECTORIZER_PATH = os.path.join(BASE_DIR, 'models', 'tfidf_vectorizer.pkl')

with open(MODEL_PATH, 'rb') as f:
    model = pickle.load(f)

with open(VECTORIZER_PATH, 'rb') as f:
    vectorizer = pickle.load(f)

print("✅ Model and vectorizer loaded successfully!")


def clean_text(text):
    """Remove special characters and convert to lowercase"""
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    return text


def remove_stopwords(text):
    """Remove common English stopwords"""
    stop_words = set(stopwords.words('english'))
    tokens = word_tokenize(text)
    filtered = ' '.join([word for word in tokens if word not in stop_words])
    return filtered


def predict_sentiment(text):
    """
    Predict sentiment of a single text
    
    Args:
        text (str): Review or comment text
    
    Returns:
        dict: Contains sentiment prediction and confidence
    """
    # Clean the text
    cleaned = clean_text(text)
    cleaned = remove_stopwords(cleaned)
    
    # Transform using TF-IDF
    features = vectorizer.transform([cleaned])
    
    # Predict
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
    Analyze sentiment of multiple reviews
    
    Args:
        reviews_list (list): List of review texts
    
    Returns:
        list: List of prediction results
    """
    results = []
    
    for review in reviews_list:
        result = predict_sentiment(review)
        results.append(result)
    
    # Summary statistics
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


# Test the functions
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