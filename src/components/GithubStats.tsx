import { motion } from "framer-motion";
import { GitCommit, Flame, BarChart3 } from "lucide-react";

const stats = [
  { icon: GitCommit, value: "2,400+", label: "Total Commits" },
  { icon: Flame, value: "180", label: "Day Streak" },
  { icon: BarChart3, value: "15+", label: "Languages Used" },
];

const languages = [
  { name: "TypeScript", pct: 35, color: "bg-blue-400" },
  { name: "Python", pct: 25, color: "bg-yellow-400" },
  { name: "JavaScript", pct: 20, color: "bg-amber-400" },
  { name: "HTML/CSS", pct: 12, color: "bg-primary" },
  { name: "Other", pct: 8, color: "bg-muted-foreground" },
];

const GithubStats = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="font-mono text-sm text-primary mb-2">{"// GitHub"}</p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 inline-block relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full cursor-default">
            Contribution Stats
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-hover rounded-lg p-6 text-center"
            >
              <stat.icon size={24} className="text-primary mx-auto mb-3" />
              <span className="font-mono text-2xl font-semibold block">{stat.value}</span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GithubStats;
