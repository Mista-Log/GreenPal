from pydantic import BaseModel, EmailStr, Field
from typing import List, Literal, Optional


class SignupRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class ResendConfirmationRequest(BaseModel):
    email: EmailStr

class CreateCommunityRequest(BaseModel):
    title: str



class RefreshTokenRequest(BaseModel):
    refresh_token: str


class UpdateProfileRequest(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None


class GoalMilestoneCreateRequest(BaseModel):
    title: str
    isCompleted: bool = False
    reasoning: Optional[str] = None


class CreateGoalRequest(BaseModel):
    user_id: str
    title: str
    category: Literal["Crops", "Livestock", "Soil Health", "Business"]
    currentValue: float = 0
    targetValue: float
    unit: str
    icon: Optional[str] = None
    imageUrl: Optional[str] = None
    status: Literal["active", "completed"] = "active"
    milestones: List[GoalMilestoneCreateRequest] = []


class UpdateGoalRequest(BaseModel):
    title: Optional[str] = None
    category: Optional[Literal["Crops", "Livestock", "Soil Health", "Business"]] = None
    currentValue: Optional[float] = None
    targetValue: Optional[float] = None
    unit: Optional[str] = None
    icon: Optional[str] = None
    imageUrl: Optional[str] = None
    status: Optional[Literal["active", "completed"]] = None
    milestones: Optional[List[GoalMilestoneCreateRequest]] = None