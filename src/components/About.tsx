import { motion } from "framer-motion";
import { Code2, Users, Award, Briefcase } from "lucide-react";

const stats = [
  { icon: Code2, value: "120+", label: "Projects" },
  { icon: Users, value: "95%", label: "Client Satisfaction" },
  { icon: Award, value: "10+", label: "Certificates" },
  { icon: Briefcase, value: "3+", label: "Years Experience" },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4 },
};

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div {...fadeUp}>
          <p className="font-mono text-sm text-primary mb-2">{"// About"}</p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 inline-block relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full cursor-default">
            Know Me Better
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Bio card - spans 2 cols */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="md:col-span-2 glass-hover rounded-lg p-8"
          >
            <p className="text-muted-foreground leading-relaxed mb-4">
              I'm a passionate Full Stack Developer with expertise in the MERN stack and machine learning.
              I build elegant, scalable applications and love turning complex problems into simple, intuitive solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With a deep interest in modern web technologies and AI, I continuously explore new tools and frameworks
              to deliver cutting-edge solutions. When I'm not coding, you'll find me writing technical blogs or
              contributing to open-source projects.
            </p>
          </motion.div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * (i + 2) }}
                className="glass-hover rounded-lg p-4 flex flex-col items-center justify-center text-center"
              >
                <stat.icon size={20} className="text-primary mb-2" />
                <span className="font-mono text-xl font-semibold text-foreground">{stat.value}</span>
                <span className="text-xs text-muted-foreground mt-1">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
