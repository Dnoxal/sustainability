from pydantic import BaseModel, Field
from datetime import datetime

class Activity(BaseModel):
    user_id: str
    category: str  # "transport", "food", "energy"
    action: str    # e.g. "bike", "vegetarian_meal", "solar_power"
    quantity: float = Field(..., gt=0)
    date: datetime = datetime.utcnow()