from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
import bcrypt

from app.database.connection import db
from app.utils.jwt_handler import create_access_token

router = APIRouter()

# ---------------- SIGNUP MODEL ----------------
class UserSignup(BaseModel):
    name: str
    email: EmailStr
    password: str
    age: int
    gender: str
    occupation: str


# ---------------- LOGIN MODEL ----------------
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# ---------------- SIGNUP ROUTE ----------------
@router.post("/signup")
async def signup(user: UserSignup):

    # Check existing user
    existing_user = await db.users.find_one({
        "email": user.email.lower()
    })

    if existing_user:
        raise HTTPException(
            status_code=409,
            detail="Email already registered"
        )

    # Hash password
    hashed_password = bcrypt.hashpw(
        user.password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    # User data
    new_user = {
        "name": user.name,
        "email": user.email.lower(),
        "password": hashed_password,
        "age": user.age,
        "gender": user.gender,
        "occupation": user.occupation
    }

    # Insert user
    result = await db.users.insert_one(new_user)

    return {
        "message": "User created successfully",
        "user": {
            "id": str(result.inserted_id),
            "name": new_user["name"],
            "email": new_user["email"]
        }
    }


# ---------------- LOGIN ROUTE ----------------
@router.post("/login")
async def login(user: UserLogin):

    # Find user
    db_user = await db.users.find_one({
        "email": user.email.lower()
    })

    if not db_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # Verify password
    if not bcrypt.checkpw(
        user.password.encode("utf-8"),
        db_user["password"].encode("utf-8")
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    # Create JWT token
    token = create_access_token({
        "user_id": str(db_user["_id"]),
        "email": db_user["email"]
    })

    return {
        "message": "Login successful",
        "token": token,
        "user": {
            "id": str(db_user["_id"]),
            "name": db_user["name"],
            "email": db_user["email"]
        }
    }