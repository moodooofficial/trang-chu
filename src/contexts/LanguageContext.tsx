import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "vi" | "en";

interface LanguageContextType {
  lang: Lang;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({ lang: "vi", toggleLanguage: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("vi");
  const toggleLanguage = () => setLang((l) => (l === "vi" ? "en" : "vi"));
  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
