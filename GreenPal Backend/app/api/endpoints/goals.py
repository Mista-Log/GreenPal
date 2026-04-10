from fastapi import APIRouter
from schemas.request import CreateGoalRequest, UpdateGoalRequest
from schemas.response import GoalResponse, MessageResponse
from services.goal import (
    create_goal_service,
    get_all_goals_service,
    get_goal_by_id_service,
    update_goal_service,
    delete_goal_service,
    get_goals_by_user_service,
)

router = APIRouter(prefix="/goals", tags=["Goals"])


@router.post("/", response_model=MessageResponse)
async def create_goal(payload: CreateGoalRequest):
    return create_goal_service(payload)


@router.get("/", response_model=list[GoalResponse])
async def get_all_goals():
    return get_all_goals_service()


@router.get("/{goal_id}", response_model=GoalResponse)
async def get_goal_by_id(goal_id: str):
    return get_goal_by_id_service(goal_id)


@router.put("/{goal_id}", response_model=MessageResponse)
async def update_goal(goal_id: str, payload: UpdateGoalRequest):
    return update_goal_service(goal_id, payload)


@router.delete("/{goal_id}", response_model=MessageResponse)
async def delete_goal(goal_id: str):
    return delete_goal_service(goal_id)


@router.get("/user/{user_id}", response_model=list[GoalResponse])
async def get_goals_by_user(user_id: str):
    return get_goals_by_user_service(user_id)