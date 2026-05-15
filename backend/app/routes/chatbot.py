from fastapi import APIRouter
from pydantic import BaseModel
import random

router = APIRouter()

# ================= REQUEST MODEL =================
class ChatRequest(BaseModel):
    message: str

# ================= CHAT MEMORY =================
conversation_memory = []

# ================= EMOTION DETECTION =================
def detect_emotion(text: str):

    text = text.lower()

    sad_words = [
        "sad",
        "depressed",
        "lonely",
        "cry",
        "upset",
        "hurt",
    ]

    anxious_words = [
        "stress",
        "stressed",
        "anxiety",
        "worried",
        "panic",
        "fear",
        "tension",
    ]

    happy_words = [
        "happy",
        "good",
        "great",
        "excited",
        "better",
    ]

    angry_words = [
        "angry",
        "mad",
        "frustrated",
        "fight",
        "argument",
    ]

    if any(word in text for word in sad_words):
        return "sad"

    elif any(word in text for word in anxious_words):
        return "anxious"

    elif any(word in text for word in happy_words):
        return "happy"

    elif any(word in text for word in angry_words):
        return "angry"

    return "neutral"

# ================= CBT RESPONSE =================
def generate_reply(message: str):

    global conversation_memory

    lower_msg = message.lower()

    conversation_memory.append(lower_msg)

    conversation_memory = conversation_memory[-10:]

    emotion = detect_emotion(message)

    if (
        "parent" in lower_msg or
        "mother" in lower_msg or
        "father" in lower_msg or
        "mom" in lower_msg or
        "dad" in lower_msg
    ):

        return {
            "emotion": "sad",
            "reply": (
                "I'm sorry you're going through this 💙 "
                "Being scolded by parents can feel emotionally painful. "
                "What part of the situation hurt you the most?"
            )
        }

    neutral_responses = [
        "Thank you for sharing that with me. Can you tell me more?",
        "I’m listening carefully. How has this affected your emotions?",
        "That sounds important. What has been on your mind the most lately?",
    ]

    return {
        "emotion": emotion,
        "reply": random.choice(neutral_responses)
    }

# ================= CHAT ROUTE =================
@router.post("/api/chat")
async def chat(request: ChatRequest):

    response = generate_reply(request.message)

    return response