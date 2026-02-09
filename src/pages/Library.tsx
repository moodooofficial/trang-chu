import { motion } from "framer-motion";
import GatedContent from "@/components/GatedContent";

const videos = [
  { url: "https://www.youtube.com/embed/jfKfPfyJRdk", title: "🎵 Bài hát: Cảm xúc của bé" },
  { url: "https://www.youtube.com/embed/36n93jvjkDs", title: "📖 Kể chuyện: Moodoo đi lạc" },
  { url: "https://www.youtube.com/embed/tgbNymZ7vqY", title: "💃 Nhảy cùng Moodoo" },
  { url: "https://www.youtube.com/embed/jfKfPfyJRdk", title: "🎉 Moodoo và những người bạn" },
];

const emotions = [
  { name: "VUI VẺ", emoji: "😄", color: "border-yellow-400" },
  { name: "BUỒN BÃ", emoji: "😢", color: "border-blue-400" },
  { name: "TỨC GIẬN", emoji: "😡", color: "border-red-400" },
  { name: "SỢ HÃI", emoji: "😨", color: "border-purple-400" },
  { name: "NGẠC NHIÊN", emoji: "😲", color: "border-green-400" },
  { name: "YÊU THƯƠNG", emoji: "🥰", color: "border-pink-400" },
];

const ebooks = [
  { icon: "📘", title: "EBOOK 1", desc: "Vùng đất cảm xúc I", url: "https://heyzine.com/flip-book/ff9c4b0aca.html" },
  { icon: "📙", title: "EBOOK 2", desc: "Vùng đất cảm xúc II", url: "https://heyzine.com/flip-book/efcdb035f9.html" },
  { icon: "📒", title: "SỔ TAY", desc: "Hướng dẫn cho ba mẹ", url: "https://heyzine.com/flip-book/21a955ab12.html" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Library() {
  return (
    <div>
      {/* Title Bar */}
      <div className="bg-moodoo-green text-white py-12 text-center border-t-4 border-white">
        <h1 className="text-4xl md:text-5xl font-display font-bold" style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.1)" }}>
          KHO TÀI NGUYÊN
        </h1>
      </div>

      <GatedContent
        title="KHO BÁU DÀNH RIÊNG CHO THÀNH VIÊN"
        description="Đăng nhập hoặc nhập Mã Sách để mở khóa toàn bộ nội dung nhé!"
        buttonText="MỞ KHÓA NGAY"
      >
        {/* Videos */}
        <section className="bg-blue-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-moodoo-sky uppercase">🎬 Góc Video Moodoo</h2>
              <p className="font-body text-muted-foreground mt-2">Cùng xem và nhảy múa với Moodoo nào!</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videos.map((v, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-2xl p-4 shadow-lg hover:-translate-y-1 transition-transform"
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { duration: 0.5, delay: i * 0.1 } } }}
                >
                  <div className="relative pb-[56.25%] bg-foreground rounded-xl overflow-hidden">
                    <iframe src={v.url} allowFullScreen className="absolute inset-0 w-full h-full border-none" />
                  </div>
                  <p className="mt-4 text-center font-display font-bold">{v.title}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Emotions */}
        <section className="bg-moodoo-cream py-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-moodoo-rose">6 CẢM XÚC CƠ BẢN</h2>
              <p className="font-body text-muted-foreground mt-2">Nhận diện cảm xúc cùng Moodoo</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {emotions.map((e, i) => (
                <motion.div
                  key={i}
                  className={`bg-white text-center p-6 rounded-2xl border-4 ${e.color} hover:scale-105 transition-transform cursor-pointer`}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { duration: 0.4, delay: i * 0.1 } } }}
                >
                  <div className="text-6xl mb-3">{e.emoji}</div>
                  <h3 className="font-display font-bold text-moodoo-rose text-lg">{e.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Ebooks */}
        <section className="bg-pink-50 py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-display font-bold text-moodoo-orange mb-2">TÀI LIỆU</h2>
            <p className="font-body text-muted-foreground mb-10">Nhấn vào bên dưới để mở sách nhé!</p>
            <div className="flex flex-col md:flex-row justify-center gap-10">
              {ebooks.map((eb, i) => (
                <a
                  key={i}
                  href={eb.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-56 mx-auto bg-white rounded-2xl p-8 border-2 border-moodoo-rose shadow-[0_8px_0_hsl(var(--moodoo-rose))] hover:translate-y-1 hover:shadow-[0_4px_0_hsl(var(--moodoo-rose))] transition-all text-center"
                >
                  <span className="text-5xl block mb-3">{eb.icon}</span>
                  <h3 className="font-display font-black text-moodoo-rose text-xl">{eb.title}</h3>
                  <p className="font-body text-sm text-muted-foreground mt-1">{eb.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </GatedContent>
    </div>
  );
}
