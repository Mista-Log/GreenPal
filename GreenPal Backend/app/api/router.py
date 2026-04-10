from api.endpoints import auth, community, goals
from fastapi import APIRouter

api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(community.router)
api_router.include_router(goals.router)