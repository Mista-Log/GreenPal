from pydantic import BaseModel, EmailStr
from typing import List, Literal, Optional


class AuthTokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    expires_in: Optional[int] = None
    token_type: str = "bearer"


class SignupResponse(BaseModel):
    message: str
    user_id: str


class MessageResponse(BaseModel):
    message: str

class UserMeResponse(BaseModel):
    id: str
    email: EmailStr
    full_name: Optional[str] = None
    provider: Optional[str] = None
    created_at: Optional[str] = None
    last_signed_in: Optional[str] = None

class UpdateProfileResponse(BaseModel):
    message: str
    user: UserMeResponse

class CommunityResponse(BaseModel):
    id: str
    title: str
    image: str


class GoalMilestoneResponse(BaseModel):
    id: str
    title: str
    isCompleted: bool
    reasoning: Optional[str] = None


class GoalResponse(BaseModel):
    id: str
    title: str
    category: Literal["Crops", "Livestock", "Soil Health", "Business"]
    currentValue: float
    targetValue: float
    unit: str
    icon: Optional[str] = None
    imageUrl: Optional[str] = None
    status: Literal["active", "completed"]
    milestones: List[GoalMilestoneResponse] = []


class MessageResponse(BaseModel):
    message: str