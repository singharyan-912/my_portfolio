import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award, ExternalLink, Calendar, Building2,
  ShieldCheck, BadgeCheck, GraduationCap, Trophy,
  Network, Database, Code
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type CertCategory = "All" | "Development" | "Academic" | "Database" | "Networking";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  category: CertCategory;
  description: string;
  credentialUrl?: string;      // URL to the certificate file in /public/certificates/
  badgeUrl?: string;           // Devicon or logo URL
  icon?: "award" | "shield" | "badge" | "grad" | "trophy" | "network" | "database" | "code";
}

// ─── CERTIFICATIONS DATA ─────────────────────────────────────────────────────

const CERTIFICATIONS: Certification[] = [
  {
    title: "Database Programming with SQL",
    issuer: "Oracle Academy",
    date: "Dec 14, 2025",
    category: "Database",
    description: "Advanced SQL programming, database design, and management using Oracle SQL.",
    credentialUrl: "/certificates/Database_SQL.pdf",
    badgeUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
    icon: "database",
  },
  {
    title: "Mastering MySQL",
    issuer: "GUVI / HCL",
    date: "Dec 7, 2025",
    category: "Database",
    description: "Relational database management, complex queries, and database optimization with MySQL.",
    credentialUrl: "/certificates/Mastering_MySQL.png",
    badgeUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    icon: "database",
  },
  {
    title: "Networking Basics",
    issuer: "Cisco Networking Academy",
    date: "Apr 11, 2026",
    category: "Networking",
    description: "Fundamental concepts of networking, protocols, and network infrastructure.",
    credentialUrl: "/certificates/Networking_Basics.jpg",
    badgeUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cisco/cisco-plain.svg",
    icon: "network",
  },
  {
    title: "Servlets & JSP",
    issuer: "GUVI / HCL",
    date: "Oct 20, 2025",
    category: "Development",
    description: "Java Web Development using Servlets and JavaServer Pages for dynamic web applications.",
    credentialUrl: "/certificates/Servlets_JSP.png",
    badgeUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    icon: "code",
  },
  {
    title: "Java Collections",
    issuer: "GUVI / HCL",
    date: "Oct 16, 2025",
    category: "Development",
    description: "In-depth study of Java Collections Framework including List, Set, Map, and Queue.",
    credentialUrl: "/certificates/Java_Collections.png",
    badgeUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    icon: "code",
  },
  {
    title: "Object-Oriented Programming",
    issuer: "GUVI / HCL",
    date: "May 16, 2025",
    category: "Development",
    description: "Core OOP concepts: Inheritance, Polymorphism, Encapsulation, and Abstraction.",
    credentialUrl: "/certificates/OOP.jpg",
    badgeUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    icon: "code",
  },
  {
    title: "C Programming - 1st Semester",
    issuer: "GUVI / HCL",
    date: "Jan 9, 2025",
    category: "Academic",
    description: "Strong foundation in C programming language, algorithms, and logical problem solving.",
    credentialUrl: "/certificates/C_Programming.png",
    badgeUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    icon: "grad",
  },
  {
    title: "Design Thinking - A Primer",
    issuer: "NPTEL",
    date: "2024",
    category: "Academic",
    description: "Understanding user-centric design, prototyping, and innovative problem-solving methodologies.",
    credentialUrl: "/certificates/Design_Thinking.pdf",
    icon: "grad",
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES: CertCategory[] = ["All", "Development", "Academic", "Database", "Networking"];

const ICON_MAP = {
  award: Award,
  shield: ShieldCheck,
  badge: BadgeCheck,
  grad: GraduationCap,
  trophy: Trophy,
  network: Network,
  database: Database,
  code: Code,
};

const ACCENT_BAR: Record<CertCategory, string> = {
  All: "from-primary to-primary/30",
  Development: "from-violet-400 to-violet-400/30",
  Academic: "from-amber-400 to-amber-400/30",
  Database: "from-sky-400 to-sky-400/30",
  Networking: "from-emerald-400 to-emerald-400/30",
};

const CATEGORY_TAG: Record<CertCategory, string> = {
  All: "bg-primary/10 text-primary border-primary/20",
  Development: "bg-violet-400/10 text-violet-400 border-violet-400/20",
  Academic: "bg-amber-400/10 text-amber-400 border-amber-400/20",
  Database: "bg-sky-400/10 text-sky-400 border-sky-400/20",
  Networking: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
};

// ─── Card Component ───────────────────────────────────────────────────────────

const CertCard = ({ cert, index }: { cert: Certification; index: number }) => {
  const IconComponent = ICON_MAP[cert.icon ?? "award"];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="group relative flex flex-col rounded-2xl bg-card border border-border overflow-hidden
                 hover:border-primary/40 transition-all duration-300
                 hover:shadow-[0_0_35px_-12px_hsl(var(--primary)/0.3)]"
    >
      {/* Top accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${ACCENT_BAR[cert.category]}`} />

      <div className="flex flex-col flex-1 p-6">
        {/* Header row: badge + info */}
        <div className="flex items-start gap-4 mb-4">
          {/* Badge / Logo */}
          <div className="w-14 h-14 rounded-xl bg-secondary/60 border border-border flex items-center justify-center shrink-0 group-hover:border-primary/30 transition-colors">
            {cert.badgeUrl ? (
              <img
                src={cert.badgeUrl}
                alt={cert.issuer}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  // Fallback if image fails
                  (e.target as any).style.display = 'none';
                  (e.target as any).parentElement.innerHTML = '<div class="text-primary"><svg ...></svg></div>';
                }}
              />
            ) : (
              <IconComponent size={24} className="text-primary" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            {/* Category tag */}
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 border ${CATEGORY_TAG[cert.category]}`}
            >
              {cert.category}
            </span>

            {/* Title */}
            <h3 className="text-base font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
              {cert.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2 flex-1">
          {cert.description}
        </p>

        {/* Meta: issuer + date */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mb-3">
          <span className="inline-flex items-center gap-1.5">
            <Building2 size={12} className="text-primary/60" />
            {cert.issuer}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={12} className="text-primary/60" />
            {cert.date}
          </span>
        </div>

        {/* Credential link */}
        {cert.credentialUrl && (
          <div className="pt-3 border-t border-border mt-auto">
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              <ShieldCheck size={12} />
              View Certificate
              <ExternalLink size={11} />
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────

const Certifications = () => {
  const [activeCategory, setActiveCategory] = useState<CertCategory>("All");

  const filtered =
    activeCategory === "All"
      ? CERTIFICATIONS
      : CERTIFICATIONS.filter((c) => c.category === activeCategory);

  const counts: Partial<Record<CertCategory, number>> = { All: CERTIFICATIONS.length };
  CATEGORIES.filter((c) => c !== "All").forEach((cat) => {
    const n = CERTIFICATIONS.filter((c) => c.category === cat).length;
    if (n > 0) counts[cat] = n;
  });

  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/4 blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/4 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-2 block">
            Credentials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Certifications & <span className="text-primary">Achievements</span>
          </h2>
          <p className="text-muted-foreground mt-4 text-sm max-w-xl mx-auto">
            Professional certifications and academic achievements that validate my skills and knowledge.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <div className="flex items-center gap-1.5 text-muted-foreground mr-1">
            <Award size={14} />
            <span className="text-xs font-semibold uppercase tracking-wider">Filter</span>
          </div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_16px_-4px_hsl(var(--primary)/0.5)]"
                  : "bg-secondary/50 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {cat}
              {counts[cat] !== undefined && (
                <span className={`ml-1.5 ${activeCategory === cat ? "opacity-70" : "opacity-50"}`}>
                  ({counts[cat]})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((cert, i) => (
              <CertCard key={cert.title} cert={cert} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-muted-foreground"
          >
            <p className="text-4xl mb-3">📜</p>
            <p className="font-semibold">No certifications in this category yet.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Certifications;
