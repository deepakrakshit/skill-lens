from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


SkillStrength = Literal["Strong", "Moderate", "Weak"]


class CommitInfo(BaseModel):
    """Represents a single commit"""
    model_config = ConfigDict(populate_by_name=True)

    hash: str
    message: str
    author: str
    date: str
    additions: int = 0
    deletions: int = 0


class GitHubRepo(BaseModel):
    """Represents a GitHub repository with commit history"""
    name: str
    html_url: str
    language: str | None
    description: str | None
    stargazers_count: int
    fork: bool
    updated_at: str
    topics: list[str] = Field(default_factory=list)
    commits: list[CommitInfo] = Field(default_factory=list)  # Latest 30 commits


class GitHubUser(BaseModel):
    login: str
    name: str | None
    avatar_url: str
    bio: str | None
    public_repos: int
    followers: int
    html_url: str


class GitHubSkill(BaseModel):
    """Represents a detected skill with evidence"""
    model_config = ConfigDict(populate_by_name=True)

    name: str
    strength: SkillStrength
    repo_count: int = Field(serialization_alias="repoCount")
    confidence: int
    repos: list[dict[str, object]]  # Includes repo data with commits
    percentage: int
    commit_evidence: int = Field(default=0, serialization_alias="commitEvidence")  # Number of commits using this skill


class AnalysisResult(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    user: GitHubUser
    skills: list[GitHubSkill]
    total_repos: int = Field(serialization_alias="totalRepos")
    top_language: str = Field(serialization_alias="topLanguage")
    analysis_metadata: dict[str, object] = Field(
        default_factory=lambda: {
            "commits_analyzed": 0,
            "commit_analysis_used": True,
            "latest_commits_count": 30,
        },
        serialization_alias="analysisMetadata"
    )


class ResumeRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    resume_text: str | None = Field(default=None, alias="resumeText")


class ResumeParseResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    skills: list[str]
    message: str
    raw_text_preview: str = Field(alias="rawTextPreview")
    status: Literal["success", "error", "empty"]


class UploadResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    text: str
    file_name: str | None = Field(alias="fileName")
    error: str | None