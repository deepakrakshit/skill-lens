from __future__ import annotations

import asyncio

import httpx

from app.core.config import Settings
from app.core.constants import FRAMEWORK_KEYWORDS, LANGUAGE_SKILL_MAP
from app.models import AnalysisResult, CommitInfo, GitHubRepo, GitHubSkill, GitHubUser


def detect_frameworks(repo: GitHubRepo) -> list[str]:
    detected: list[str] = []
    search_text = " ".join(
        [repo.name, repo.description or "", *repo.topics]
    ).lower()

    for framework, keywords in FRAMEWORK_KEYWORDS.items():
        if any(keyword in search_text for keyword in keywords):
            detected.append(framework)

    return detected


def analyze_commit_messages(commits: list[CommitInfo]) -> dict[str, int]:
    """Analyze commit messages to detect technologies used"""
    detected: dict[str, int] = {}
    for commit in commits:
        message = (commit.message or "").lower()
        for tech, keywords in FRAMEWORK_KEYWORDS.items():
            for keyword in keywords:
                if keyword in message:
                    detected[tech] = detected.get(tech, 0) + 1
    return detected


def get_strength(count: int) -> str:
    if count >= 4:
        return "Strong"
    if count >= 2:
        return "Moderate"
    return "Weak"


def get_confidence(repo_count: int, total_repos: int, commit_count: int = 0) -> int:
    count_score = min(repo_count / max(total_repos * 0.3, 1), 1)
    strength_bonus = 0.2 if repo_count >= 4 else 0.1 if repo_count >= 2 else 0
    commit_bonus = min(commit_count / 300, 0.15)  # Max 15% bonus from commits
    return min(100, round((count_score + strength_bonus + commit_bonus) * 80 + 20))


def get_percentage(count: int, max_count: int) -> int:
    return min(100, round((count / max(max_count, 1)) * 100))


def _github_headers(settings: Settings) -> dict[str, str]:
    headers = {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": settings.github_user_agent,
    }
    if settings.github_token:
        headers["Authorization"] = f"Bearer {settings.github_token}"
    return headers


async def fetch_user(username: str, settings: Settings) -> GitHubUser:
    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.get(
            f"https://api.github.com/users/{username}",
            headers=_github_headers(settings),
        )

    if response.status_code == 404:
        raise ValueError("User not found")
    if not response.is_success:
        raise RuntimeError(f"GitHub API error: {response.status_code}")

    return GitHubUser.model_validate(response.json())


async def fetch_commits(
    username: str, repo_name: str, settings: Settings
) -> list[CommitInfo]:
    """Fetch latest 30 commits from a repository"""
    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.get(
            f"https://api.github.com/repos/{username}/{repo_name}/commits",
            params={"per_page": 30},
            headers=_github_headers(settings),
        )

    if not response.is_success:
        return []

    commits_data = response.json()
    if not isinstance(commits_data, list):
        return []

    commits = []
    for commit_data in commits_data[:30]:  # Ensure max 30
        try:
            commit = CommitInfo(
                hash=commit_data.get("sha", "")[:7],
                message=commit_data.get("commit", {}).get("message", "").split("\n")[0],
                author=commit_data.get("commit", {}).get("author", {}).get("name", "Unknown"),
                date=commit_data.get("commit", {}).get("author", {}).get("date", ""),
                additions=0,
                deletions=0,
            )
            commits.append(commit)
        except Exception:
            continue

    return commits


async def fetch_all_repos(username: str, settings: Settings) -> list[GitHubRepo]:
    repos: list[GitHubRepo] = []
    page = 1
    per_page = 100

    async with httpx.AsyncClient(timeout=30.0) as client:
        while True:
            response = await client.get(
                f"https://api.github.com/users/{username}/repos",
                params={"per_page": per_page, "page": page, "sort": "updated"},
                headers=_github_headers(settings),
            )

            if response.status_code == 404:
                raise ValueError("User not found")
            if response.status_code == 403:
                raise RuntimeError(
                    "GitHub API rate limit exceeded. Try again in a few minutes."
                )
            if not response.is_success:
                raise RuntimeError(f"GitHub API error: {response.status_code}")

            batch = [GitHubRepo.model_validate(repo) for repo in response.json()]
            if not batch:
                break

            repos.extend(batch)
            if len(batch) < per_page:
                break
            page += 1

    return repos


async def enrich_repos_with_commits(
    username: str, repos: list[GitHubRepo], settings: Settings
) -> list[GitHubRepo]:
    """Fetch commit history for all repositories"""
    tasks = [
        fetch_commits(username, repo.name, settings)
        for repo in repos
    ]
    commits_batches = await asyncio.gather(*tasks)

    for repo, commits in zip(repos, commits_batches):
        repo.commits = commits

    return repos


async def analyze_github_profile(username: str, settings: Settings) -> AnalysisResult:
    user, repos = await asyncio.gather(
        fetch_user(username, settings),
        fetch_all_repos(username, settings),
    )

    # Fetch commits for all repos
    repos = await enrich_repos_with_commits(username, repos, settings)

    own_repos = [repo for repo in repos if not repo.fork]
    skill_map: dict[str, dict[str, object]] = {}
    total_commits_analyzed = 0

    for repo in own_repos:
        skills: set[str] = set()

        if repo.language and repo.language in LANGUAGE_SKILL_MAP:
            skills.add(LANGUAGE_SKILL_MAP[repo.language])

        for framework in detect_frameworks(repo):
            skills.add(framework)

        # Analyze commits for additional skills
        commit_skills = analyze_commit_messages(repo.commits)
        skills.update(commit_skills.keys())

        total_commits_analyzed += len(repo.commits)

        for skill in skills:
            existing = skill_map.get(skill)
            if existing is None:
                existing = {"count": 0, "repos": [], "commit_count": 0}

            existing["count"] = int(existing["count"]) + 1
            existing["commit_count"] = int(existing["commit_count"]) + len(repo.commits)

            repo_entries = existing["repos"]
            if isinstance(repo_entries, list):
                repo_entries.append({
                    "name": repo.name,
                    "url": repo.html_url,
                    "commits": len(repo.commits),
                    "language": repo.language,
                })
            skill_map[skill] = existing

    max_count = max((int(value["count"]) for value in skill_map.values()), default=1)

    skills = [
        GitHubSkill(
            name=name,
            strength=get_strength(int(data["count"])),
            repo_count=int(data["count"]),
            confidence=get_confidence(
                int(data["count"]),
                len(own_repos),
                int(data.get("commit_count", 0))
            ),
            repos=(data["repos"][:5] if isinstance(data["repos"], list) else []),
            percentage=get_percentage(int(data["count"]), max_count),
            commit_evidence=int(data.get("commit_count", 0)),
        )
        for name, data in sorted(
            skill_map.items(), key=lambda item: int(item[1]["count"]), reverse=True
        )
    ]

    top_language = skills[0].name if skills else "N/A"

    return AnalysisResult(
        user=user,
        skills=skills,
        total_repos=len(own_repos),
        top_language=top_language,
        analysis_metadata={
            "commits_analyzed": total_commits_analyzed,
            "commit_analysis_used": True,
            "latest_commits_count": 30,
            "repos_analyzed": len(own_repos),
        },
    )