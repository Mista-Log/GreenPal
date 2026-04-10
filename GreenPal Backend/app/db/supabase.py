# import os
# from dotenv import load_dotenv
# from supabase import create_client, Client

# load_dotenv()

# SUPABASE_URL = os.getenv("SUPABASE_URL")
# SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# if not SUPABASE_URL:
#     raise ValueError("SUPABASE_URL is missing")

# if not SUPABASE_KEY:
#     raise ValueError("SUPABASE_KEY is missing")

# supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL:
    raise ValueError("SUPABASE_URL is missing")

if not SUPABASE_ANON_KEY:
    raise ValueError("SUPABASE_ANON_KEY is missing")

if not SUPABASE_SERVICE_ROLE_KEY:
    raise ValueError("SUPABASE_SERVICE_ROLE_KEY is missing")

# Use this for auth flows (signup/login)
supabase_auth: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

# Use this for protected backend DB operations
supabase_admin: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)