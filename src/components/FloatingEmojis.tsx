import { useEffect, useState } from "react";

interface FloatingEmoji {
  id: number;
  emoji: string;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
}

const emojiSets: Record<string, string[]> = {
  default: ["⭐", "🌈", "🎈", "🦋", "💖", "🌸", "🍀", "✨"],
  cave: ["⭐", "✨", "🌟", "💫", "🔮", "🌙", "💜", "🪐"],
  library: ["📚", "✏️", "🎨", "🌟", "📖", "🧩", "🎵", "💡"],
  blog: ["📝", "💬", "🌱", "🎯", "💛", "🌻", "📌", "✨"],
  shop: ["🛍️", "🎁", "🌟", "💝", "🎀", "✨", "🛒", "💫"],
};

export default function FloatingEmojis({ variant = "default", count = 12 }: { variant?: string; count?: number }) {
  const [emojis, setEmojis] = useState<FloatingEmoji[]>([]);
  const set = emojiSets[variant] || emojiSets.default;

  useEffect(() => {
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: set[i % set.length],
      left: Math.random() * 95,
      top: Math.random() * 90,
      size: 16 + Math.random() * 20,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    }));
    setEmojis(generated);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {emojis.map((e) => (
        <span
          key={e.id}
          className="absolute opacity-15 dark:opacity-10 select-none"
          style={{
            left: `${e.left}%`,
            top: `${e.top}%`,
            fontSize: `${e.size}px`,
            animation: `floatEmoji ${e.duration}s ease-in-out ${e.delay}s infinite alternate`,
          }}
        >
          {e.emoji}
        </span>
      ))}
    </div>
  );
}
