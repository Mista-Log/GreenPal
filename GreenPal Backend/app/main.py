from api.router import api_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.include_router(api_router, prefix="/api/v1")


origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://green-pal-puce.vercel.app/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,             # Allows specific origins
    allow_credentials=True,            # Allows cookies/auth headers
    allow_methods=["*"],               # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],               # Allows all headers
)