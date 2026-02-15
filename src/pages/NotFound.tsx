import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const texts = {
  vi: {
    title: "404",
    message: "Ôi! Không tìm thấy trang này",
    back: "Quay về Trang chủ",
  },
  en: {
    title: "404",
    message: "Oops! Page not found",
    back: "Return to Home",
  },
};

const NotFound = () => {
  const location = useLocation();
  const { lang } = useLanguage();
  const t = texts[lang];

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{t.title}</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t.message}</p>
        <a href="/" className="text-primary underline hover:text-primary/90">{t.back}</a>
      </div>
    </div>
  );
};

export default NotFound;
