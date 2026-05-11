from jose import jwt
from datetime import datetime, timedelta

SECRET_KEY = "mindcare_secret_key"
ALGORITHM = "HS256"


def create_access_token(data: dict, expires_minutes: int = 60):
    payload = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=expires_minutes)
    payload.update({"exp": expire})

    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

    return token