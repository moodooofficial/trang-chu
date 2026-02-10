import { motion } from "framer-motion";
import GatedContent from "@/components/GatedContent";
import FloatingEmojis from "@/components/FloatingEmojis";
import { useAuth } from "@/contexts/AuthContext";
import cxVui from "@/assets/cx-vui.jpg";
import cxBuon from "@/assets/cx-buon.jpg";
import cxGian from "@/assets/cx-gian.jpg";
import cxSo from "@/assets/cx-so.jpg";
import cxNgacNhien from "@/assets/cx-ngac-nhien.jpg";
import cxYeu from "@/assets/cx-yeu.jpg";

const bookSections = [
  {
    id: "VDCX1",
    title: "Vùng Đất Cảm Xúc 1",
    color: "text-moodoo-sky",
    borderColor: "border-moodoo-sky",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    videos: [
      { url: "https://www.youtube.com/embed/jfKfPfyJRdk", title: "Tức giận" },
      { url: "https://www.youtube.com/embed/36n93jvjkDs", title: "Buồn bã" },
    ],
    resources: [
      { icon: "📘", title: "EBOOK 1", desc: "Vùng đất cảm xúc I", url: "https://heyzine.com/flip-book/ff9c4b0aca.html" },
      { icon: "📒", title: "SỔ TAY", desc: "Hướng dẫn cho ba mẹ", url: "https://heyzine.com/flip-book/21a955ab12.html" },
    ],
  },
  {
    id: "VDCX2",
    title: "Vùng Đất Cảm Xúc 2",
    color: "text-moodoo-rose",
    borderColor: "border-moodoo-rose",
    bgColor: "bg-pink-50 dark:bg-pink-950/20",
    videos: [
      { url: "https://www.youtube.com/embed/tgbNymZ7vqY", title: "Sợ hãi" },
      { url: "https://www.youtube.com/embed/jfKfPfyJRdk", title: "Yêu thương" },
    ],
    resources: [
      { icon: "📙", title: "EBOOK 2", desc: "Vùng đất cảm xúc II", url: "https://heyzine.com/flip-book/efcdb035f9.html" },
      { icon: "📒", title: "SỔ TAY", desc: "Hướng dẫn cho ba mẹ", url: "https://heyzine.com/flip-book/21a955ab12.html" },
    ],
  },
];

const emotions = [
  { name: "VUI VẺ", image: cxVui, color: "border-yellow-400", bg: "bg-yellow-50" },
  { name: "BUỒN BÃ", image: cxBuon, color: "border-blue-400", bg: "bg-blue-50" },
  { name: "TỨC GIẬN", image: cxGian, color: "border-red-400", bg: "bg-red-50" },
  { name: "SỢ HÃI", image: cxSo, color: "border-purple-400", bg: "bg-purple-50" },
  { name: "NGẠC NHIÊN", image: cxNgacNhien, color: "border-orange-400", bg: "bg-orange-50" },
  { name: "YÊU THƯƠNG", image: cxYeu, color: "border-pink-400", bg: "bg-pink-50" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Library() {
  return (
    <div>
      <div className="bg-moodoo-green text-white py-12 text-center border-t-4 border-white relative overflow-hidden">
        <FloatingEmojis variant="library" count={10} />
        <h1 className="text-4xl md:text-5xl font-display font-bold relative z-10" style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.1)" }}>
          KHO TÀI NGUYÊN
        </h1>
      </div>

      <GatedContent title="KHO BÁU DÀNH RIÊNG CHO THÀNH VIÊN"
        description="Đăng nhập hoặc nhập Mã Sách để mở khóa toàn bộ nội dung nhé!"
        buttonText="MỞ KHÓA NGAY">

        {/* Book Sections */}
        {bookSections.map((section, sIdx) => (
          <section key={sIdx} className={`${section.bgColor} py-16 relative overflow-hidden`}>
            <FloatingEmojis variant="library" count={6} />
            <div className="max-w-6xl mx-auto px-4 relative z-10">
              <div className="text-center mb-10">
                <h2 className={`text-3xl font-display font-bold ${section.color} uppercase`}>📖 {section.title}</h2>
                <p className="font-body text-muted-foreground mt-2">Cùng xem và học hỏi các cảm xúc nhé</p>
              </div>

              {/* Videos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {section.videos.map((v, i) => (
                  <motion.div key={i} className="bg-white dark:bg-card rounded-2xl p-4 shadow-lg hover:-translate-y-1 transition-transform"
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { duration: 0.5, delay: i * 0.1 } } }}>
                    <div className="relative pb-[56.25%] bg-foreground rounded-xl overflow-hidden">
                      <iframe src={v.url} allowFullScreen className="absolute inset-0 w-full h-full border-none" />
                    </div>
                    <p className="mt-4 text-center font-display font-bold">{v.title}</p>
                  </motion.div>
                ))}
              </div>

              {/* Resources */}
              <div className="flex flex-col md:flex-row justify-center gap-8">
                {section.resources.map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                    className={`block w-56 mx-auto bg-white dark:bg-card rounded-2xl p-8 border-4 ${section.borderColor} shadow-lg hover:translate-y-1 transition-all text-center hover:shadow-xl`}>
                    <span className="text-5xl block mb-3">{r.icon}</span>
                    <h3 className={`font-display font-black text-xl ${section.color}`}>{r.title}</h3>
                    <p className="font-body text-sm text-muted-foreground mt-1">{r.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Emotions */}
        <section className="bg-moodoo-cream py-16 relative overflow-hidden">
          <FloatingEmojis count={6} />
          <div className="max-w-5xl mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-moodoo-rose">6 CẢM XÚC CƠ BẢN</h2>
              <p className="font-body text-muted-foreground mt-2">Nhận diện cảm xúc cùng Moodoo</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {emotions.map((e, i) => (
                <motion.div key={i} className={`${e.bg} dark:bg-card text-center p-4 rounded-2xl border-4 ${e.color} hover:scale-105 transition-transform cursor-pointer shadow-md`}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { duration: 0.4, delay: i * 0.1 } } }}>
                  <img src={e.image} alt={e.name} className="w-32 h-32 mx-auto rounded-2xl object-cover mb-3" />
                  <h3 className="font-display font-bold text-moodoo-rose text-lg">{e.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </GatedContent>
    </div>
  );
}
