from fastapi import APIRouter, HTTPException, Query
from datetime import datetime
from server.models import Activity
from server.database import activities
from server.calculators import calculate_impact

router = APIRouter(prefix="/api/activities", tags=["activities"])

# --- 1️⃣ POST: log new activity ---
@router.post("/")
def log_activity(activity: Activity):
    impact = calculate_impact(activity.action, activity.quantity)
    doc = activity.dict()
    doc["impact_kg"] = impact
    doc["timestamp"] = datetime.utcnow()
    activities.insert_one(doc)
    return {"message": "Activity logged", "impact_kg": impact}

# --- 2️⃣ GET: leaderboard (must come BEFORE /{user_id}) ---
@router.get("/leaderboard")
def leaderboard(limit: int = Query(10, ge=1, le=100)):
    pipeline = [
        {"$group": {"_id": "$user_id", "total": {"$sum": "$impact_kg"}}},
        {"$sort": {"total": 1}},
        {"$limit": limit},
    ]
    leaders = list(activities.aggregate(pipeline))
    for l in leaders:
        l["user_id"] = l.pop("_id")
        l["total"] = round(l["total"], 2)
    return {"leaderboard": leaders}

# --- 3️⃣ GET: user summary ---
@router.get("/{user_id}/summary")
def get_summary(user_id: str):
    data = list(activities.find({"user_id": user_id}, {"_id": 0}))
    if not data:
        raise HTTPException(status_code=404, detail="No activities found")

    category_totals = {}
    for d in data:
        cat = d["category"]
        category_totals[cat] = category_totals.get(cat, 0) + d["impact_kg"]

    total = sum(category_totals.values())
    return {
        "user_id": user_id,
        "total_impact": round(total, 2),
        "by_category": {k: round(v, 2) for k, v in category_totals.items()},
    }

# --- 4️⃣ GET: all activities for user ---
@router.get("/{user_id}")
def get_user_activities(user_id: str):
    data = list(activities.find({"user_id": user_id}, {"_id": 0}))
    if not data:
        raise HTTPException(status_code=404, detail="No activities found")

    total_impact = round(sum(d["impact_kg"] for d in data), 3)
    return {
        "user_id": user_id,
        "total_impact_kg": total_impact,
        "activities": data,
    }
