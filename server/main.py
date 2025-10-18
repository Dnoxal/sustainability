from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server.routers import activities

app = FastAPI(title="Sustainability Impact Tracker")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(activities.router)

@app.get("/")
def root():
    return {"message": "Sustainability Tracker API running!"}