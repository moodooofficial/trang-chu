import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import ThemeToggle from "@/components/ThemeToggle";
import moodooLogo from "@/assets/moodoo-logo-new.jpg";

const texts = {
  vi: {
    home: "Trang chủ", about: "Giới thiệu", library: "Thư viện", shop: "Cửa tiệm",
    cave: "Hang động nhỏ", blog: "Blog", app: "App", login: "Đăng nhập",
    logout: "Đăng xuất", loginSignup: "Đăng nhập / Đăng ký", cart: "Giỏ hàng",
  },
  en: {
    home: "Home", about: "About", library: "Library", shop: "Shop",
    cave: "Secret Cave", blog: "Blog", app: "App", login: "Sign In",
    logout: "Sign Out", loginSignup: "Sign In / Sign Up", cart: "Cart",
  },
};

const navColors = [
  "text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30",
  "text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30",
  "text-green-500 hover:bg-green-100 dark:hover:bg-green-900/30",
  "text-pink-500 hover:bg-pink-100 dark:hover:bg-pink-900/30",
  "text-purple-500 hover:bg-purple-100 dark:hover:bg-purple-900/30",
  "text-orange-500 hover:bg-orange-100 dark:hover:bg-orange-900/30",
  "text-teal-500 hover:bg-teal-100 dark:hover:bg-teal-900/30",
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn, user, logout, openAuthModal } = useAuth();
  const { totalItems, openCart } = useCart();
  const { lang, toggleLanguage } = useLanguage();
  const t = texts[lang];

  const navLinks = [
    { to: "/", label: t.home, emoji: "🏠" },
    { to: "/gioi-thieu", label: t.about, emoji: "💡" },
    { to: "/thu-vien", label: t.library, locked: true, emoji: "📚" },
    { to: "/cua-tiem", label: t.shop, emoji: "🛍️" },
    { to: "/hang-dong-nho", label: t.cave, locked: true, emoji: "🕳️" },
    { to: "/blog", label: t.blog, locked: true, emoji: "📝" },
    { to: "https://moodoo-school.vercel.app/?zarsrc=410&utm_source=zalo&utm_medium=zalo&utm_campaign=zalo", label: t.app, emoji: "📱", external: true, requiresAuth: true },
  ];

  const handleAppClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      openAuthModal("login");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md shadow-lg font-display border-b-4 border-moodoo-yellow">
      <div className="w-full px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <img alt="MOODOO" className="w-10 h-10 object-contain" src={moodooLogo} />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link, idx) => (
            <li key={link.to}>
              {link.external ? (
                <a href={link.to} target="_blank" rel="noopener noreferrer"
                  onClick={link.requiresAuth ? handleAppClick : undefined}
                  className={`px-3 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    !isLoggedIn && link.requiresAuth
                      ? "text-muted-foreground opacity-60 cursor-not-allowed"
                      : `${navColors[idx % navColors.length]} hover:scale-105`
                  }`}>
                  <span className="mr-1">{link.emoji}</span>{link.label}
                  {!isLoggedIn && link.requiresAuth && " 🔒"}
                </a>
              ) : (
                <Link to={link.to}
                  className={`px-3 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    location.pathname === link.to
                      ? "bg-moodoo-orange text-white shadow-md scale-105"
                      : `${navColors[idx % navColors.length]} hover:scale-105`
                  }`}>
                  <span className="mr-1">{link.emoji}</span>
                  {link.label}
                  {link.locked && !isLoggedIn && " 🔒"}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="px-2 py-1 rounded-full text-xs font-bold bg-moodoo-yellow/30 hover:bg-moodoo-yellow/50 transition-colors text-foreground"
            aria-label="Toggle language"
          >
            {lang === "vi" ? "EN" : "VI"}
          </button>
          <ThemeToggle />
          <button onClick={openCart} className="relative p-2 rounded-full hover:bg-moodoo-yellow/20 transition-colors" aria-label={t.cart}>
            <ShoppingCart className="w-5 h-5 text-moodoo-orange" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-moodoo-rose text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-bounce">{totalItems}</span>
            )}
          </button>
          {isLoggedIn ? (
            <button onClick={logout}
              className="hidden lg:flex items-center gap-2 bg-moodoo-green text-white px-4 py-2 rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-md">
              <span>🦔</span><span className="max-w-[100px] truncate">{user}</span><span className="text-xs opacity-80">({t.logout})</span>
            </button>
          ) : (
            <button onClick={() => openAuthModal("login")}
              className="hidden lg:block bg-moodoo-rose text-white px-5 py-2 rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-lg hover:shadow-xl hover:scale-105">
              ✨ {t.login}
            </button>
          )}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 rounded-xl hover:bg-moodoo-yellow/20" aria-label="Menu">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-card border-t-2 border-moodoo-yellow shadow-xl animate-fade-in-up">
          <ul className="flex flex-col p-4 gap-1">
            {navLinks.map((link, idx) => (
              <li key={link.to}>
                {link.external ? (
                  <a href={link.to} target="_blank" rel="noopener noreferrer"
                    onClick={(e) => {
                      if (link.requiresAuth && !isLoggedIn) {
                        e.preventDefault();
                        openAuthModal("login");
                      }
                      setIsMenuOpen(false);
                    }}
                    className={`block px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      !isLoggedIn && link.requiresAuth
                        ? "text-muted-foreground opacity-60"
                        : `${navColors[idx % navColors.length]}`
                    }`}>
                    <span className="mr-2">{link.emoji}</span>{link.label}{!isLoggedIn && link.requiresAuth && " 🔒"}
                  </a>
                ) : (
                  <Link to={link.to} onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      location.pathname === link.to ? "bg-moodoo-orange text-white" : `${navColors[idx % navColors.length]}`
                    }`}>
                    <span className="mr-2">{link.emoji}</span>{link.label}{link.locked && !isLoggedIn && " 🔒"}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="px-4 pb-4">
            {isLoggedIn ? (
              <button onClick={() => { logout(); setIsMenuOpen(false); }}
                className="w-full bg-moodoo-green text-white px-4 py-3 rounded-xl font-bold text-sm">🦔 {user} ({t.logout})</button>
            ) : (
              <button onClick={() => { openAuthModal("login"); setIsMenuOpen(false); }}
                className="w-full bg-moodoo-rose text-white px-4 py-3 rounded-xl font-bold text-sm">✨ {t.loginSignup}</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
