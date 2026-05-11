import { motion } from "framer-motion";
import { GraduationCap, Code, Cloud, Trophy, Globe2 } from "lucide-react";
import { useGitHubData } from "@/hooks/useGitHubData";
import { Skeleton } from "@/components/ui/skeleton";
// @ts-ignore
import { GitHubCalendar } from "react-github-calendar";

const About = () => {
  const { data, loading } = useGitHubData();

  const stats = [
    { icon: Code, value: "200+", label: "DSA Problems", dynamic: false },
    {
      icon: Cloud,
      value: loading ? null : `${data.repoCount}+`,
      label: "Projects",
      dynamic: true,
    },
    { icon: GraduationCap, value: "CSE", label: "B.Tech", dynamic: false },
    {
      icon: Trophy,
      value: loading ? null : `${data.technologies.length > 0 ? data.technologies.length : data.languages.length}+`,
      label: "Technologies",
      dynamic: true,
    },
  ];

  // Custom theme for the GitHub calendar to match dark portfolio
  const calendarTheme = {
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">About Me</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Know Who <span className="text-primary">I Am</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-muted-foreground leading-relaxed mb-6">
              I'm a Computer Science Engineering student at <span className="text-foreground font-medium">Galgotias University</span> with a strong interest in Cloud Computing, Web Development, and Data Structures.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              I enjoy building efficient, scalable, and user-focused applications while continuously improving my technical and problem-solving skills. I have hands-on experience working with technologies like React, JavaScript, HTML, CSS, Firebase, and SQL.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Currently, I'm focused on expanding my expertise in cloud technologies and virtualization, with the goal of becoming a skilled cloud engineer capable of designing and deploying real-world applications.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map(({ icon: Icon, value, label, dynamic }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors group"
              >
                <Icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                {dynamic && loading ? (
                  <Skeleton className="h-9 w-16 mb-1" />
                ) : (
                  <div className="text-3xl font-bold text-foreground">{value}</div>
                )}
                <div className="text-sm text-muted-foreground mt-1">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* GitHub Contributions Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <Globe2 className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">GitHub Contributions</h3>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border overflow-x-auto">
            <GitHubCalendar
              username="singharyan-912"
              colorScheme="dark"
              theme={calendarTheme}
              fontSize={12}
              blockSize={12}
              blockMargin={4}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
