"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchGithubAnalysis, type AnalysisResult, type GitHubSkill } from "@/lib/backend";

export const dynamic = "force-dynamic";

function MetricCard({ label, value, unit, color }: { label: string; value: number; unit: string; color: string }) {
  const colorMap: Record<string, { bg: string; border: string; text: string }> = {
    purple: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400" },
    blue: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400" },
    green: { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-400" },
    amber: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400" },
  };
  const c = colorMap[color];
  return (
    <div className={`${c.bg} border ${c.border} rounded-lg p-6`}>
      <p className="text-gray-400 text-sm mb-2">{label}</p>
      <div className={`text-3xl font-bold ${c.text} mb-1`}>{value}</div>
      <p className="text-gray-500 text-xs">{unit}</p>
    </div>
  );
}

function SkillCard({ skill, index }: { skill: GitHubSkill; index: number }) {
  const strengthColor = skill.strength === "Strong" ? "bg-green-500/20 border-green-500/50" : skill.strength === "Moderate" ? "bg-amber-500/20 border-amber-500/50" : "bg-orange-500/20 border-orange-500/50";
  const strengthTextColor = skill.strength === "Strong" ? "text-green-400" : skill.strength === "Moderate" ? "text-amber-400" : "text-orange-400";

  return (
    <div className="bg-slate-700/30 border border-white/5 rounded-lg p-4 hover:border-white/10 transition">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-purple-400">#{index + 1}</span>
          <h3 className="text-lg font-bold">{skill.name}</h3>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${strengthColor} ${strengthTextColor}`}>{skill.strength}</div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <span className="text-gray-400">Repos</span>
          <p className="text-xl font-bold text-blue-400 mt-1">{skill.repoCount}</p>
        </div>
        <div>
          <span className="text-gray-400">Confidence</span>
          <div className="mt-2">
            <p className="text-xl font-bold text-purple-400">{skill.confidence}%</p>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${skill.confidence}%` }}></div>
            </div>
          </div>
        </div>
        <div>
          <span className="text-gray-400">Commits</span>
          <p className="text-xl font-bold text-green-400 mt-1">{skill.commitEvidence}</p>
        </div>
      </div>

      {skill.repos.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-sm text-gray-400 mb-2">Repositories:</p>
          <div className="space-y-1">
            {skill.repos.slice(0, 3).map((repo: any, i) => (
              <a key={i} href={repo.url} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-400 hover:text-purple-300 block">
                → {repo.name} {repo.language && `(${repo.language})`}
              </a>
            ))}
            {skill.repos.length > 3 && <p className="text-xs text-gray-500 mt-1">+ {skill.repos.length - 3} more</p>}
          </div>
        </div>
      )}
    </div>
  );
}

function LanguageDistribution({ analysis }: { analysis: AnalysisResult }) {
  const languages: Record<string, number> = {};
  analysis.skills.forEach((skill) => {
    skill.repos.forEach((repo: any) => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });
  });

  const sorted = Object.entries(languages).sort(([, a], [, b]) => b - a).slice(0, 8);
  const maxCount = Math.max(...sorted.map(([, v]) => v), 1);

  return (
    <div className="space-y-3">
      {sorted.map(([lang, count]) => (
        <div key={lang}>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">{lang}</span>
            <span className="text-gray-400">{count} repos</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{ width: `${(count / maxCount) * 100}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function RepositoryInsights({ analysis }: { analysis: AnalysisResult }) {
  const repos = analysis.skills.flatMap((s) => s.repos as any[]).filter((v, i, a) => a.findIndex((t) => t.name === v.name) === i);
  const totalStars = repos.reduce((sum, r) => sum + ((r.stargazers_count as number) || 0), 0);
  const avgStars = Math.round(totalStars / Math.max(repos.length, 1));

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-slate-700/50 rounded-lg p-4">
        <p className="text-gray-400 text-sm">Total Repositories</p>
        <p className="text-2xl font-bold text-blue-400 mt-2">{repos.length}</p>
      </div>
      <div className="bg-slate-700/50 rounded-lg p-4">
        <p className="text-gray-400 text-sm">Total Stars</p>
        <p className="text-2xl font-bold text-amber-400 mt-2">{totalStars}</p>
      </div>
      <div className="bg-slate-700/50 rounded-lg p-4">
        <p className="text-gray-400 text-sm">Avg Stars/Repo</p>
        <p className="text-2xl font-bold text-purple-400 mt-2">{avgStars}</p>
      </div>
      <div className="bg-slate-700/50 rounded-lg p-4">
        <p className="text-gray-400 text-sm">Analysis Date</p>
        <p className="text-xl font-bold text-green-400 mt-2">Today</p>
      </div>
    </div>
  );
}

function CommitTimeline({ analysis }: { analysis: AnalysisResult }) {
  const allCommits = analysis.skills
    .flatMap((s) => s.repos as any[])
    .flatMap((r) => (r.commits as any[]) || [])
    .filter((v, i, a) => a.findIndex((t) => t.hash === v.hash) === i)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  if (allCommits.length === 0) {
    return <p className="text-gray-400">No commit history available</p>;
  }

  return (
    <div className="space-y-3">
      {allCommits.map((commit, idx) => (
        <div key={idx} className="bg-slate-700/30 border border-white/5 rounded-lg p-3 text-sm">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="font-mono text-purple-400 text-xs mb-1">{commit.hash}</div>
              <p className="text-white truncate max-w-md">{commit.message}</p>
              <div className="flex gap-4 mt-2 text-xs text-gray-500">
                <span>by {commit.author}</span>
                <span>{new Date(commit.date).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-green-400 text-xs font-bold">+{commit.additions || 0}</div>
              <div className="text-red-400 text-xs font-bold">-{commit.deletions || 0}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProfileSummary({ analysis }: { analysis: AnalysisResult }) {
  const topSkill = analysis.skills[0];
  const totalCommits = (analysis.analysisMetadata?.commits_analyzed as number) || 0;
  const avgConfidence = Math.round(analysis.skills.reduce((sum, s) => sum + s.confidence, 0) / Math.max(analysis.skills.length, 1));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-300">Profile Strengths</h3>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span>
              <strong>Primary Expertise:</strong> {topSkill?.name} (Confidence: {topSkill?.confidence}%)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span>
              <strong>Skill Depth:</strong> {analysis.skills.length} distinct technologies detected
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span>
              <strong>Coding Activity:</strong> {totalCommits} commits analyzed across all repositories
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span>
              <strong>Consistency:</strong> Average confidence score of {avgConfidence}%
            </span>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-300">Data Source</h3>
        <div className="bg-slate-700/50 rounded-lg p-4 space-y-2 text-sm">
          <p>
            <strong className="text-blue-400">Analysis Type:</strong> Real GitHub Profile Analysis
          </p>
          <p>
            <strong className="text-blue-400">Commits Analyzed:</strong> Latest 30 per repository
          </p>
          <p>
            <strong className="text-blue-400">Data Accuracy:</strong> 100% from GitHub API
          </p>
          <p>
            <strong className="text-blue-400">Repositories:</strong> Public repos only, no synthetic data
          </p>
          <p className="text-gray-500 text-xs mt-4 pt-4 border-t border-white/10">All metrics derived from actual commit history and repository metadata. Zero fake data or animations.</p>
        </div>
      </div>
    </div>
  );
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username")?.trim() ?? "";
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) {
      setAnalysis(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    void fetchGithubAnalysis(username)
      .then((result) => {
        if (!cancelled) {
          setAnalysis(result);
        }
      })
      .catch((fetchError: unknown) => {
        if (!cancelled) {
          setAnalysis(null);
          setError(fetchError instanceof Error ? fetchError.message : "Analysis failed");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <a href="/" className="inline-block px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium text-gray-300 transition">← Back</a>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Analyzing GitHub profile...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6 max-w-2xl mx-auto">
          <p className="text-red-400 font-medium">{error}</p>
        </div>
      )}

      {analysis && !isLoading && (
        <div className="space-y-6">
          {/* User Profile Header */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-6 border border-white/5">
            <div className="flex items-start gap-6">
              <img src={analysis.user.avatar_url} alt={analysis.user.login} className="w-24 h-24 rounded-full border-2 border-purple-500" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{analysis.user.name || analysis.user.login}</h1>
                  <a href={analysis.user.html_url} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                    @{analysis.user.login} ↗
                  </a>
                </div>
                <p className="text-gray-400 mb-4">{analysis.user.bio || "No bio"}</p>
                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="text-gray-400">Public Repos:</span> <span className="font-bold text-white ml-1">{analysis.user.public_repos}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Followers:</span> <span className="font-bold text-white ml-1">{analysis.user.followers}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard label="Total Skills Detected" value={analysis.skills.length} unit="skills" color="purple" />
            <MetricCard label="Repositories Analyzed" value={analysis.totalRepos} unit="repos" color="blue" />
            <MetricCard label="Commits Analyzed" value={analysis.analysisMetadata?.commits_analyzed as number ?? 0} unit="commits" color="green" />
            <MetricCard label="Average Confidence" value={Math.round(analysis.skills.reduce((sum, s) => sum + s.confidence, 0) / Math.max(analysis.skills.length, 1))} unit="%" color="amber" />
          </div>

          {/* Skills Section */}
          <div className="bg-slate-800/50 rounded-lg p-6 border border-white/5">
            <h2 className="text-2xl font-bold mb-6">Detected Skills ({analysis.skills.length})</h2>
            <div className="space-y-4">
              {analysis.skills.map((skill, idx) => (
                <SkillCard key={skill.name} skill={skill} index={idx} />
              ))}
            </div>
          </div>

          {/* Languages Distribution */}
          <div className="bg-slate-800/50 rounded-lg p-6 border border-white/5">
            <h2 className="text-2xl font-bold mb-6">Languages Used</h2>
            <LanguageDistribution analysis={analysis} />
          </div>

          {/* Repository Insights */}
          <div className="bg-slate-800/50 rounded-lg p-6 border border-white/5">
            <h2 className="text-2xl font-bold mb-6">Repository Insights</h2>
            <RepositoryInsights analysis={analysis} />
          </div>

          {/* Commit Activity */}
          <div className="bg-slate-800/50 rounded-lg p-6 border border-white/5">
            <h2 className="text-2xl font-bold mb-6">Recent Commits (Sample)</h2>
            <CommitTimeline analysis={analysis} />
          </div>

          {/* Technical Profile Summary */}
          <div className="bg-slate-800/50 rounded-lg p-6 border border-white/5">
            <h2 className="text-2xl font-bold mb-6">Technical Profile Summary</h2>
            <ProfileSummary analysis={analysis} />
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-400 py-8">
            <p>Analysis powered by real GitHub data • Latest 30 commits per repository analyzed</p>
            <p className="mt-2">No synthetic data • All metrics calculated from actual repository activity</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
          <div className="flex items-center justify-center min-h-[60vh] text-gray-400">
            Loading dashboard...
          </div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
