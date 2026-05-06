import { motion } from "framer-motion";
import { ExternalLink, GitBranch, Trophy, Code2, Target, Star, ArrowUpRight } from "lucide-react";
import { useGitHubData, GitHubRepo } from "@/hooks/useGitHubData";
import { languageIcons, languageColors } from "@/lib/languageIcons";
import { Skeleton } from "@/components/ui/skeleton";

// Format repo name: "Green-technology-marketplace" → "Green Technology Marketplace"
function formatRepoName(name: string): string {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const ProjectSkeleton = () => (
  <div className="rounded-2xl bg-card border border-border overflow-hidden">
    <Skeleton className="h-44 w-full rounded-none" />
    <div className="p-6 space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
    </div>
  </div>
);

const RepoCard = ({ repo, index }: { repo: GitHubRepo; index: number }) => {
  const langIcon = repo.language ? languageIcons[repo.language] : null;
  const langColor = repo.language ? languageColors[repo.language] : "#8b8b8b";

  return (
    <motion.div
      key={repo.name}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      onClick={() => window.open(repo.html_url, "_blank")}
      className="group rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.3)] cursor-pointer"
    >
      {/* Card header with gradient */}
      <div className="h-44 bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center relative">
        {langIcon ? (
          <img
            src={langIcon}
            alt={repo.language || ""}
            className="w-16 h-16 opacity-40 group-hover:opacity-70 group-hover:scale-110 transition-all duration-300"
          />
        ) : (
          <span className="text-4xl font-bold text-primary/30 font-['Space_Grotesk'] group-hover:scale-110 transition-transform">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}

        {/* Stars badge */}
        {repo.stargazers_count > 0 && (
          <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-xs font-semibold text-yellow-400">
            <Star size={12} className="fill-yellow-400" />
            {repo.stargazers_count}
          </div>
        )}

        {/* Language badge */}
        {repo.language && (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/80 border border-border text-xs font-medium text-foreground">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: langColor }}
            />
            {repo.language}
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {formatRepoName(repo.name)}
          </h3>
          <ArrowUpRight
            size={18}
            className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1"
          />
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          {repo.description || "No description available."}
        </p>

        {/* Topics */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {repo.topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="px-3 py-1 text-xs rounded-full bg-secondary text-muted-foreground border border-border"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* View project button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            window.open(repo.html_url, "_blank");
          }}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          View Project <ExternalLink size={14} />
        </button>
      </div>
    </motion.div>
  );
};

const DSAStatsCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.3 }}
    className="md:col-span-2 lg:col-span-1 rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/40 transition-all duration-300 group hover:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.3)]"
  >
    <div className="h-44 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center relative">
      <Trophy className="w-16 h-16 text-primary/40 group-hover:scale-110 transition-transform" />
      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-xs font-semibold text-primary">
        Competitive Coding
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
        DSA Problem Solver
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-5">
        Solved problems across multiple competitive coding platforms, strengthening logical thinking and coding abilities.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="text-center p-3 rounded-xl bg-secondary/50 border border-border">
          <div className="text-2xl font-bold text-primary">150+</div>
          <div className="text-xs text-muted-foreground mt-1">Problems Solved</div>
        </div>
        <div className="text-center p-3 rounded-xl bg-secondary/50 border border-border">
          <div className="text-2xl font-bold text-foreground">DSA</div>
          <div className="text-xs text-muted-foreground mt-1">Focus Area</div>
        </div>
        <div className="text-center p-3 rounded-xl bg-secondary/50 border border-border">
          <div className="text-2xl font-bold text-foreground">C++</div>
          <div className="text-xs text-muted-foreground mt-1">Primary Lang</div>
        </div>
      </div>

      {/* Platform Badges */}
      <div className="flex flex-wrap gap-2">
        <a
          href="https://leetcode.com/u/Aryan_Singh9120"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFA116]/10 border border-[#FFA116]/30 text-sm font-medium text-[#FFA116] hover:bg-[#FFA116]/20 transition-colors"
        >
          <Code2 size={14} />
          LeetCode
          <ExternalLink size={12} />
        </a>
        <a
          href="https://codolio.com/profile/aryan_singh99"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#6C63FF]/10 border border-[#6C63FF]/30 text-sm font-medium text-[#6C63FF] hover:bg-[#6C63FF]/20 transition-colors"
        >
          <Target size={14} />
          Codolio
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  const { data, loading, error } = useGitHubData();

  // Fallback static projects for error state
  const staticProjects = [
    {
      name: "Green-technology-marketplace",
      description: "An e-commerce platform focused on green technology products with real-time database integration, user authentication, and a responsive UI.",
      html_url: "https://github.com/singharyan-912/Green-technology-marketplace",
      language: "JavaScript",
      stargazers_count: 0,
      topics: ["React", "Firebase", "CSS", "Auth"],
      fork: false,
      homepage: null,
      created_at: "",
      updated_at: "",
    },
    {
      name: "EduQuest",
      description: "A gamified learning platform designed to enhance user engagement through interactive interfaces, quizzes, and progress tracking.",
      html_url: "https://github.com/singharyan-912/EduQuest",
      language: "TypeScript",
      stargazers_count: 0,
      topics: ["JavaScript", "HTML/CSS", "UI/UX", "Gamification"],
      fork: false,
      homepage: null,
      created_at: "",
      updated_at: "",
    },
  ];

  const repos = error ? staticProjects : data.featuredRepos;

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Featured <span className="text-primary">Projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <>
              <ProjectSkeleton />
              <ProjectSkeleton />
              <ProjectSkeleton />
            </>
          ) : (
            repos.map((repo, i) => (
              <RepoCard key={repo.name} repo={repo} index={i} />
            ))
          )}

          {/* DSA Stats Card — always shown */}
          <DSAStatsCard />
        </div>
      </div>
    </section>
  );
};

export default Projects;
