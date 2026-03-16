import { Settings } from "lucide-react";
import { Link } from "react-router-dom";
import SocialIcons from "./SocialIcons";

const Footer = () => {
  return (
    <footer className="border-t border-surface-border py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-sm text-muted-foreground">
          © 2026 Hafizur Rahman. All rights reserved.
        </span>
        <div className="flex items-center gap-6">
          <SocialIcons size={14} />
          <Link
            to="/admin"
            className="text-muted-foreground/40 hover:text-muted-foreground transition-colors duration-200"
            aria-label="Admin"
          >
            <Settings size={14} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
