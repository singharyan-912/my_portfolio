import { motion } from "framer-motion";
import {
  Code2, Globe, Database, Cloud, GitBranch, Terminal,
  Layers, Cpu, Braces, FileCode, Server, Container,
  Palette, Layout, Smartphone, Workflow, Hash, Monitor, Network
} from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "JavaScript", icon: Braces },
      { name: "HTML/CSS", icon: FileCode },
      { name: "Java", icon: Terminal },
      { name: "Python", icon: Hash },
      { name: "C", icon: Terminal },
      { name: "SQL", icon: Database },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "React", icon: Code2 },
      { name: "Tailwind CSS", icon: Palette },
      { name: "Node.js", icon: Server },
      { name: "Firebase", icon: Layers },
      { name: "Supabase", icon: Database },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "Cloud Computing", icon: Cloud },
      { name: "Virtualization", icon: Container },
      { name: "Git & GitHub", icon: GitBranch },
      { name: "CI/CD", icon: Workflow },
    ],
  },
  {
    title: "Core CS",
    skills: [
      { name: "Data Structures", icon: Cpu },
      { name: "Algorithms", icon: Workflow },
      { name: "Problem Solving", icon: Layout },
      { name: "System Design", icon: Smartphone },
      { name: "Computer Networks", icon: Network },
      { name: "Operating System", icon: Monitor },
      { name: "DBMS", icon: Database },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="relative inline-block">
            <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-2 block">Technical Arsenal</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              What <span className="text-primary">I Work With</span>
            </h2>
            {/* Subtle background text for depth */}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-8xl font-black text-foreground/[0.03] select-none -z-10 uppercase">
              Skills
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, ci) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1 }}
              className="group p-8 rounded-[2rem] bg-card/40 backdrop-blur-xl border border-border/50 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_40px_-15px_hsl(var(--primary)/0.2)]"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <div className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
              </div>

              <div className="flex flex-col gap-4">
                {category.skills.map(({ name, icon: Icon }) => (
                  <motion.div
                    key={name}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 group/item"
                  >
                    <div className="w-10 h-10 rounded-xl bg-secondary/50 border border-border/50 flex items-center justify-center group-hover/item:bg-primary/10 group-hover/item:border-primary/30 transition-all">
                      <Icon size={18} className="text-muted-foreground group-hover/item:text-primary transition-colors" />
                    </div>
                    <span className="text-sm font-semibold text-foreground/80 group-hover/item:text-foreground transition-colors">
                      {name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
