import { FaFacebook, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

const socials = [
  {
    icon: FaFacebook,
    href: "https://www.facebook.com/share/1KNsqbnU3h/",
    color: "#1877F2",
    label: "Facebook",
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/hafizur805?igsh=Mmd4dzFxdzR5djNz",
    color: "#E4405F",
    label: "Instagram",
  },
  {
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/hafizur-rahman-767655292",
    color: "#0A66C2",
    label: "LinkedIn",
  },
  {
    icon: FaGithub,
    href: "https://github.com/hafizurrahman3096-design",
    color: "#ffffff",
    label: "GitHub",
  },
];

interface SocialIconsProps {
  size?: number;
  className?: string;
}

const SocialIcons = ({ size = 18, className = "" }: SocialIconsProps) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socials.map(({ icon: Icon, href, color, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="group relative w-10 h-10 rounded-full glass flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg"
          style={{ ["--brand-color" as string]: color }}
        >
          <Icon
            size={size}
            className="text-muted-foreground transition-colors duration-200 group-hover:text-[var(--brand-color)]"
          />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
