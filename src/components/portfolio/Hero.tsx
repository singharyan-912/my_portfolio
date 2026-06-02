import { motion } from "framer-motion";
import { GitBranch, Link, Code2, Mail, FileDown } from "lucide-react";
// @ts-ignore
import profileImg from "../asset/img2.png";

const socialLinks = [
  { icon: GitBranch, href: "https://github.com/singharyan-912", label: "GitHub" },
  { icon: Link, href: "https://www.linkedin.com/in/aryan-singh--cs/", label: "LinkedIn" },
  { icon: Code2, href: "https://leetcode.com/u/Aryan_Singh9120", label: "LeetCode" },
  { icon: Mail, href: "mailto:singharyan.cs2028@gmail.com", label: "Email" },
];

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-primary/5 blur-[100px]" />

      <div className="max-w-6xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-border bg-secondary/50 text-sm text-muted-foreground mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for work
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
            Hi, I'm{" "}
            <span className="text-primary">Aryan</span>
            <br />
            Singh
          </h1>

          <p className="text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
            Computer Science Engineering student passionate about{" "}
            <span className="text-primary font-semibold">Cloud Computing</span>,{" "}
            <span className="text-primary font-semibold">Web Development</span>, and{" "}
            <span className="text-primary font-semibold">Data Structures</span>.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="px-7 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-colors duration-300"
            >
              View Projects
            </a>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent border border-primary text-primary font-semibold hover:bg-primary/10 transition-colors duration-300"
            >
              <FileDown size={16} />
              Get Resume
            </a>
          </div>

          <div className="flex items-center gap-3 mt-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-secondary/80 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-200"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-2xl" />
            <div className="relative w-full h-full rounded-full border-2 border-primary/30 bg-secondary/40 backdrop-blur-md flex items-center justify-center overflow-hidden">
              <img 
                src={profileImg} 
                alt="Aryan Singh" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -top-2 -right-2 px-3 py-1.5 rounded-lg bg-card/80 backdrop-blur-md border border-[#957C3D]/30 text-xs font-medium text-foreground shadow-lg"
            >
              React ⚡
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3.5 }}
              className="absolute -bottom-2 -left-2 px-3 py-1.5 rounded-lg bg-card/80 backdrop-blur-md border border-[#957C3D]/30 text-xs font-medium text-foreground shadow-lg"
            >
              Cloud ☁️
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
