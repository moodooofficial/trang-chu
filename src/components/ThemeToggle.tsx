import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("moodoo-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("moodoo-theme", "light");
    }
  }, [dark]);

  useEffect(() => {
    const saved = localStorage.getItem("moodoo-theme");
    if (saved === "dark") {
      setDark(true);
    }
  }, []);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded-full bg-moodoo-cream dark:bg-moodoo-purple/30 hover:scale-110 transition-all duration-200"
      aria-label="Toggle dark mode"
    >
      {dark ? (
        <Sun className="w-5 h-5 text-moodoo-yellow" />
      ) : (
        <Moon className="w-5 h-5 text-moodoo-purple" />
      )}
    </button>
  );
}
