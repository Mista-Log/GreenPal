from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from db.supabase import supabase_auth

security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

    if not token:
        raise HTTPException(status_code=401, detail="Authentication token missing")

    try:
        response = supabase_auth.auth.get_user(token)

        if not response.user:
            raise HTTPException(status_code=401, detail="Invalid or expired token")

        return response.user

    except Exception as e:
        print("AUTH ERROR:", str(e))
        raise HTTPException(status_code=401, detail="Invalid or expired token")