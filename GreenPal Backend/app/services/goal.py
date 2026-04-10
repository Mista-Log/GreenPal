from fastapi import HTTPException
from db.supabase import supabase_auth, supabase_admin
from schemas.request import CreateGoalRequest, UpdateGoalRequest


def create_goal_service(payload: CreateGoalRequest):
    try:
        # Insert goal and return inserted row
        goal_data = {
            "user_id": payload.user_id,
            "title": payload.title,
            "category": payload.category,
            "current_value": payload.currentValue,
            "target_value": payload.targetValue,
            "unit": payload.unit,
            "icon": payload.icon,
            "image_url": payload.imageUrl,
            "status": payload.status,
        }

        goal_res = supabase_admin.table("goals").insert(goal_data).execute()

        if not goal_res.data:
            raise HTTPException(status_code=400, detail="Failed to create goal")

        created_goal = goal_res.data[0]
        goal_id = created_goal["id"]

        # Insert milestones if any
        if payload.milestones:
            milestones_data = [
                {
                    "goal_id": goal_id,
                    "title": milestone.title,
                    "is_completed": milestone.isCompleted,
                    "reasoning": milestone.reasoning,
                }
                for milestone in payload.milestones
            ]

            milestone_res = supabase_admin.table("goal_milestones").insert(milestones_data).execute()

            if hasattr(milestone_res, "error") and milestone_res.error:
                raise HTTPException(status_code=400, detail=str(milestone_res.error))

        return {
            "message": "Goal created successfully",
        }

    except Exception as e:
        print("CREATE GOAL ERROR:", str(e))
        raise HTTPException(status_code=500, detail=f"Error creating goal: {str(e)}")


def get_all_goals_service():
    goals_res = supabase_admin.table("goals").select("*").execute()
    goals = goals_res.data or []

    milestones_res = supabase_admin.table("goal_milestones").select("*").execute()
    milestones = milestones_res.data or []

    milestone_map = {}
    for milestone in milestones:
        goal_id = milestone["goal_id"]
        milestone_map.setdefault(goal_id, []).append({
            "id": milestone["id"],
            "title": milestone["title"],
            "isCompleted": milestone["is_completed"],
            "reasoning": milestone["reasoning"],
        })

    formatted_goals = []
    for goal in goals:
        formatted_goals.append({
            "id": goal["id"],
            "title": goal["title"],
            "category": goal["category"],
            "currentValue": float(goal["current_value"]),
            "targetValue": float(goal["target_value"]),
            "unit": goal["unit"],
            "icon": goal["icon"],
            "imageUrl": goal["image_url"],
            "status": goal["status"],
            "milestones": milestone_map.get(goal["id"], []),
        })

    return formatted_goals


def get_goal_by_id_service(goal_id: str):
    goal_res = supabase_admin.table("goals").select("*").eq("id", goal_id).single().execute()

    if not goal_res.data:
        raise HTTPException(status_code=404, detail="Goal not found")

    goal = goal_res.data

    milestones_res = supabase_admin.table("goal_milestones").select("*").eq("goal_id", goal_id).execute()
    milestones = milestones_res.data or []

    return {
        "id": goal["id"],
        "title": goal["title"],
        "category": goal["category"],
        "currentValue": float(goal["current_value"]),
        "targetValue": float(goal["target_value"]),
        "unit": goal["unit"],
        "icon": goal["icon"],
        "imageUrl": goal["image_url"],
        "status": goal["status"],
        "milestones": [
            {
                "id": milestone["id"],
                "title": milestone["title"],
                "isCompleted": milestone["is_completed"],
                "reasoning": milestone["reasoning"],
            }
            for milestone in milestones
        ]
    }


def update_goal_service(goal_id: str, payload: UpdateGoalRequest):
    existing = supabase_admin.table("goals").select("*").eq("id", goal_id).execute()

    if not existing.data:
        raise HTTPException(status_code=404, detail="Goal not found")

    update_data = {}

    if payload.title is not None:
        update_data["title"] = payload.title
    if payload.category is not None:
        update_data["category"] = payload.category
    if payload.currentValue is not None:
        update_data["current_value"] = payload.currentValue
    if payload.targetValue is not None:
        update_data["target_value"] = payload.targetValue
    if payload.unit is not None:
        update_data["unit"] = payload.unit
    if payload.icon is not None:
        update_data["icon"] = payload.icon
    if payload.imageUrl is not None:
        update_data["image_url"] = payload.imageUrl
    if payload.status is not None:
        update_data["status"] = payload.status

    if update_data:
        supabase_admin.table("goals").update(update_data).eq("id", goal_id).execute()

    # If milestones are sent, replace them all
    if payload.milestones is not None:
        supabase_admin.table("goal_milestones").delete().eq("goal_id", goal_id).execute()

        if payload.milestones:
            milestones_data = [
                {
                    "id": milestone.id,
                    "goal_id": goal_id,
                    "title": milestone.title,
                    "is_completed": milestone.isCompleted,
                    "reasoning": milestone.reasoning,
                }
                for milestone in payload.milestones
            ]
            supabase_admin.table("goal_milestones").insert(milestones_data).execute()

    return {"message": "Goal updated successfully"}


def delete_goal_service(goal_id: str):
    existing = supabase_admin.table("goals").select("*").eq("id", goal_id).execute()

    if not existing.data:
        raise HTTPException(status_code=404, detail="Goal not found")

    supabase_admin.table("goals").delete().eq("id", goal_id).execute()

    return {"message": "Goal deleted successfully"}

def get_goals_by_user_service(user_id: str):
    goals_res = supabase_admin.table("goals").select("*").eq("user_id", user_id).execute()
    goals = goals_res.data or []

    milestones_res = supabase_admin.table("goal_milestones").select("*").execute()
    milestones = milestones_res.data or []

    milestone_map = {}
    for milestone in milestones:
        goal_id = milestone["goal_id"]
        milestone_map.setdefault(goal_id, []).append({
            "id": str(milestone["id"]),
            "title": milestone["title"],
            "isCompleted": milestone["is_completed"],
            "reasoning": milestone["reasoning"],
        })

    formatted_goals = []
    for goal in goals:
        formatted_goals.append({
            "id": str(goal["id"]),
            "title": goal["title"],
            "category": goal["category"],
            "currentValue": float(goal["current_value"]),
            "targetValue": float(goal["target_value"]),
            "unit": goal["unit"],
            "icon": goal["icon"],
            "imageUrl": goal["image_url"],
            "status": goal["status"],
            "milestones": milestone_map.get(goal["id"], []),
        })

    return formatted_goals