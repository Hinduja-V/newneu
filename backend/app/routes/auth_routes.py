from fastapi import APIRouter
from app.database.mongodb import users_collection

router = APIRouter()

@router.post("/google-login")
async def google_login(user: dict):

    existing_user = await users_collection.find_one({
        "email": user["email"]
    })

    if existing_user:
        return {
            "message": "Login successful",
            "user": existing_user
        }

    await users_collection.insert_one(user)

    return {
        "message": "User created",
        "user": user
    }