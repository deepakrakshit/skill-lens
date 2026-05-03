from __future__ import annotations

from dataclasses import dataclass
from functools import lru_cache
import os


def _csv_env(name: str, default: str) -> tuple[str, ...]:
    raw_value = os.getenv(name, default)
    values = [item.strip() for item in raw_value.split(",") if item.strip()]
    return tuple(values)


@dataclass(frozen=True)
class Settings:
    app_name: str = os.getenv("APP_NAME", "SkillLens Backend")
    api_prefix: str = os.getenv("API_PREFIX", "/api")
    github_user_agent: str = os.getenv("GITHUB_USER_AGENT", "SkillLens-Backend")
    github_token: str | None = os.getenv("GITHUB_TOKEN") or None
    groq_api_key: str | None = os.getenv("GROQ_API_KEY") or None
    groq_model: str = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")
    frontend_origins: tuple[str, ...] = _csv_env(
        "FRONTEND_ORIGINS", "http://localhost:3000"
    )


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()