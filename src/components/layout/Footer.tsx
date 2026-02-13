import { Link } from "react-router-dom";
import MoodooLogo from "@/components/MoodooLogo";

export default function Footer() {
  return (
    <footer className="bg-moodoo-orange dark:bg-card text-white dark:text-foreground py-12 font-display relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-moodoo-rose via-moodoo-yellow to-moodoo-green" />

      <div className="max-w-6xl mx-auto px-4">
        {/* Center: Logo + Social */}
        <div className="text-center mb-8">
          <MoodooLogo size="md" className="justify-center mb-2" />
          <p className="font-bold text-lg mb-4 opacity-90">TRUE EMOTIONS FOR YOU</p>

          {/* Social Media - 3 only */}
          <div className="flex justify-center gap-4 mb-4">
            <a href="https://www.facebook.com/Facebook" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 bg-white/20 dark:bg-white/10 rounded-full flex items-center justify-center hover:bg-white/40 hover:scale-110 transition-all text-xl">
              📘
            </a>
            <a href="https://www.tiktok.com/@moodooofficial" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 bg-white/20 dark:bg-white/10 rounded-full flex items-center justify-center hover:bg-white/40 hover:scale-110 transition-all text-xl">
              🎵
            </a>
            <a href="https://youtube.com/@Moodoo-36" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 bg-white/20 dark:bg-white/10 rounded-full flex items-center justify-center hover:bg-white/40 hover:scale-110 transition-all text-xl">
              ▶️
            </a>
          </div>
        </div>

        <div className="border-t border-dashed border-white/40 dark:border-border pt-6 flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Left: Contact */}
          <div className="font-body text-sm flex-shrink-0">
            <p className="font-bold text-lg mb-3">📍 Liên hệ</p>
            <p className="opacity-90">Bộ học liệu giáo dục cảm xúc hàng đầu tại Việt Nam</p>
            <p className="mt-2 opacity-90">🏠 18 Lê Thúc Hoạch, P. Phú Thọ Hòa, TP.HCM</p>
            <p className="opacity-90">✉️ moodoo.official.vn@gmail.com</p>
          </div>

          {/* Right: Quick Links */}
          <div className="font-body md:text-right flex-1">
            <p className="font-bold text-lg mb-3">🔗 Liên kết nhanh</p>
            <div className="flex flex-col gap-2 text-sm md:items-end">
              <Link to="/" className="hover:underline hover:translate-x-1 transition-transform inline-block opacity-90">🏠 Trang chủ</Link>
              <Link to="/gioi-thieu" className="hover:underline hover:translate-x-1 transition-transform inline-block opacity-90">💡 Giới thiệu</Link>
              <Link to="/thu-vien" className="hover:underline hover:translate-x-1 transition-transform inline-block opacity-90">📚 Thư viện</Link>
              <Link to="/cua-tiem" className="hover:underline hover:translate-x-1 transition-transform inline-block opacity-90">🛍️ Cửa tiệm</Link>
              <Link to="/hang-dong-nho" className="hover:underline hover:translate-x-1 transition-transform inline-block opacity-90">🕳️ Hang động nhỏ</Link>
              <Link to="/blog" className="hover:underline hover:translate-x-1 transition-transform inline-block opacity-90">📝 Blog</Link>
              <a href="https://moodoo-school.vercel.app/?zarsrc=410&utm_source=zalo&utm_medium=zalo&utm_campaign=zalo" target="_blank" rel="noopener noreferrer" className="hover:underline hover:translate-x-1 transition-transform inline-block opacity-90">📱 App</a>
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm opacity-60 font-body text-center">© 2026 Moodoo. All rights reserved. Made with 💖 for kids.</p>
      </div>
    </footer>
  );
}
