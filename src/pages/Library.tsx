import { motion } from "framer-motion";
import GatedContent from "@/components/GatedContent";
import FloatingEmojis from "@/components/FloatingEmojis";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import cxVui from "@/assets/cx-vui.jpg";
import cxBuon from "@/assets/cx-buon.jpg";
import cxGian from "@/assets/cx-gian.jpg";
import cxSo from "@/assets/cx-so.jpg";
import cxNgacNhien from "@/assets/cx-ngac-nhien.jpg";
import cxYeu from "@/assets/cx-yeu.jpg";

const texts = {
  vi: {
    title: "KHO TÀI NGUYÊN",
    gateTitle: "KHO BÁU DÀNH RIÊNG CHO THÀNH VIÊN",
    gateDesc: "Đăng nhập hoặc nhập Mã Sách để mở khóa toàn bộ nội dung nhé!",
    gateBtn: "MỞ KHÓA NGAY",
    seeAndLearn: "Cùng xem và học hỏi các cảm xúc nhé",
    locked: "Bạn chưa mở khoá nội dung này",
    lockedTitle: "Nội dung bị khoá",
    lockedDesc: "Bạn cần mã sách tương ứng để mở khoá",
    emotionsTitle: "6 CẢM XÚC CƠ BẢN",
    emotionsSub: "Nhận diện cảm xúc cùng Moodoo",
    sections: [
      {
        title: "Vùng Đất Cảm Xúc 1",
        ebookLabel: "Ebook 1",
        handbookLabel: "Sổ Tay 1",
        videos: [{ title: "Vui vẻ" }, { title: "Buồn bã" }],
      },
      {
        title: "Vùng Đất Cảm Xúc 2",
        ebookLabel: "Ebook 2",
        handbookLabel: "Sổ Tay 2",
        videos: [{ title: "Sợ hãi" }, { title: "Yêu thương" }],
      },
    ],
    emotions: ["VUI VẺ", "BUỒN BÃ", "TỨC GIẬN", "SỢ HÃI", "NGẠC NHIÊN", "YÊU THƯƠNG"],
  },
  en: {
    title: "RESOURCE CENTER",
    gateTitle: "EXCLUSIVE CONTENT FOR MEMBERS",
    gateDesc: "Sign in or enter your Book Code to unlock all content!",
    gateBtn: "UNLOCK NOW",
    seeAndLearn: "Let's watch and learn about emotions",
    locked: "You haven't unlocked this content yet",
    lockedTitle: "Content Locked",
    lockedDesc: "You need the corresponding book code to unlock",
    emotionsTitle: "6 BASIC EMOTIONS",
    emotionsSub: "Recognize emotions with Moodoo",
    sections: [
      {
        title: "Emotion Land 1",
        ebookLabel: "Ebook 1",
        handbookLabel: "Handbook 1",
        videos: [{ title: "Happiness" }, { title: "Sadness" }],
      },
      {
        title: "Emotion Land 2",
        ebookLabel: "Ebook 2",
        handbookLabel: "Handbook 2",
        videos: [{ title: "Fear" }, { title: "Love" }],
      },
    ],
    emotions: ["HAPPY", "SAD", "ANGRY", "SCARED", "SURPRISED", "LOVING"],
  },
};

const bookSections = [
  {
    id: "VDCX1",
    color: "text-moodoo-sky",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    videos: [
      { url: "https://www.youtube.com/embed/BtqKesUhIt8" },
      { url: "https://www.youtube.com/embed/_i8X60hjnqs" },
    ],
    ebookUrl: "/ebook-moodoo-1/index.html",
    handbookUrl: "/handbook-1/index.html", // Đảm bảo bạn có folder này trong public
  },
  {
    id: "VDCX2",
    color: "text-moodoo-rose",
    bgColor: "bg-pink-50 dark:bg-pink-950/20",
    videos: [
      { url: "https://www.youtube.com/embed/k3vnbzhYFWY" },
      { url: "https://www.youtube.com/embed/dDvP3fGAp5Y" },
    ],
    ebookUrl: "/ebook-moodoo-2/index.html",
    handbookUrl: "/handbook-2/index.html", // Đảm bảo bạn có folder này trong public
  },
];

const emotionImages = [cxVui, cxBuon, cxGian, cxSo, cxNgacNhien, cxYeu];
const emotionColors = ["border-yellow-400", "border-blue-400", "border-red-400", "border-purple-400", "border-orange-400", "border-pink-400"];
const emotionBgs = ["bg-yellow-50", "bg-blue-50", "bg-red-50", "bg-purple-50", "bg-orange-50", "bg-pink-50"];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Library() {
  const { access } = useAuth();
  const { lang } = useLanguage();
  const t = texts[lang];

  const canAccessSection = (sectionId: string) => access === "ALL" || access === sectionId;

  return (
    <div>
      <div className="bg-moodoo-green text-white py-12 text-center border-t-4 border-white relative overflow-hidden">
        <FloatingEmojis variant="library" count={10} />
        <h1 className="text-4xl md:text-5xl font-display font-bold relative z-10" style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.1)" }}>
          {t.title}
        </h1>
      </div>

      <GatedContent title={t.gateTitle} description={t.gateDesc} buttonText={t.gateBtn}>
        {bookSections.map((section, sIdx) => {
          const unlocked = canAccessSection(section.id);
          const sectionTexts = t.sections[sIdx];
          return (
            <section key={sIdx} className={`${section.bgColor} py-16 relative overflow-hidden border-b border-white/20`}>
              <FloatingEmojis variant="library" count={6} />
              <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="text-center mb-10">
                  <h2 className={`text-3xl font-display font-bold ${section.color} uppercase`}>
                    {unlocked ? "📖" : "🔒"} {sectionTexts.title}
                  </h2>
                  <p className="font-body text-muted-foreground mt-2">
                    {unlocked ? t.seeAndLearn : t.locked}
                  </p>
                </div>

                {unlocked ? (
                  <div className="space-y-16">
                    {/* Videos Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {section.videos.map((v, i) => (
                        <motion.div key={i} className="bg-white dark:bg-card rounded-2xl p-4 shadow-lg"
                          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                          <div className="relative pb-[56.25%] bg-foreground rounded-xl overflow-hidden">
                            <iframe src={v.url} allowFullScreen className="absolute inset-0 w-full h-full border-none" />
                          </div>
                          <p className="mt-4 text-center font-display font-bold uppercase tracking-wide">{sectionTexts.videos[i].title}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Ebooks & Handbooks Grid - Square Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                      {/* Left Column: Ebook */}
                      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex flex-col items-center">
                        <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                          <iframe 
                            allowFullScreen 
                            allow="clipboard-write" 
                            scrolling="no" 
                            className="w-full h-full" 
                            src={section.ebookUrl} 
                            style={{ border: "none" }} 
                          />
                        </div>
                        <p className={`mt-4 font-display font-bold text-xl ${section.color}`}>{sectionTexts.ebookLabel}</p>
                      </motion.div>

                      {/* Right Column: Handbook */}
                      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex flex-col items-center">
                        <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                          <iframe 
                            allowFullScreen 
                            allow="clipboard-write" 
                            scrolling="no" 
                            className="w-full h-full" 
                            src={section.handbookUrl} 
                            style={{ border: "none" }} 
                          />
                        </div>
                        <p className={`mt-4 font-display font-bold text-xl ${section.color}`}>{sectionTexts.handbookLabel}</p>
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 bg-white/50 rounded-3xl backdrop-blur-sm max-w-2xl mx-auto border-2 border-dashed border-gray-300">
                    <div className="text-6xl mb-4">🔐</div>
                    <p className="font-display font-bold text-lg text-foreground mb-2">{t.lockedTitle}</p>
                    <p className="font-body text-muted-foreground mb-4">{t.lockedDesc} {sectionTexts.title}</p>
                  </div>
                )}
              </div>
            </section>
          );
        })}

        {/* Emotions Section */}
        <section className="bg-moodoo-cream py-16 relative overflow-hidden">
          <FloatingEmojis count={6} />
          <div className="max-w-5xl mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-moodoo-rose">{t.emotionsTitle}</h2>
              <p className="font-body text-muted-foreground mt-2">{t.emotionsSub}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {t.emotions.map((name, i) => (
                <motion.div key={i} className={`${emotionBgs[i]} dark:bg-card text-center p-4 rounded-2xl border-4 ${emotionColors[i]} hover:scale-105 transition-transform cursor-pointer shadow-md`}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { duration: 0.4, delay: i * 0.1 } } }}>
                  <img src={emotionImages[i]} alt={name} className="w-32 h-32 mx-auto rounded-2xl object-cover mb-3" />
                  <h3 className="font-display font-bold text-moodoo-rose text-lg">{name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </GatedContent>
    </div>
  );
}
