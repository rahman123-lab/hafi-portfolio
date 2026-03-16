import { motion } from "framer-motion";
import { ArrowDown, Mail, FileText } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.png";
import SocialIcons from "./SocialIcons";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--surface-border)/0.15)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--surface-border)/0.15)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative pt-24 pb-4 flex justify-center"
      >
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-primary/30 shadow-[0_0_30px_hsl(var(--primary)/0.2)]">
          <img src={profilePhoto} alt="Hafizur Rahman" className="w-full h-full object-cover" />
        </div>
      </motion.div>

      <div className="container relative mx-auto px-6 text-center flex-1 flex flex-col items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <p className="font-mono text-sm text-primary mb-4 tracking-wider">{"// Hello, World"}</p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-6"
        >
          I'm <span className="text-gradient">Hafizur Rahman</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-mono text-muted-foreground text-sm md:text-base max-w-xl mx-auto mb-10"
        >
          Web Developer · MERN · PHP/MySQL. ML Enthusiast
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <a href="#contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium text-sm hover:brightness-110 transition-all duration-100 glow">
            <Mail size={16} /> Get in Touch
          </a>
          <a href="#" className="inline-flex items-center gap-2 glass-hover px-6 py-3 rounded-lg font-medium text-sm text-foreground">
            <FileText size={16} /> Resume
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <SocialIcons />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors animate-bounce block">
            <ArrowDown size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
