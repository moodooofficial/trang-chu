import { useEffect, useState } from "react";
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
    guardianConsent: "Tôi là người giám hộ hợp pháp và đồng ý cho MOODOO lưu trữ dữ liệu cảm xúc của trẻ nhằm mục đích giáo dục",
    privacyNotice: "Dữ liệu của bạn sẽ được mã hóa đầu cuối (End-to-End) ngay từ đầu vào để bảo vệ quyền riêng tư.",
    confirmBtn: "Xác nhận",
  },
  en: {
    gateTitle: "SECRET CAVE",
    gateDesc: "Shh! This is Moodoo's secret hideout. Sign In or ask your parents to enter the Book Code to open the cave and chat with Moodoo!",
    gateBtn: "KNOCK ON THE CAVE",
    title: "✨ SECRET CAVE ✨",
    desc: "Welcome to Moodoo's little corner!",
    desc2: "How are you feeling today? Tap the <strong>chat icon at the bottom of the screen</strong> to tell Moodoo. Moodoo is always here to listen!",
    connecting: "(Connecting to Moodoo AI...)",
    guardianConsent: "I am the legal guardian and agree to let MOODOO store the child's emotional data for educational purposes",
    privacyNotice: "Your data will be end-to-end encrypted right from the input to protect privacy.",
    confirmBtn: "Confirm",
  },
};

export default function Cave() {
  const { isLoggedIn } = useAuth();
  const { lang } = useLanguage();
  const t = texts[lang];

  // State quản lý việc hiển thị overlay và checkbox
  const [hasConsented, setHasConsented] = useState(() => {
    return localStorage.getItem("moodoo_guardian_consent") === "true";
  });
  const [isChecked, setIsChecked] = useState(false);

  // Chỉ load chatbot khi ĐÃ ĐĂNG NHẬP và ĐÃ ĐỒNG Ý
  useEffect(() => {
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

  const handleConfirm = () => {
    if (isChecked) {
      setHasConsented(true);
      localStorage.setItem("moodoo_guardian_consent", "true");
    }
  };

  return (
    <div>
      {/* OVERLAY XÁC NHẬN GIÁM HỘ */}
      {isLoggedIn && !hasConsented && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl transform transition-all">
            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="relative flex items-start pt-1">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="w-6 h-6 rounded-md border-2 border-slate-300 text-moodoo-purple focus:ring-moodoo-purple transition-all cursor-pointer"
                />
              </div>
              <div className="flex-1">
                <p className="text-slate-700 font-bold text-base leading-snug mb-2">
                  {t.guardianConsent}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {t.privacyNotice}
                </p>
              </div>
            </label>
            
            <button
              onClick={handleConfirm}
              disabled={!isChecked}
              className={`mt-8 w-full py-3.5 rounded-full font-bold transition-all duration-300 ${
                isChecked 
                  ? "bg-moodoo-purple text-white shadow-lg shadow-purple-200 hover:bg-purple-600 hover:-translate-y-1" 
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              {t.confirmBtn}
            </button>
          </div>
        </div>
      )}

      {/* NỘI DUNG CHÍNH CỦA TRANG CAVE */}
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
              
              {/* Chỉ hiện dòng chữ "Đang kết nối..." nếu đã đồng ý */}
              {hasConsented ? (
                <p className="mt-8 font-body italic opacity-60">{t.connecting}</p>
              ) : (
                <p className="mt-8 font-body italic text-yellow-300">Vui lòng xác nhận quyền giám hộ để trò chuyện cùng Moodoo nhé!</p>
              )}
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
