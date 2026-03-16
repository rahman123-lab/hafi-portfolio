import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";

const posts = [
  {
    title: "Building Scalable MERN Applications",
    excerpt: "Architecture patterns and best practices for production-ready full-stack apps.",
    date: "Mar 10, 2026",
  },
  {
    title: "Getting Started with Machine Learning in Python",
    excerpt: "A practical guide to building your first ML model with scikit-learn.",
    date: "Feb 22, 2026",
  },
  {
    title: "React Performance Optimization Tips",
    excerpt: "Techniques to improve rendering performance and reduce bundle size.",
    date: "Jan 15, 2026",
  },
];

const BlogPreview = () => {
  return (
    <section id="blog" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="font-mono text-sm text-primary mb-2">{"// Blog"}</p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-12">
            Latest Articles
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.a
              key={post.title}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group glass rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-100 block"
            >
              <div className="h-0.5 bg-primary/0 group-hover:bg-primary transition-colors duration-100" />
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 font-mono">
                  <Calendar size={12} />
                  {post.date}
                </div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-100">
                    {post.title}
                  </h3>
                  <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
