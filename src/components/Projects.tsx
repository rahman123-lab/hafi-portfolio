import { motion } from "framer-motion";
import { ExternalLink, Github, Globe } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import projectDiagnosticLab from "@/assets/project-diagnostic-lab.jpg";
import projectAiClassifier from "@/assets/project-ai-classifier.jpg";
import projectEcommerce from "@/assets/project-ecommerce.jpg";
import projectTaskManager from "@/assets/project-task-manager.jpg";

const Projects = () => {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });

  if (isLoading) {
    return (
      <section id="projects" className="py-24 relative">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="font-mono text-sm text-primary mb-2">{"// Projects"}</p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 inline-block relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full cursor-default">Featured Work</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {projects.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No projects yet. Check back soon!</p>
            </div>
          ) : (
            projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group glass rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-200"
            >
              <div className="h-0.5 bg-primary/0 group-hover:bg-primary transition-colors duration-200" />
              
              {project.thumbnail_url && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.thumbnail_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              )}
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-foreground">{project.title}</h3>
                  <div className="flex gap-3">
                    {project.github_link && (
                      <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-200" title="GitHub">
                        <Github size={16} />
                      </a>
                    )}
                    {project.project_link && (
                      <a href={project.project_link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-200" title="Live Demo">
                        <ExternalLink size={16} />
                      </a>
                    )}
                    {project.website_link && (
                      <a href={project.website_link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-200" title="Website">
                        <Globe size={16} />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span key={t} className="font-mono text-[10px] px-2 py-1 rounded bg-muted text-muted-foreground">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
