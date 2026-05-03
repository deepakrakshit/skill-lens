export type SkillStrength = "Strong" | "Moderate" | "Weak";

export interface CommitInfo {
  hash: string;
  message: string;
  author: string;
  date: string;
  additions: number;
  deletions: number;
}

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  html_url: string;
}

export interface GitHubSkill {
  name: string;
  strength: SkillStrength;
  repoCount: number;
  confidence: number;
  repos: { name: string; url: string; commits?: number; language?: string }[];
  percentage: number;
  commitEvidence: number;
}

export interface AnalysisResult {
  user: GitHubUser;
  skills: GitHubSkill[];
  totalRepos: number;
  topLanguage: string;
  analysisMetadata: {
    commits_analyzed: number;
    commit_analysis_used: boolean;
    latest_commits_count: number;
    repos_analyzed?: number;
  };
}

export interface UploadResponse {
  text: string;
  fileName: string | null;
  error: string | null;
}

const DEFAULT_BACKEND_URL = "http://127.0.0.1:8000";

export function getBackendUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? DEFAULT_BACKEND_URL;
  return new URL(path, baseUrl).toString();
}

export async function fetchGithubAnalysis(
  username: string
): Promise<AnalysisResult> {
  const response = await fetch(
    getBackendUrl(`/api/analyze?username=${encodeURIComponent(username)}`),
    {
      cache: "no-store",
    }
  );

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.detail || payload.error || "Analysis failed");
  }

  return payload as AnalysisResult;
}

export async function uploadResumeFile(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(getBackendUrl("/api/upload"), {
    method: "POST",
    body: formData,
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.detail || payload.error || "Resume upload failed");
  }

  return payload as UploadResponse;
}