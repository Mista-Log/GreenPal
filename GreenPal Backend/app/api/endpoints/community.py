from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from typing import List
from schemas.response import CommunityResponse, MessageResponse
from db.supabase import supabase_admin
from db import cloudinary as cloud

router = APIRouter(prefix="/communities", tags=["Communities"])


async def upload_image_to_cloud(file: UploadFile, folder: str = "communities") -> str:
    """
    Uploads a file to Cloudinary and returns the secure URL
    """
    try:
        upload_result = cloud.cloudinary.uploader.upload(file.file, folder=folder)
        return upload_result["secure_url"]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image upload failed: {str(e)}")


@router.post("/", response_model=CommunityResponse)
async def create_community(
    user_id: str = Form(...),
    title: str = Form(...),
    image: UploadFile = File(...)
):
    """
    Create a new community for a user
    """
    try:
        image_url = await upload_image_to_cloud(image)
        payload = {"user_id": user_id, "title": title, "image": image_url}

        response = supabase_admin.table("communities").insert(payload).execute()

        if not response.data:
            raise HTTPException(status_code=400, detail="Failed to create community")

        return response.data[0]

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/", response_model=List[CommunityResponse])
async def get_communities():
    """
    Fetch all communities, newest first
    """
    try:
        response = supabase_admin.table("communities").select("*").order("created_at", desc=True).execute()
        return response.data or []

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/user/{user_id}", response_model=List[CommunityResponse])
async def get_user_communities(user_id: str):
    """
    Fetch all communities belonging to a specific user
    """
    try:
        response = (
            supabase_admin.table("communities")
            .select("*")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
            .execute()
        )
        return response.data or []

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{community_id}", response_model=MessageResponse)
async def delete_community(community_id: str):
    """
    Delete a community by ID
    """
    try:
        response = supabase_admin.table("communities").delete().eq("id", community_id).execute()

        if not response.data:
            raise HTTPException(status_code=404, detail="Community not found")

        return {"message": "Community deleted successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))