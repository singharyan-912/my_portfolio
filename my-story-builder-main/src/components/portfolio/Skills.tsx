import { motion } from "framer-motion";
import {
  Code2, Globe, Database, Cloud, GitBranch, Terminal,
  Layers, Cpu, Braces, FileCode, Server, Container,
  Palette, Layout, Smartphone, Workflow
} from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "JavaScript", icon: Braces },
      { name: "HTML/CSS", icon: FileCode },
      { name: "C++", icon: Terminal },
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
      { name: "Algorithms", icon: Globe },
      { name: "Problem Solving", icon: Layout },
      { name: "System Design", icon: Smartphone },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">My Skills</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            What <span className="text-primary">I Work With</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, ci) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-5">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {category.skills.map(({ name, icon: Icon }) => (
                  <div
                    key={name}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/50 border border-border hover:border-primary/40 hover:bg-secondary transition-all duration-200 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-4.5 h-4.5 text-primary" size={18} />
                    </div>
                    <span className="text-sm font-medium text-foreground">{name}</span>
                  </div>
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
