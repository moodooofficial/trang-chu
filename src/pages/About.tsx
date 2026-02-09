import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const sections = [
  {
    bg: "bg-background",
    title: "Chúng mình là",
    titleHighlight: "MOODOO!",
    titleColor: "text-moodoo-green",
    highlightColor: "text-moodoo-rose",
    paragraphs: [
      "Moodoo là một dự án giáo dục cảm xúc được khởi xướng bởi nhóm học sinh với mong muốn đồng hành cùng trẻ em Việt Nam trong hành trình thấu hiểu và nuôi dưỡng thế giới cảm xúc bên trong.",
      "Xuất phát từ những trăn trở về thực trạng trẻ em ngày nay gặp nhiều khó khăn trong việc nhận diện, thể hiện và điều tiết cảm xúc, nhóm đã dành thời gian nghiên cứu, thử nghiệm và phát triển MOODOO như một công cụ học tập cảm xúc gần gũi, dễ tiếp cận và phù hợp với trẻ nhỏ.",
    ],
    emoji: "🦔",
    reverse: false,
  },
  {
    bg: "bg-moodoo-cream",
    title: "Phương pháp",
    titleHighlight: "CASEL",
    titleColor: "text-moodoo-orange",
    highlightColor: "text-moodoo-sky",
    paragraphs: [
      "MOODOO được xây dựng dựa trên khung năng lực Giáo dục Cảm xúc – Xã hội (SEL) của CASEL, tập trung vào 6 cảm xúc cơ bản của trẻ: vui vẻ, buồn bã, tức giận, sợ hãi, yêu thương và ngạc nhiên.",
      "Dự án kết hợp giữa sách tương tác, hoạt động đa giác quan, trò chơi trải nghiệm và trợ lý ảo, giúp trẻ học cảm xúc không qua lý thuyết khô khan mà thông qua chơi, kể chuyện và đối thoại.",
    ],
    emoji: "📚",
    reverse: true,
  },
  {
    bg: "bg-blue-50",
    title: "Giá trị mang lại",
    titleHighlight: "",
    titleColor: "text-moodoo-sky",
    highlightColor: "",
    paragraphs: [
      "Thông qua mỗi trang sách, mỗi thẻ trò chơi và mỗi cuộc trò chuyện cùng MOODOO, trẻ được khuyến khích gọi tên và thấu hiểu cảm xúc của mình, từ đó thể hiện chúng một cách an toàn, tích cực.",
      "MOODOO không chỉ là một bộ sách hay một sản phẩm giáo dục, mà là tâm huyết của những người trẻ mong muốn góp phần xây dựng nền tảng tinh thần vững chắc cho thế hệ tương lai. Chúng mình tin rằng, khi trẻ được hiểu và tôn trọng cảm xúc ngay từ sớm, các em sẽ lớn lên với sự tự tin, khả năng thấu cảm và kết nối tích cực với bản thân, gia đình và cộng đồng.",
    ],
    emoji: "💖",
    reverse: false,
  },
];

export default function About() {
  return (
    <div>
      {/* Title Bar */}
      <div className="bg-moodoo-sky text-white py-12 text-center border-t-4 border-white">
        <h1 className="text-4xl md:text-5xl font-display font-bold" style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.1)" }}>
          VỀ CHÚNG MÌNH
        </h1>
      </div>

      {/* Content Sections */}
      {sections.map((s, i) => (
        <section key={i} className={`${s.bg} py-20`}>
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              className={`flex flex-col ${s.reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-16`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="md:flex-[1.5]">
                <h2 className={`text-3xl md:text-4xl font-display font-black mb-6 ${s.titleColor}`}>
                  {s.title} {s.titleHighlight && <span className={s.highlightColor}>{s.titleHighlight}</span>}
                </h2>
                {s.paragraphs.map((p, j) => (
                  <p key={j} className="font-body text-lg leading-relaxed text-muted-foreground mb-4 text-justify">
                    {p}
                  </p>
                ))}
              </div>
              <div className="md:flex-1 flex justify-center">
                <div className="w-64 h-64 bg-white rounded-3xl shadow-[10px_10px_0_hsl(var(--moodoo-cream))] border-4 border-white flex items-center justify-center">
                  <span className="text-8xl">{s.emoji}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      ))}
    </div>
  );
}
