import { useState, useEffect } from "react";

const GITHUB_USERNAME = "singharyan-912";
const CACHE_KEY = "github_data_cache";
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  fork: boolean;
  homepage: string | null;
  created_at: string;
  updated_at: string;
}

export interface GitHubData {
  repoCount: number;
  languages: string[];
  technologies: string[];
  featuredRepos: GitHubRepo[];
  username: string;
}

interface CacheEntry {
  data: GitHubData;
  timestamp: number;
}

const FALLBACK_DATA: GitHubData = {
  repoCount: 5,
  languages: ["JavaScript", "TypeScript", "HTML", "CSS"],
  technologies: ["React", "Firebase", "Tailwind CSS"],
  featuredRepos: [],
  username: GITHUB_USERNAME,
};

function getCachedData(): GitHubData | null {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const entry: CacheEntry = JSON.parse(cached);
    if (Date.now() - entry.timestamp > CACHE_TTL) {
      sessionStorage.removeItem(CACHE_KEY);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

function setCachedData(data: GitHubData): void {
  try {
    const entry: CacheEntry = { data, timestamp: Date.now() };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // sessionStorage may be full or unavailable
  }
}

export function useGitHubData() {
  const [data, setData] = useState<GitHubData>(FALLBACK_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = getCachedData();
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
        );

        if (response.status === 403) {
          throw new Error("GitHub API rate limit reached. Showing cached data.");
        }

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const repos: GitHubRepo[] = await response.json();

        // Filter out forks
        const ownRepos = repos.filter((r) => !r.fork);

        // Unique languages
        const languageSet = new Set<string>();
        ownRepos.forEach((r) => {
          if (r.language) languageSet.add(r.language);
        });

        // Unique technologies from topics
        const techSet = new Set<string>();
        ownRepos.forEach((r) => {
          r.topics?.forEach((t) => techSet.add(t));
        });

        // Featured repos: all own repos sorted by stars then updated date
        const featuredRepos = [...ownRepos]
          .sort((a, b) => {
            if (b.stargazers_count !== a.stargazers_count) {
              return b.stargazers_count - a.stargazers_count;
            }
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
          })
          .slice(0, 6);

        const result: GitHubData = {
          repoCount: ownRepos.length,
          languages: Array.from(languageSet),
          technologies: Array.from(techSet),
          featuredRepos,
          username: GITHUB_USERNAME,
        };

        setCachedData(result);
        setData(result);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to fetch GitHub data";
        setError(message);
        console.error("GitHub API error:", message);
        // Keep fallback data
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
