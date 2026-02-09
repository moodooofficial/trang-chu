import { useEffect } from "react";
import GatedContent from "@/components/GatedContent";
import { useAuth } from "@/contexts/AuthContext";
import FloatingEmojis from "@/components/FloatingEmojis";
import moodooMascotPeek from "@/assets/moodoo-mascot-peek.jpg";

export default function Cave() {
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) return;
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
  }, [isLoggedIn]);

  return (
    <div>
      <section className="min-h-[80vh] bg-moodoo-purple text-white py-20 relative overflow-hidden"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}>
        <FloatingEmojis variant="cave" count={15} />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <GatedContent variant="cave" title="BÍ MẬT HANG ĐỘNG"
            description="Suỵt! Đây là nơi trú ẩn bí mật của Moodoo. Bé hãy Đăng nhập hoặc nhờ ba mẹ nhập Mã Sách để mở cửa hang và trò chuyện cùng Moodoo nhé!"
            buttonText="GÕ CỬA HANG" icon="🔒">
            <div className="text-center animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6" style={{ textShadow: "0 0 10px #e040fb" }}>
                ✨ HANG ĐỘNG NHỎ ✨
              </h2>
              <p className="font-body text-lg max-w-xl mx-auto leading-relaxed mb-10 opacity-90">
                Chào mừng bé đã đến với góc nhỏ của Moodoo! <br />
                Hôm nay bé cảm thấy thế nào? Hãy bấm vào biểu tượng <strong>tin nhắn ở góc dưới màn hình</strong> để kể cho Moodoo nghe nhé. Moodoo luôn ở đây lắng nghe bé!
              </p>
              <div className="animate-float">
                <img src={moodooMascotPeek} alt="Moodoo mascot" className="w-48 h-48 mx-auto rounded-full border-4 border-white shadow-[0_0_20px_white] object-contain bg-moodoo-purple" />
              </div>
              <p className="mt-8 font-body italic opacity-60">(Đang kết nối với Moodoo AI...)</p>
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
