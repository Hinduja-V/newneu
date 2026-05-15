from pydantic import BaseModel, validator, Field
from typing import List
from datetime import datetime

class Answer(BaseModel):
    question: str
    answer: str
    score: int

class Assessment(BaseModel):
    user_id: str
    category: str
  
    answers: List[Answer]

    created_at: datetime = Field(default_factory=datetime.utcnow)

    @validator("answers")
    def validate_all_questions(cls, v):
        if len(v) != 21:
            raise ValueError("All 21 questions must be answered")
        return v