import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import MoodooLogo from "@/components/MoodooLogo";
import ThemeToggle from "@/components/ThemeToggle";
import moodooHouseLogo from "@/assets/moodoo-house-logo.jpg";

const navLinks = [
  { to: "/", label: "Trang chủ", emoji: "🏠" },
  { to: "/gioi-thieu", label: "Giới thiệu", emoji: "💡" },
  { to: "/thu-vien", label: "Thư viện", locked: true, emoji: "📚" },
  { to: "/cua-tiem", label: "Cửa tiệm", emoji: "🛍️" },
  { to: "/hang-dong-nho", label: "Hang động nhỏ", locked: true, emoji: "🕳️" },
  { to: "/blog", label: "Blog", locked: true, emoji: "📝" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn, user, logout, openAuthModal } = useAuth();
  const { totalItems, openCart } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md shadow-lg font-display border-b-4 border-moodoo-yellow">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <img src={moodooHouseLogo} alt="MOODOO" className="w-10 h-10 object-contain" />
          <MoodooLogo size="sm" />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to}
                className={`px-3 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  location.pathname === link.to
                    ? "bg-moodoo-orange text-white shadow-md scale-105"
                    : "text-foreground hover:bg-moodoo-yellow/30 hover:scale-105"
                }`}>
                <span className="mr-1">{link.emoji}</span>
                {link.label}
                {link.locked && !isLoggedIn && " 🔒"}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button onClick={openCart} className="relative p-2 rounded-full hover:bg-moodoo-yellow/20 transition-colors" aria-label="Giỏ hàng">
            <ShoppingCart className="w-5 h-5 text-moodoo-orange" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-moodoo-rose text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-bounce">{totalItems}</span>
            )}
          </button>
          {isLoggedIn ? (
            <button onClick={logout}
              className="hidden lg:flex items-center gap-2 bg-moodoo-green text-white px-4 py-2 rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-md">
              <span>🦔</span><span className="max-w-[100px] truncate">{user}</span><span className="text-xs opacity-80">(Thoát)</span>
            </button>
          ) : (
            <button onClick={() => openAuthModal("login")}
              className="hidden lg:block bg-moodoo-rose text-white px-5 py-2 rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-lg hover:shadow-xl hover:scale-105">
              ✨ Đăng nhập
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
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    location.pathname === link.to ? "bg-moodoo-orange text-white" : "text-foreground hover:bg-moodoo-yellow/20"
                  }`}>
                  <span className="mr-2">{link.emoji}</span>{link.label}{link.locked && !isLoggedIn && " 🔒"}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-4 pb-4">
            {isLoggedIn ? (
              <button onClick={() => { logout(); setIsMenuOpen(false); }}
                className="w-full bg-moodoo-green text-white px-4 py-3 rounded-xl font-bold text-sm">🦔 {user} (Đăng xuất)</button>
            ) : (
              <button onClick={() => { openAuthModal("login"); setIsMenuOpen(false); }}
                className="w-full bg-moodoo-rose text-white px-4 py-3 rounded-xl font-bold text-sm">✨ Đăng nhập / Đăng ký</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
