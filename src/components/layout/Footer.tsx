import MoodooLogo from "@/components/MoodooLogo";
import { useLanguage } from "@/contexts/LanguageContext";

const texts = {
  vi: {
    tagline: "Đồng hành cùng trẻ trong hành trình khám phá và nuôi dưỡng cảm xúc.",
    products: "Sản phẩm",
    book1: "Vùng Đất Cảm Xúc I",
    book2: "Vùng Đất Cảm Xúc II",
    cards: "Bộ Pack Cards",
    combos: "Combo tiết kiệm",
    aboutUs: "Về chúng mình",
    intro: "Giới thiệu",
    team: "Đội ngũ",
    blog: "Blog",
    app: "Ứng dụng",
    contact: "Liên hệ",
    address: "18 Lê Thúc Hoạch, P. Phú Thọ Hòa, TP.HCM",
    copyright: "© 2026 Moodoo. Tất cả quyền được bảo lưu.",
  },
  en: {
    tagline: "Accompanying children on the journey of exploring and nurturing emotions.",
    products: "Products",
    book1: "Emotion Land I",
    book2: "Emotion Land II",
    cards: "Pack Cards",
    combos: "Value Combos",
    aboutUs: "About Us",
    intro: "Introduction",
    team: "Our Team",
    blog: "Blog",
    app: "Application",
    contact: "Contact",
    address: "18 Lê Thúc Hoạch, Phú Thọ Hòa Ward, HCMC",
    copyright: "© 2026 Moodoo. All rights reserved.",
  },
};

export default function Footer() {
  const { lang } = useLanguage();
  const t = texts[lang];

  return (
    <footer className="bg-moodoo-orange text-white py-12 font-body">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Logo + tagline */}
          <div>
            <MoodooLogo size="md" className="mb-3" />
            <p className="text-sm leading-relaxed opacity-80">{t.tagline}</p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">{t.products}</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="/cua-tiem" className="hover:opacity-100 hover:underline transition-opacity">{t.book1}</a></li>
              <li><a href="/cua-tiem" className="hover:opacity-100 hover:underline transition-opacity">{t.book2}</a></li>
              <li><a href="/cua-tiem" className="hover:opacity-100 hover:underline transition-opacity">{t.cards}</a></li>
              <li><a href="/cua-tiem" className="hover:opacity-100 hover:underline transition-opacity">{t.combos}</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">{t.aboutUs}</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="/gioi-thieu" className="hover:opacity-100 hover:underline transition-opacity">{t.intro}</a></li>
              <li><a href="/gioi-thieu" className="hover:opacity-100 hover:underline transition-opacity">{t.team}</a></li>
              <li><a href="/blog" className="hover:opacity-100 hover:underline transition-opacity">{t.blog}</a></li>
              <li><span className="opacity-50 cursor-not-allowed">{t.app} 🔒</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">{t.contact}</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li className="flex items-start gap-2">📍 {t.address}</li>
              <li className="flex items-start gap-2">✉️ moodoo.official.vn@gmail.com</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="https://www.facebook.com/Facebook" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/25 transition-all text-lg">📘</a>
              <a href="https://www.tiktok.com/@moodooofficial" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/25 transition-all text-lg">🎵</a>
              <a href="https://youtube.com/@Moodoo-36" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/25 transition-all text-lg">▶️</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 text-center">
          <p className="text-sm opacity-50">{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
