from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import auth
from app.routes import chatbot   # 🔥 ADD THIS
from app.routes import assessment 
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ROUTES
app.include_router(auth.router)

# 🔥 ADD CHATBOT ROUTER
app.include_router(chatbot.router)
app.include_router(assessment.router)
@app.get("/")
async def root():
    return {"message": "MindCare AI Backend Running"}