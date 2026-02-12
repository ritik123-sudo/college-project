from fastapi import FastAPI
from pydantic import BaseModel
import sys
sys.path.append('../src')

from sentiment_analyzer import predict_sentiment
from post_generator import generate_instagram_post, generate_whatsapp_message

app = FastAPI(title="BizGenius Marketing Toolkit API")

# Request models
class SentimentRequest(BaseModel):
    text: str

class PostRequest(BaseModel):
    product_name: str
    description: str
    price: int = None
    platform: str = "instagram"


@app.get("/")
def home():
    return {
        "message": "BizGenius Marketing Toolkit API",
        "version": "1.0",
        "endpoints": ["/analyze-sentiment", "/generate-post"]
    }


@app.post("/analyze-sentiment")
def analyze(request: SentimentRequest):
    """Analyzes sentiment of customer reviews and feedback"""
    result = predict_sentiment(request.text)
    return result


@app.post("/generate-post")
def create_post(request: PostRequest):
    """Generates social media posts for marketing"""
    
    if request.platform == "instagram":
        post = generate_instagram_post(
            request.product_name,
            request.description,
            request.price
        )
    else:
        post = generate_whatsapp_message(
            request.product_name,
            request.description,
            request.price
        )
    
    return {"platform": request.platform, "post": post}