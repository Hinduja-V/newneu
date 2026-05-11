from fastapi import APIRouter
from app.database.connection import db

router = APIRouter()

@router.post("/signup")
async def signup(user: dict):

    result = await db.users.insert_one(user)

    return {
        "message": "User created successfully",
        "id": str(result.inserted_id)
    }