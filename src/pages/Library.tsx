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
    demoTitle: "📖 DEMO MOODOO",
    sections: [
      {
        title: "Vùng Đất Cảm Xúc 1",
        videos: [
          { title: "Tức giận" },
          { title: "Buồn bã" },
        ],
        resources: [
          { icon: "📘", title: "EBOOK 1", desc: "Vùng đất cảm xúc I" },
          { icon: "📒", title: "SỔ TAY", desc: "Hướng dẫn cho ba mẹ" },
        ],
      },
      {
        title: "Vùng Đất Cảm Xúc 2",
        videos: [
          { title: "Sợ hãi" },
          { title: "Yêu thương" },
        ],
        resources: [
          { icon: "📙", title: "EBOOK 2", desc: "Vùng đất cảm xúc II" },
          { icon: "📒", title: "SỔ TAY", desc: "Hướng dẫn cho ba mẹ" },
        ],
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
    demoTitle: "📖 MOODOO DEMO",
    sections: [
      {
        title: "Emotion Land 1",
        videos: [
          { title: "Anger" },
          { title: "Sadness" },
        ],
        resources: [
          { icon: "📘", title: "EBOOK 1", desc: "Emotion Land I" },
          { icon: "📒", title: "NOTEBOOK", desc: "Guide for parents" },
        ],
      },
      {
        title: "Emotion Land 2",
        videos: [
          { title: "Fear" },
          { title: "Love" },
        ],
        resources: [
          { icon: "📙", title: "EBOOK 2", desc: "Emotion Land II" },
          { icon: "📒", title: "NOTEBOOK", desc: "Guide for parents" },
        ],
      },
    ],
    emotions: ["HAPPY", "SAD", "ANGRY", "SCARED", "SURPRISED", "LOVING"],
  },
};

const bookSections = [
  {
    id: "VDCX1",
    color: "text-moodoo-sky",
    borderColor: "border-moodoo-sky",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    videos: [
      { url: "https://www.youtube.com/embed/jfKfPfyJRdk" },
      { url: "https://www.youtube.com/embed/36n93jvjkDs" },
    ],
    resources: [
      { url: "https://heyzine.com/flip-book/830bf01ca2.html" },
      { url: "https://heyzine.com/flip-book/21a955ab12.html" },
    ],
  },
  {
    id: "VDCX2",
    color: "text-moodoo-rose",
    borderColor: "border-moodoo-rose",
    bgColor: "bg-pink-50 dark:bg-pink-950/20",
    videos: [
      { url: "https://www.youtube.com/embed/tgbNymZ7vqY" },
      { url: "https://www.youtube.com/embed/jfKfPfyJRdk" },
    ],
    resources: [
      { url: "https://heyzine.com/flip-book/c53727e68b.html" },
      { url: "https://heyzine.com/flip-book/21a955ab12.html" },
    ],
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
        {/* Demo MOODOO */}
        <section className="bg-moodoo-cream py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-center text-2xl md:text-3xl font-display font-bold text-moodoo-orange uppercase mb-8">{t.demoTitle}</h2>
            <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-moodoo-cream">
              <iframe allowFullScreen allow="clipboard-write" scrolling="no" className="w-full h-[400px]"
                src="https://heyzine.com/flip-book/03405680f3.html" style={{ border: "1px solid lightgray" }} />
            </div>
          </div>
        </section>

        {/* Book Sections */}
        {bookSections.map((section, sIdx) => {
          const unlocked = canAccessSection(section.id);
          const sectionTexts = t.sections[sIdx];
          return (
            <section key={sIdx} className={`${section.bgColor} py-16 relative overflow-hidden`}>
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
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                      {section.videos.map((v, i) => (
                        <motion.div key={i} className="bg-white dark:bg-card rounded-2xl p-4 shadow-lg hover:-translate-y-1 transition-transform"
                          initial="hidden" whileInView="visible" viewport={{ once: true }}
                          variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { duration: 0.5, delay: i * 0.1 } } }}>
                          <div className="relative pb-[56.25%] bg-foreground rounded-xl overflow-hidden">
                            <iframe src={v.url} allowFullScreen className="absolute inset-0 w-full h-full border-none" />
                          </div>
                          <p className="mt-4 text-center font-display font-bold">{sectionTexts.videos[i].title}</p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex flex-col md:flex-row justify-center gap-8">
                      {section.resources.map((r, i) => (
                        <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                          className={`block w-56 mx-auto bg-white dark:bg-card rounded-2xl p-8 border-4 ${section.borderColor} shadow-lg hover:translate-y-1 transition-all text-center hover:shadow-xl`}>
                          <span className="text-5xl block mb-3">{sectionTexts.resources[i].icon}</span>
                          <h3 className={`font-display font-black text-xl ${section.color}`}>{sectionTexts.resources[i].title}</h3>
                          <p className="font-body text-sm text-muted-foreground mt-1">{sectionTexts.resources[i].desc}</p>
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-10">
                    <div className="text-6xl mb-4">🔐</div>
                    <p className="font-display font-bold text-lg text-foreground mb-2">{t.lockedTitle}</p>
                    <p className="font-body text-muted-foreground mb-4">{t.lockedDesc} {sectionTexts.title}</p>
                  </div>
                )}
              </div>
            </section>
          );
        })}

        {/* Emotions */}
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
