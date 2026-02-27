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
    handbookTitle: "📒 SỔ TAY",
    handbookSub: "Các hoạt động tại nhà cho gia đình",
    sections: [
      {
        title: "Vùng Đất Cảm Xúc 1",
        videos: [{ title: "Vui vẻ" }, { title: "Buồn bã" }],
      },
      {
        title: "Vùng Đất Cảm Xúc 2",
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
    handbookTitle: "📒 HANDBOOK GUIDE",
    handbookSub: "For parents and teachers",
    sections: [
      {
        title: "Emotion Land 1",
        videos: [{ title: "Anger" }, { title: "Sadness" }],
      },
      {
        title: "Emotion Land 2",
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
    ebookUrl: "https://heyzine.com/flip-book/830bf01ca2.html",
  },
  {
    id: "VDCX2",
    color: "text-moodoo-rose",
    bgColor: "bg-pink-50 dark:bg-pink-950/20",
    videos: [
      { url: "https://www.youtube.com/embed/k3vnbzhYFWY" },
      { url: "https://www.youtube.com/embed/dDvP3fGAp5Y" },
    ],
    ebookUrl: "https://heyzine.com/flip-book/c53727e68b.html",
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
        {/* Book Sections 1 & 2 */}
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
                  <div className="space-y-12">
                    {/* Videos Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {section.videos.map((v, i) => (
                        <motion.div key={i} className="bg-white dark:bg-card rounded-2xl p-4 shadow-lg"
                          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                          <div className="relative pb-[56.25%] bg-foreground rounded-xl overflow-hidden">
                            <iframe src={v.url} allowFullScreen className="absolute inset-0 w-full h-full border-none" />
                          </div>
                          <p className="mt-4 text-center font-display font-bold">{sectionTexts.videos[i].title}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Ebook Embed Row */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                      className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white max-w-4xl mx-auto">
                      <iframe 
                        allowFullScreen 
                        allow="clipboard-write" 
                        scrolling="no" 
                        className="w-full h-[400px] md:h-[500px]" 
                        src={section.ebookUrl} 
                        style={{ border: "none" }} 
                      />
                    </motion.div>
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

        {/* Handbook Section (Sổ tay - Nằm dưới VDCX 2) */}
        <section className="bg-moodoo-pink/10 py-16 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-display font-bold text-moodoo-rose uppercase">{t.handbookTitle}</h2>
              <p className="font-body text-muted-foreground mt-2">{t.handbookSub}</p>
            </div>
            {/* Sổ tay này dùng chung mã khóa ALL hoặc một trong hai vùng đất (tùy bạn chỉnh) */}
            {access !== "NONE" ? (
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
               className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
               <iframe 
                 allowFullScreen 
                 allow="clipboard-write" 
                 scrolling="no" 
                 className="w-full h-[400px] md:h-[500px]" 
                 src="https://heyzine.com/flip-book/21a955ab12.html" 
                 style={{ border: "none" }} 
               />
             </motion.div>
            ) : (
              <div className="text-center py-10 bg-white/30 rounded-3xl border-2 border-dashed border-moodoo-rose/30">
                <p className="font-display font-bold text-moodoo-rose">Vui lòng mở khóa để xem Sổ Tay Hướng Dẫn</p>
              </div>
            )}
          </div>
        </section>

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
