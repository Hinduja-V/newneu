from fastapi import APIRouter
from app.models.assessment_model import Assessment
from app.database.connection import db
from datetime import datetime

router = APIRouter()


# ==============================
# SAVE ASSESSMENT
# ==============================
@router.post("/save-assessment")
async def save_assessment(data: Assessment):
    assessment = data.dict()

    # ✅ Store datetime object (BEST PRACTICE)
    assessment["created_at"] = datetime.utcnow()

    # ==============================
    # SCORE CALCULATION
    # ==============================
    total_score = sum(a["score"] for a in assessment["answers"])
    max_score = len(assessment["answers"]) * 3

    percentage = round((total_score / max_score) * 100) if max_score > 0 else 0

    # ==============================
    # STRESS LEVEL LOGIC
    # ==============================
    if percentage <= 33:
        stress_level = "LOW"
    elif percentage <= 66:
        stress_level = "MEDIUM"
    else:
        stress_level = "HIGH"

    assessment["percentage_score"] = percentage
    assessment["stress_level"] = stress_level

    result = await db.assessments.insert_one(assessment)

    return {
        "message": "Assessment saved",
        "score": percentage,
        "stress_level": stress_level,
        "id": str(result.inserted_id)
    }


# ==============================
# GET USER ASSESSMENTS
# ==============================
@router.get("/user-assessments/{user_id}")
async def get_user_assessments(user_id: str):
    data = await db.assessments.find(
        {"user_id": user.id}
    ).sort("created_at", 1).to_list(100)

    for d in data:
        d["_id"] = str(d["_id"])
        d["created_at"] = d["created_at"].strftime("%Y-%m-%d %H:%M:%S")

    return data


# ==============================
# DAILY GRAPH DATA (CLEAN FIXED)
# ==============================
@router.get("/graph/daily/{user_id}")
async def get_daily_graph(user_id: str):
    data = await db.assessments.find(
        {"user_id": user_id}
    ).sort("created_at", 1).to_list(100)

    result = []

    for d in data:
        created_at = d.get("created_at")

        if not created_at:
            continue

        result.append({
            "date": created_at.strftime("%Y-%m-%d"),
            "score": d.get("percentage_score", 0)
        })

    return result


# ==============================
# WEEKLY GRAPH DATA (FIXED)
# ==============================
@router.get("/graph/weekly/{user_id}")
async def get_weekly_graph(user_id: str):
    data = await db.assessments.find(
        {"user_id": user_id}
    ).to_list(100)

    weekly = {}

    for d in data:
        created_at = d.get("created_at")

        if not created_at:
            continue

        week_key = created_at.strftime("%Y-W%U")  # WEEK FORMAT

        if week_key not in weekly:
            weekly[week_key] = []

        weekly[week_key].append(d.get("percentage_score", 0))

    result = []

    for week, scores in weekly.items():
        avg = sum(scores) / len(scores)

        result.append({
            "week": week,
            "average_score": round(avg, 2)
        })

    return result