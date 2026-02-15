import { motion } from "framer-motion";
import FloatingEmojis from "@/components/FloatingEmojis";
import { useLanguage } from "@/contexts/LanguageContext";
import moodooMascot from "@/assets/moodoo-mascot.jpg";
import caselImg from "@/assets/casel.jpg";
import aboutValueImg from "@/assets/about-value.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const texts = {
  vi: {
    pageTitle: "VỀ CHÚNG MÌNH",
    quote: "✨ Hiểu cảm xúc - Làm chủ hành vi - Sống tích cực ✨",
    sections: [
      {
        title: "Chúng mình là",
        titleHighlight: "MOODOO!",
        paragraphs: [
          "Moodoo là một dự án giáo dục cảm xúc được khởi xướng bởi nhóm học sinh với mong muốn đồng hành cùng trẻ em Việt Nam trong hành trình thấu hiểu và nuôi dưỡng thế giới cảm xúc bên trong.",
          "Xuất phát từ những trăn trở về thực trạng trẻ em ngày nay gặp nhiều khó khăn trong việc nhận diện, thể hiện và điều tiết cảm xúc, nhóm đã dành thời gian nghiên cứu, thử nghiệm và phát triển MOODOO như một công cụ học tập cảm xúc gần gũi, dễ tiếp cận và phù hợp với trẻ nhỏ.",
        ],
      },
      {
        title: "Phương pháp",
        titleHighlight: "CASEL",
        paragraphs: [
          "MOODOO được xây dựng dựa trên khung năng lực Giáo dục Cảm xúc – Xã hội (SEL) của CASEL, tập trung vào 6 cảm xúc cơ bản của trẻ: vui vẻ, buồn bã, tức giận, sợ hãi, yêu thương và ngạc nhiên.",
          "Dự án kết hợp giữa sách tương tác, hoạt động đa giác quan, trò chơi trải nghiệm và trợ lý ảo, giúp trẻ học cảm xúc không qua lý thuyết khô khan mà thông qua chơi, kể chuyện và đối thoại.",
        ],
      },
      {
        title: "Giá trị mang lại",
        titleHighlight: "",
        paragraphs: [
          "Thông qua mỗi trang sách, mỗi thẻ trò chơi và mỗi cuộc trò chuyện cùng MOODOO, trẻ được khuyến khích gọi tên và thấu hiểu cảm xúc của mình, từ đó thể hiện chúng một cách an toàn, tích cực.",
          "MOODOO không chỉ là một bộ sách hay một sản phẩm giáo dục, mà là tâm huyết của những người trẻ mong muốn góp phần xây dựng nền tảng tinh thần vững chắc cho thế hệ tương lai. Chúng mình tin rằng, khi trẻ được hiểu và tôn trọng cảm xúc ngay từ sớm, các em sẽ lớn lên với sự tự tin, khả năng thấu cảm và kết nối tích cực với bản thân, gia đình và cộng đồng.",
        ],
      },
    ],
  },
  en: {
    pageTitle: "ABOUT US",
    quote: "✨ Understand Emotions - Master Behavior - Live Positively ✨",
    sections: [
      {
        title: "We are",
        titleHighlight: "MOODOO!",
        paragraphs: [
          "Moodoo is an emotional education project initiated by a group of students who wish to accompany Vietnamese children on their journey of understanding and nurturing their inner emotional world.",
          "Driven by concerns about how children today face many difficulties in recognizing, expressing, and regulating emotions, the team has spent time researching, experimenting, and developing MOODOO as an accessible, friendly, and age-appropriate emotional learning tool.",
        ],
      },
      {
        title: "Method",
        titleHighlight: "CASEL",
        paragraphs: [
          "MOODOO is built on CASEL's Social-Emotional Learning (SEL) framework, focusing on 6 basic emotions of children: happiness, sadness, anger, fear, love, and surprise.",
          "The project combines interactive books, multi-sensory activities, experiential games, and a virtual assistant, helping children learn about emotions not through dry theory but through play, storytelling, and dialogue.",
        ],
      },
      {
        title: "Our Values",
        titleHighlight: "",
        paragraphs: [
          "Through every page, every game card, and every conversation with MOODOO, children are encouraged to name and understand their emotions, thereby expressing them safely and positively.",
          "MOODOO is not just a book set or an educational product — it's the passion of young people who want to contribute to building a strong mental foundation for future generations. We believe that when children are understood and have their emotions respected early on, they will grow up with confidence, empathy, and positive connections with themselves, their families, and their communities.",
        ],
      },
    ],
  },
};

const sectionStyles = [
  { bg: "bg-background", titleColor: "text-moodoo-green", highlightColor: "text-moodoo-rose", reverse: false },
  { bg: "bg-moodoo-cream", titleColor: "text-moodoo-orange", highlightColor: "text-moodoo-sky", reverse: true },
  { bg: "bg-blue-50 dark:bg-blue-950/20", titleColor: "text-moodoo-sky", highlightColor: "", reverse: false },
];

const sectionImages = [moodooMascot, caselImg, aboutValueImg];

export default function About() {
  const { lang } = useLanguage();
  const t = texts[lang];

  return (
    <div>
      <div className="bg-moodoo-sky text-white py-12 text-center border-t-4 border-white relative overflow-hidden">
        <FloatingEmojis variant="default" count={8} />
        <h1 className="text-4xl md:text-5xl font-display font-bold relative z-10" style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.1)" }}>
          {t.pageTitle}
        </h1>
      </div>

      {t.sections.map((s, i) => (
        <section key={i} className={`${sectionStyles[i].bg} py-20 relative overflow-hidden`}>
          {i === 0 && <FloatingEmojis count={6} />}
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <motion.div
              className={`flex flex-col ${sectionStyles[i].reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-16`}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            >
              <div className="md:flex-[1.5]">
                <h2 className={`text-3xl md:text-4xl font-display font-black mb-6 ${sectionStyles[i].titleColor}`}>
                  {s.title} {s.titleHighlight && <span className={sectionStyles[i].highlightColor}>{s.titleHighlight}</span>}
                </h2>
                {s.paragraphs.map((p, j) => (
                  <p key={j} className="font-body text-lg leading-relaxed text-muted-foreground mb-4 text-justify">{p}</p>
                ))}
              </div>
              <div className="md:flex-1 flex justify-center">
                <img src={sectionImages[i]} alt={s.title} className="w-64 h-64 object-contain rounded-3xl shadow-xl hover:scale-105 transition-transform duration-500" />
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      <section className="bg-gradient-to-r from-moodoo-yellow via-moodoo-orange to-moodoo-rose py-12 relative overflow-hidden">
        <FloatingEmojis count={6} />
        <motion.div className="text-center relative z-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <p className="text-2xl md:text-4xl font-display font-extrabold text-white" style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.15)" }}>
            {t.quote}
          </p>
        </motion.div>
      </section>
    </div>
  );
}
