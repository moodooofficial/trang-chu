import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const navLinks = [
  { to: "/", label: "Trang chủ" },
  { to: "/gioi-thieu", label: "Giới thiệu" },
  { to: "/thu-vien", label: "Thư viện", locked: true },
  { to: "/cua-tiem", label: "Cửa tiệm" },
  { to: "/hang-dong-nho", label: "Hang động nhỏ", locked: true },
  { to: "/blog", label: "Blog", locked: true },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn, user, logout, openAuthModal } = useAuth();
  const { totalItems, openCart } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-md font-display">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-moodoo-rose tracking-wider">
          MOODOO
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`px-3 py-2 rounded-full text-sm font-bold uppercase transition-all duration-300 ${
                  location.pathname === link.to
                    ? "bg-moodoo-orange text-white"
                    : "text-moodoo-deep-orange hover:bg-moodoo-cream"
                }`}
              >
                {link.label}
                {link.locked && !isLoggedIn && " 🔒"}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Cart icon (visible on shop-related pages or always) */}
          <button
            onClick={openCart}
            className="relative p-2 rounded-full hover:bg-moodoo-cream transition-colors"
            aria-label="Giỏ hàng"
          >
            <ShoppingCart className="w-5 h-5 text-moodoo-deep-orange" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-moodoo-rose text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>

          {isLoggedIn ? (
            <button
              onClick={logout}
              className="hidden lg:flex items-center gap-2 bg-moodoo-cream text-moodoo-deep-orange px-4 py-2 rounded-full font-bold text-sm hover:bg-moodoo-amber hover:text-white transition-all"
            >
              <span>👤</span>
              <span className="max-w-[120px] truncate">{user}</span>
              <span className="text-xs opacity-70">(Thoát)</span>
            </button>
          ) : (
            <button
              onClick={() => openAuthModal("login")}
              className="hidden lg:block bg-moodoo-deep-orange text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-moodoo-orange transition-colors shadow-md"
            >
              Đăng nhập
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-moodoo-cream"
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg animate-fade-in-up">
          <ul className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-bold uppercase transition-all ${
                    location.pathname === link.to
                      ? "bg-moodoo-orange text-white"
                      : "text-moodoo-deep-orange hover:bg-moodoo-cream"
                  }`}
                >
                  {link.label}
                  {link.locked && !isLoggedIn && " 🔒"}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-4 pb-4">
            {isLoggedIn ? (
              <button
                onClick={() => { logout(); setIsMenuOpen(false); }}
                className="w-full bg-moodoo-cream text-moodoo-deep-orange px-4 py-3 rounded-xl font-bold text-sm"
              >
                👤 {user} (Đăng xuất)
              </button>
            ) : (
              <button
                onClick={() => { openAuthModal("login"); setIsMenuOpen(false); }}
                className="w-full bg-moodoo-deep-orange text-white px-4 py-3 rounded-xl font-bold text-sm"
              >
                Đăng nhập / Đăng ký
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
