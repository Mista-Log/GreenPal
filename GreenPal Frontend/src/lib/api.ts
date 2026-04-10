import { CreateGoalPayload, FarmGoal, ApiMessageResponse } from "@/lib/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
}


export async function getMe() {
  const token = localStorage.getItem("access_token");

  const res = await fetch(`${BASE_URL}api/v1/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  
  return res.json();
}

export async function updateProfile(payload: {
  full_name?: string;
  email?: string;
}) {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;

  const res = await fetch(`${BASE_URL}api/v1/auth/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Failed to update profile");
  }

  return data;
}

// libs/api.ts
export type Community = {
  id: string;
  user_id: string;
  title: string;
  image: string | null;
  created_at: string;
};

export const getUserCommunities = async (): Promise<Community[]> => {
  try {
    const res = await fetch(`${BASE_URL}api/v1/communities/`);
    if (!res.ok) {
      const text = await res.text();
      console.error("getUserCommunities failed", res.status, text);
      throw new Error("Failed to fetch communities");
    }
    const data: Community[] = await res.json();
    return data;
  } catch (err: any) {
    console.error("getUserCommunities error:", err);
    throw err;
  }
};





// Generic helper
async function apiRequest<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.detail || data?.message || "Something went wrong");
  }

  return data;
}

// GET all goals for a user
export async function getUserGoals(userId: string): Promise<FarmGoal[]> {
  return apiRequest<FarmGoal[]>(`${BASE_URL}api/v1/goals/user/${userId}`, {
    method: "GET",
  });
}

// CREATE goal
export async function createGoal(payload: CreateGoalPayload): Promise<ApiMessageResponse> {
  return apiRequest<ApiMessageResponse>(`${BASE_URL}api/v1/goals`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// UPDATE goal
export async function updateGoal(
  goalId: string,
  payload: Partial<CreateGoalPayload>
): Promise<ApiMessageResponse> {
  return apiRequest<ApiMessageResponse>(`${BASE_URL}api/v1/goals/${goalId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

// DELETE goal
export async function deleteGoal(goalId: string): Promise<ApiMessageResponse> {
  return apiRequest<ApiMessageResponse>(`${BASE_URL}goals/${goalId}`, {
    method: "DELETE",
  });
}