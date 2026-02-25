import { useEffect, useState } from "react"; // Thêm useState
import GatedContent from "@/components/GatedContent";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import FloatingEmojis from "@/components/FloatingEmojis";
import moodooMascotPeek from "@/assets/moodoo-mascot-peek.jpg";

const texts = {
  vi: {
    gateTitle: "BÍ MẬT HANG ĐỘNG",
    gateDesc: "Suỵt! Đây là nơi trú ẩn bí mật của Moodoo. Bé hãy Đăng nhập hoặc nhờ ba mẹ nhập Mã Sách để mở cửa hang và trò chuyện cùng Moodoo nhé!",
    gateBtn: "GÕ CỬA HANG",
    title: "✨ HANG ĐỘNG NHỎ ✨",
    desc: "Chào mừng bé đã đến với góc nhỏ của Moodoo!",
    desc2: "Hôm nay bé cảm thấy thế nào? Hãy bấm vào biểu tượng <strong>tin nhắn ở góc dưới màn hình</strong> để kể cho Moodoo nghe nhé. Moodoo luôn ở đây lắng nghe bé!",
    connecting: "(Đang kết nối với Moodoo AI...)",
    // Thêm nội dung overlay
    consentTitle: "XÁC NHẬN GIÁM HỘ",
    consentText: "Tôi là người giám hộ hợp pháp và đồng ý cho MOODOO lưu trữ dữ liệu cảm xúc của trẻ nhằm mục đích giáo dục.",
    consentBtn: "ĐỒNG Ý VÀ TIẾP TỤC",
  },
  en: {
    gateTitle: "SECRET CAVE",
    gateDesc: "Shh! This is Moodoo's secret hideout. Sign In or ask your parents to enter the Book Code to open the cave and chat with Moodoo!",
    gateBtn: "KNOCK ON THE CAVE",
    title: "✨ SECRET CAVE ✨",
    desc: "Welcome to Moodoo's little corner!",
    desc2: "How are you feeling today? Tap the <strong>chat icon at the bottom of the screen</strong> to tell Moodoo. Moodoo is always here to listen!",
    connecting: "(Connecting to Moodoo AI...)",
    // Thêm nội dung overlay tiếng Anh
    consentTitle: "GUARDIAN CONSENT",
    consentText: "I am the legal guardian and agree to let MOODOO store the child's emotional data for educational purposes.",
    consentBtn: "AGREE AND CONTINUE",
  },
};

export default function Cave() {
  const { isLoggedIn } = useAuth();
  const { lang } = useLanguage();
  const t = texts[lang];
  
  // Trạng thái đã đồng ý hay chưa
  const [hasConsented, setHasConsented] = useState(false);

  // Kiểm tra đã đồng ý trước đó chưa khi load trang
  useEffect(() => {
    const consent = localStorage.getItem("moodoo_cave_consent");
    if (consent === "true") {
      setHasConsented(true);
    }
  }, []);

  // Hàm xử lý khi nhấn Đồng ý
  const handleConsent = () => {
    setHasConsented(true);
    localStorage.setItem("moodoo_cave_consent", "true");
  };

  useEffect(() => {
    // Chỉ tải Chatbot khi đã đăng nhập VÀ đã đồng ý
    if (!isLoggedIn || !hasConsented) return;
    
    const loadChatbot = () => {
      if (document.getElementById("chatbase-script")) return;
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "chatbase-script";
      script.setAttribute("chatbotId", "MED01qHqLQ-uvp50rGcvT");
      script.setAttribute("domain", "www.chatbase.co");
      document.body.appendChild(script);
    };
    loadChatbot();
  }, [isLoggedIn, hasConsented]);

  return (
    <div className="relative">
      {/* Overlay xác nhận - Chỉ hiện khi đã đăng nhập nhưng chưa nhấn đồng ý */}
      {isLoggedIn && !hasConsented && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl max-w-md w-full shadow-2xl text-center border-4 border-moodoo-purple animate-in fade-in zoom-in duration-300">
            <div className="text-5xl mb-4">🛡️</div>
            <h3 className="text-2xl font-display font-bold mb-4 text-moodoo-purple uppercase">
              {t.consentTitle}
            </h3>
            <p className="font-body text-foreground mb-8 leading-relaxed text-lg">
              {t.consentText}
            </p>
            <button
              onClick={handleConsent}
              className="w-full bg-moodoo-purple hover:bg-purple-600 text-white font-display font-bold py-4 rounded-full transition-all transform hover:scale-105 shadow-lg active:scale-95"
            >
              {t.consentBtn}
            </button>
          </div>
        </div>
      )}

      <section className="min-h-[80vh] bg-moodoo-purple text-white py-20 relative overflow-hidden"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}>
        <FloatingEmojis variant="cave" count={15} />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <GatedContent variant="cave" title={t.gateTitle} description={t.gateDesc} buttonText={t.gateBtn} icon="🔒">
            <div className="text-center animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6" style={{ textShadow: "0 0 10px #e040fb" }}>
                {t.title}
              </h2>
              <p className="font-body text-lg max-w-xl mx-auto leading-relaxed mb-2 opacity-90">{t.desc}</p>
              <p className="font-body text-lg max-w-xl mx-auto leading-relaxed mb-10 opacity-90" dangerouslySetInnerHTML={{ __html: t.desc2 }} />
              <div className="animate-float">
                <img src={moodooMascotPeek} alt="Moodoo mascot" className="w-48 h-48 mx-auto rounded-full border-4 border-white shadow-[0_0_20px_white] object-contain bg-moodoo-purple" />
              </div>
              <p className="mt-8 font-body italic opacity-60">{t.connecting}</p>
            </div>
          </GatedContent>
        </div>
        <div className="absolute top-10 left-10 text-2xl animate-pulse">⭐</div>
        <div className="absolute top-20 right-20 text-lg animate-pulse delay-500">✨</div>
        <div className="absolute bottom-20 left-20 text-xl animate-pulse delay-1000">🌟</div>
        <div className="absolute bottom-10 right-10 text-2xl animate-pulse delay-300">💫</div>
      </section>
    </div>
  );
}
