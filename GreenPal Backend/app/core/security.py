import jwt
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer

security = HTTPBearer()


def verify_token(credentials=Depends(security)):
    token = credentials.credentials

    try:
        payload = jwt.decode(token, options={"verify_signature": False})
        return payload

    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")
