from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import RedirectResponse

from schemas.request import (
    SignupRequest,
    LoginRequest,
    ResendConfirmationRequest,
    RefreshTokenRequest,
    UpdateProfileRequest
)
from schemas.response import (
    SignupResponse,
    AuthTokenResponse,
    MessageResponse,
    UserMeResponse,
    UpdateProfileResponse
)
from services.auth_service import AuthService


from core.dependencies import get_current_user


router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/signup", response_model=SignupResponse)
async def signup(payload: SignupRequest):
    try:
        response = await AuthService.signup(
            email=payload.email,
            password=payload.password,
            full_name=payload.full_name
        )

        if response.user is None:
            raise HTTPException(status_code=400, detail="Signup failed")

        return {
            "message": "Signup successful. Please check your email.",
            "user_id": response.user.id,
        }

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


from fastapi.responses import JSONResponse

@router.post("/login", response_model=AuthTokenResponse)
async def login(payload: LoginRequest):
    try:
        response = await AuthService.login(payload.email, payload.password)

        if response.session is None:
            raise HTTPException(status_code=401, detail="Invalid credentials")

        return {
            "access_token": response.session.access_token,
            "refresh_token": response.session.refresh_token,
            "expires_in": response.session.expires_in,
            "token_type": "bearer"
        }

    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))

    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))
    

@router.get("/me", response_model=UserMeResponse)
async def get_me(current_user=Depends(get_current_user)):
    try:
        user_data = await AuthService.get_me(current_user.id)

        if not user_data:
            raise HTTPException(status_code=404, detail="User profile not found")

        return user_data

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/resend-confirmation", response_model=MessageResponse)
async def resend_confirmation(payload: ResendConfirmationRequest):
    try:
        await AuthService.resend_confirmation(payload.email)
        return {"message": "Confirmation email resent successfully"}

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/refresh", response_model=AuthTokenResponse)
async def refresh_token(payload: RefreshTokenRequest):
    try:
        response = await AuthService.refresh_session(payload.refresh_token)

        if response.session is None:
            raise HTTPException(status_code=401, detail="Invalid refresh token")

        return {
            "access_token": response.session.access_token,
            "refresh_token": response.session.refresh_token,
            "expires_in": response.session.expires_in,
            "token_type": "bearer"
        }

    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))


@router.get("/google/login")
async def google_login():
    try:
        url = await AuthService.get_google_auth_url()
        return RedirectResponse(url)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/callback")
async def auth_callback(code: str):
    response = await AuthService.handle_callback(code)

    if not response.session:
        raise HTTPException(status_code=400, detail="Authentication failed")

    frontend_url = "http://localhost:3000/"  # or wherever your app should go

    redirect_response = RedirectResponse(url=frontend_url)
    redirect_response.set_cookie(
        key="gs_auth_token",
        value=response.session.access_token,
        max_age=response.session.expires_in,
        httponly=True,
        secure=False,  # True in production
        samesite="lax",
    )
    redirect_response.set_cookie(
        key="gs_refresh_token",
        value=response.session.refresh_token,
        max_age=60 * 60 * 24 * 30,  # 30 days
        httponly=True,
        secure=False,
        samesite="lax",
    )
    return redirect_response


@router.patch("/profile", response_model=UpdateProfileResponse)
async def update_profile(
    payload: UpdateProfileRequest,
    current_user=Depends(get_current_user)
):
    try:
        updated_user = await AuthService.update_profile(
            user_id=current_user.id,
            full_name=payload.full_name,
            email=payload.email
        )

        return {
            "message": "Profile updated successfully",
            "user": updated_user
        }

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))