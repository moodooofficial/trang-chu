interface MoodooLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-5xl md:text-6xl",
  xl: "text-6xl md:text-8xl",
};

const letters = [
  { char: "M", cls: "moodoo-letter-m" },
  { char: "O", cls: "moodoo-letter-o1" },
  { char: "O", cls: "moodoo-letter-o2" },
  { char: "D", cls: "moodoo-letter-d" },
  { char: "O", cls: "moodoo-letter-o3" },
  { char: "O", cls: "moodoo-letter-o4" },
];

export default function MoodooLogo({ className = "", size = "lg" }: MoodooLogoProps) {
  return (
    <span className={`font-display font-extrabold tracking-wider inline-flex ${sizeClasses[size]} ${className}`}
      style={{ textShadow: "3px 3px 0 rgba(0,0,0,0.1)" }}
    >
      {letters.map((l, i) => (
        <span key={i} className={`${l.cls} inline-block hover:scale-110 hover:-rotate-6 transition-transform duration-200 cursor-default`}>
          {l.char}
        </span>
      ))}
    </span>
  );
}
