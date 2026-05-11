from pydantic import BaseModel
from typing import Optional

class UserModel(BaseModel):
    name: str
    email: str
    googleId: Optional[str] = None
    profilePicture: Optional[str] = None

    age: Optional[int] = None
    gender: Optional[str] = None
    occupation: Optional[str] = None
    sleepHours: Optional[str] = None
    stressSource: Optional[str] = None
    wellnessGoal: Optional[str] = None