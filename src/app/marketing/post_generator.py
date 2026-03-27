# ============================================================
# POST GENERATOR — Generate + FastAPI
# ============================================================

import random
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ============================================================
# STEP 1 — GENERATE FUNCTIONS
# ============================================================

def generate_instagram_post(product_name, description, price=None):
    """Instagram ke liye marketing post banao"""
    opening = random.choice([
        f"🚀 Introducing {product_name}!",
        f"✨ Meet your new favorite — {product_name}!",
        f"🔥 {product_name} is here and it's amazing!"
    ])

    body = f"💡 {description}"

    price_line = (
        f"💰 Special Price: ₹{price}\n🛒 Order now before stock runs out!"
        if price else
        "🛒 Limited stock available — grab yours now!"
    )

    tags = f"#{product_name.replace(' ', '')} #shopnow #trending #sale #deals"

    return f"{opening}\n\n{body}\n\n{price_line}\n\n{tags}"


def generate_whatsapp_message(product_name, description, price=None):
    """WhatsApp ke liye marketing message banao"""
    msg = f"*🌟 {product_name}*\n\n"
    msg += f"_{description}_\n\n"
    if price:
        msg += f"💰 *Price: ₹{price}*\n\n"
    msg += "📦 Limited stock!\n📞 Reply *YES* to order now!"
    return msg

# ============================================================
# STEP 2 — FASTAPI
# ============================================================

app = FastAPI(title="Post Generator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class PostRequest(BaseModel):
    product_name: str
    description: str
    price: int = None
    platform: str = "instagram"

@app.get("/")
def home():
    return {"message": "Post Generator API", "status": "running"}

@app.post("/generate-post")
def create_post(request: PostRequest):
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
