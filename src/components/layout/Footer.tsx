import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-moodoo-orange text-white py-12 font-display">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Mascot placeholder */}
        <div className="text-6xl mb-4">🦔</div>

        <h2 className="text-4xl font-bold text-moodoo-rose tracking-widest mb-4" style={{ textShadow: "2px 2px 0 white" }}>
          MOODOO
        </h2>

        <div className="text-2xl tracking-[0.5em] mb-6">✨ ✨ ✨ ✨ ✨</div>

        <div className="border-t border-dashed border-white/50 pt-6 mt-4 flex flex-col md:flex-row justify-between items-start text-left gap-6">
          <div className="font-body">
            <p className="font-bold text-lg mb-1">MOODOO - TRUE EMOTIONS FOR YOU</p>
            <p className="opacity-90">Bộ học liệu giáo dục cảm xúc hàng đầu tại Việt Nam</p>
            <p className="mt-2">🏠 18 Lê Thúc Hoạch, Phường Phú Thọ Hòa, TP.HCM</p>
            <p>✉ moodoo.official.vn@gmail.com</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-4 font-bold">
              <Link to="/" className="hover:underline">Trang chủ</Link>
              <Link to="/gioi-thieu" className="hover:underline">Giới thiệu</Link>
              <Link to="/cua-tiem" className="hover:underline">Cửa tiệm</Link>
            </div>
            <div className="text-2xl mt-2">🔴 🔵 🟡</div>
          </div>
        </div>

        <p className="mt-6 text-sm opacity-70 font-body">© 2026 Moodoo. All rights reserved.</p>
      </div>
    </footer>
  );
}
