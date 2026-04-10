from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    SUPABASE_URL: str
    SUPABASE_ANON_KEY: str
    SUPABASE_SERVICE_ROLE_KEY: str

    CLIENT_ID: str
    CLIENT_SECRET: str

    model_config = SettingsConfigDict(env_file="../.env")


settings = Settings()
