from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server.routers import activities

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Sustainability Tracker API running!"}

# include routers
app.include_router(activities.router)
