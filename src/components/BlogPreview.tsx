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
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Recent Articles</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Thoughts on web development, design patterns, and emerging technologies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                <Calendar size={14} />
                {post.date}
              </div>
              <h3 className="font-semibold mb-2">{post.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
              <div className="mt-4">
                <a href="#" className="inline-flex items-center gap-2 text-primary hover:underline text-sm">
                  Read More
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-4xl font-bold text-primary mb-2">7+</div>
            <div className="text-sm text-muted-foreground">Projects</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">3+</div>
            <div className="text-sm text-muted-foreground">Certificates</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">3+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">good</div>
            <div className="text-sm text-muted-foreground">Client Satisfaction</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPreview;
