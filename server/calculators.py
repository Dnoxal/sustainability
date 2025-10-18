# simplified CO₂ estimates (kg CO₂e per unit)
CO2_FACTORS = {
    "car": 0.271,          # kg CO₂ per km
    "bus": 0.105,
    "bike": 0.0,
    "train": 0.041,
    "beef_meal": 5.0,
    "vegetarian_meal": 2.0,
    "vegan_meal": 1.5,
    "plastic_bottle": 0.08,
    "solar_power": -0.5,   # saving
    "grid_power": 0.45
}

def calculate_impact(action: str, quantity: float) -> float:
    """Return estimated CO₂ emissions (kg). Negative = saving."""
    factor = CO2_FACTORS.get(action, 0)
    return round(factor * quantity, 3)