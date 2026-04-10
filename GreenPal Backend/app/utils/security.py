from fastapi.middleware.cors import CORSMiddleware
from gunicorn import app

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, put your frontend URL here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)