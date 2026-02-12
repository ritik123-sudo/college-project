import pandas as pd

# Load dataset
df = pd.read_csv("Tweets.csv")

# Show first 5 rows
print(df.head())

# Check columns
print(df.columns)

# Check sentiment count
print(df['airline_sentiment'].value_counts())
import re
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer

# Step 1: Lowercase & remove special characters
def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)  # sirf alphabets and space
    return text

df['clean_text'] = df['text'].apply(clean_text)

# Step 2: Remove stopwords
stop_words = set(stopwords.words('english'))
df['clean_text'] = df['clean_text'].apply(
    lambda x: ' '.join([word for word in word_tokenize(x) if word not in stop_words])
)

# Step 3: Convert text to TF-IDF features
vectorizer = TfidfVectorizer(max_features=5000)
X = vectorizer.fit_transform(df['clean_text'])

# Target variable
y = df['airline_sentiment']

print("Text preprocessing done ✅")
print("Feature matrix shape:", X.shape)
# Step 4: ML Model Training
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, accuracy_score

# 1️⃣ TF-IDF
tfidf = TfidfVectorizer(max_features=5000)
X = tfidf.fit_transform(df['clean_text'])

# 2️⃣ Labels
y = df['airline_sentiment']  # negative, neutral, positive

# 3️⃣ Train/Test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 4️⃣ Model Train
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

# 5️⃣ Predict + Accuracy
y_pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:\n", classification_report(y_test, y_pred))
import pickle

# Save the trained model
with open('sentiment_model.pkl', 'wb') as f:
    pickle.dump(model, f)

# Save the TF-IDF vectorizer
with open('tfidf_vectorizer.pkl', 'wb') as f:
    pickle.dump(tfidf, f)

print("Model and Vectorizer saved ✅")
