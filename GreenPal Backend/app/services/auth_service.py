import re
from datetime import datetime
from db.supabase import supabase_auth, supabase_admin
# from db.supabase import supabase
from supabase_auth.errors import AuthApiError


class AuthService:

    @staticmethod
    async def signup(email: str, password: str, full_name: str):
        try:
            # Use AUTH client for signup
            response = supabase_auth.auth.sign_up({
                "email": email,
                "password": password,
                "options": {
                    "data": {
                        "full_name": full_name
                    }
                }
            })

            print("SIGNUP RESPONSE USER:", response.user)

            if response.user:
                user_payload = {
                    "id": response.user.id,
                    "email": email,
                    "full_name": full_name,
                    "provider": "email",
                    "created_at": datetime.utcnow().isoformat(),
                }

                print("INSERTING USER:", user_payload)

                # Use ADMIN client for DB insert
                user_insert = supabase_admin.table("users").upsert(user_payload).execute()
                print("USER INSERT RESPONSE:", user_insert.data)

                default_communities = [
                    {
                        "user_id": response.user.id,
                        "title": "Knowledge Sharing",
                        "image": "/figma/you-community-1.png"
                    },
                    {
                        "user_id": response.user.id,
                        "title": "Farmer Collaboration",
                        "image": "/figma/you-community-2.png"
                    },
                    {
                        "user_id": response.user.id,
                        "title": "Local Market Updates",
                        "image": "/figma/you-community-3.png"
                    },
                    {
                        "user_id": response.user.id,
                        "title": "Community Support",
                        "image": "/figma/you-community-4.png"
                    },
                    {
                        "user_id": response.user.id,
                        "title": "Farm Discussions",
                        "image": "/figma/you-community-5.png"
                    },
                ]

                print("INSERTING COMMUNITIES:", default_communities)

                # Use ADMIN client for communities insert
                community_insert = supabase_admin.table("communities").insert(default_communities).execute()
                print("COMMUNITY INSERT RESPONSE:", community_insert.data)

            return response

        except AuthApiError as e:
            raise ValueError(str(e))
        except Exception as e:
            print("SIGNUP ERROR:", str(e))
            raise ValueError(str(e))

    @staticmethod
    async def login(email: str, password: str):
        try:
            response = supabase_auth.auth.sign_in_with_password(
                {"email": email, "password": password}
            )

            if response.user:
                supabase_admin.table("users").update(
                    {"last_signed_in": datetime.utcnow().isoformat()}
                ).eq("id", response.user.id).execute()

            return response

        except AuthApiError as e:
            raise ValueError(str(e))

    @staticmethod
    async def resend_confirmation(email: str):
        email = email.strip()

        if not re.match(r"^[^@]+@[^@]+\.[^@]+$", email):
            raise ValueError("Invalid email format")

        try:
            response = supabase_auth.auth.resend({
                "type": "signup",
                "email": email
            })
            return response

        except AuthApiError as e:
            raise ValueError(str(e))

    @staticmethod
    async def refresh_session(refresh_token: str):
        try:
            response = supabase_auth.auth.refresh_session(refresh_token)
            return response
        except AuthApiError as e:
            raise ValueError(str(e))

    @staticmethod
    async def get_google_auth_url():
        data = supabase_auth.auth.sign_in_with_oauth({
            "provider": "google",
            "options": {
                "redirect_to": "http://localhost:8000/api/v1/auth/callback"
            }
        })
        return data.url
    

    @staticmethod
    async def handle_callback(code: str):
        try:
            response = supabase_auth.auth.exchange_code_for_session({"auth_code": code})

            if response.user:
                supabase_auth.table("users").upsert({
                    "id": response.user.id,
                    "email": response.user.email,
                    "full_name": response.user.user_metadata.get("full_name")
                        or response.user.user_metadata.get("name")
                        or "",
                    "provider": "google",
                    "created_at": datetime.utcnow().isoformat(),
                    "last_signed_in": datetime.utcnow().isoformat(),
                }).execute()

                default_communities = [
                    {
                        "user_id": response.user.id,
                        "title": "Knowledge Sharing",
                        "image": "/figma/you-community-1.png"
                    },
                    {
                        "user_id": response.user.id,
                        "title": "Farmer Collaboration",
                        "image": "/figma/you-community-2.png"
                    },
                    {
                        "user_id": response.user.id,
                        "title": "Local Market Updates",
                        "image": "/figma/you-community-3.png"
                    },
                    {
                        "user_id": response.user.id,
                        "title": "Community Support",
                        "image": "/figma/you-community-4.png"
                    },
                    {
                        "user_id": response.user.id,
                        "title": "Farm Discussions",
                        "image": "/figma/you-community-5.png"
                    },
                ]

                supabase_auth.table("communities").insert(default_communities).execute()

            return response

        except AuthApiError as e:
            raise ValueError(str(e))
        
    @staticmethod
    async def get_me(user_id: str):
        response = supabase_auth.table("users").select(
            "id, email, full_name, provider, created_at, last_signed_in"
        ).eq("id", user_id).single().execute()

        return response.data

    @staticmethod
    async def update_profile(user_id: str, full_name: str = None, email: str = None):
        update_data = {}

        if full_name is not None:
            update_data["full_name"] = full_name.strip()

        if email is not None:
            update_data["email"] = email.strip().lower()

        if not update_data:
            raise ValueError("No profile fields provided for update")

        try:
            # Update in your public users table
            response = supabase_auth.table("users").update(update_data).eq("id", user_id).execute()

            # OPTIONAL: update email in Supabase Auth too
            # Only do this if email is being changed
            # NOTE: this may require admin privileges depending on your setup
            # If you're using anon client on backend, this may fail
            # So keep it wrapped safely
            if email is not None:
                try:
                    supabase_auth.auth.admin.update_user_by_id(
                        user_id,
                        {"email": email.strip().lower()}
                    )
                except Exception:
                    # Ignore auth email update if not permitted
                    pass

            updated_user = supabase_auth.table("users").select(
                "id, email, full_name, provider, created_at, last_signed_in"
            ).eq("id", user_id).single().execute()

            return updated_user.data

        except Exception as e:
            raise ValueError(str(e))