import random

def generate_instagram_post(product_name, description, price=None):
    """Instagram post banata hai"""
    
    emojis = ["✨", "🔥", "💯", "⭐", "🎉"]
    
    templates = [
        f"🌟 {product_name}! {random.choice(emojis)}\n\n{description}\n\n{f'Price: ₹{price}' if price else ''}\n\n#shoplocal #trending",
        
        f"✨ Check out {product_name}! {random.choice(emojis)}\n\n{description}\n\nOrder now! 🛒\n\n#sale #shopnow"
    ]
    
    return random.choice(templates)


def generate_whatsapp_message(product_name, description, price=None):
    """WhatsApp message banata hai"""
    
    msg = f"*{product_name}* 🌟\n\n"
    msg += f"{description}\n\n"
    
    if price:
        msg += f"💰 Price: ₹{price}\n\n"
    
    msg += "📞 Reply to order!"
    
    return msg


# Test
if __name__ == "__main__":
    print(generate_instagram_post("Handmade Soap", "100% natural", 299))