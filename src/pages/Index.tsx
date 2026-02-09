import { motion } from "framer-motion";
import { teamMembers } from "@/data/team";
import MoodooLogo from "@/components/MoodooLogo";

const whyCards = [
  { icon: "🐶", title: "Gắn kết tự nhiên", desc: "Hình ảnh minh họa lấy cảm hứng từ thiên nhiên, gần gũi với trẻ.", bg: "bg-moodoo-yellow/20" },
  { icon: "😡", title: "Gần gũi cảm xúc", desc: "Các nhân vật được xây dựng dựa trên những cảm xúc cơ bản.", bg: "bg-moodoo-rose/20" },
  { icon: "📋", title: "Sử dụng linh hoạt", desc: "Tài liệu hướng dẫn giúp phụ huynh dễ dàng đồng hành cùng con.", bg: "bg-moodoo-green/20" },
  { icon: "🔒", title: "An toàn & Riêng tư", desc: "Cam kết bảo mật thông tin và tạo không gian an toàn cho bé.", bg: "bg-moodoo-blue/20" },
  { icon: "📦", title: "Chắc chắn & Dễ hiểu", desc: "Nội dung đơn giản, phù hợp lứa tuổi mầm non và tiểu học.", bg: "bg-moodoo-purple/20" },
  { icon: "🏆", title: "Tối ưu thời gian", desc: "Không cần chuẩn bị cầu kỳ, ba mẹ có thể chơi cùng con ngay.", bg: "bg-moodoo-orange/20" },
];

const testimonials = [
  {
    name: "Chị Minh Thư",
    role: "Phụ huynh bé An (5 tuổi)",
    avatar: "👩",
    quote: "Con mình biết gọi tên cảm xúc từ khi dùng MOODOO. Mỗi tối hai mẹ con cùng đọc sách, con hào hứng kể lại cảm xúc trong ngày. Tuyệt vời!",
    stars: 5,
  },
  {
    name: "Anh Hoàng Nam",
    role: "Phụ huynh bé Bông (4 tuổi)",
    avatar: "👨",
    quote: "Bé nhà mình hay cáu giận mà không biết diễn đạt. Từ khi có MOODOO, bé biết nói 'con đang giận' thay vì la hét. Cảm ơn MOODOO rất nhiều!",
    stars: 5,
  },
  {
    name: "Cô Thanh Hằng",
    role: "Giáo viên mầm non",
    avatar: "👩‍🏫",
    quote: "Mình dùng bộ thẻ MOODOO trong lớp và các bé rất thích. Hoạt động nhóm sôi nổi hẳn lên, các bé biết chia sẻ cảm xúc với nhau nhiều hơn.",
    stars: 5,
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function Index() {
  return (
    <div>
      {/* HERO - Big vibrant yellow */}
      <header className="bg-moodoo-yellow relative overflow-hidden py-16 md:py-24">
        {/* Floating decorations */}
        <div className="absolute top-8 left-8 text-4xl animate-float opacity-60">⭐</div>
        <div className="absolute top-16 right-12 text-3xl animate-float opacity-50" style={{ animationDelay: "1s" }}>🌈</div>
        <div className="absolute bottom-8 left-16 text-3xl animate-float opacity-50" style={{ animationDelay: "0.5s" }}>🎈</div>
        <div className="absolute bottom-16 right-8 text-4xl animate-float opacity-60" style={{ animationDelay: "1.5s" }}>🦋</div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, type: "spring" }}>
            <MoodooLogo size="xl" className="justify-center mb-4" />
          </motion.div>
          <motion.p
            className="text-xl md:text-2xl font-display font-bold text-moodoo-purple italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            " HÀNH TRÌNH KHÁM PHÁ CẢM XÚC CÙNG TRẺ "
          </motion.p>
          <motion.div
            className="mt-8 text-9xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            🦔
          </motion.div>
          <motion.div
            className="mt-6 flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="text-3xl">😄</span>
            <span className="text-3xl">😢</span>
            <span className="text-3xl">😡</span>
            <span className="text-3xl">😨</span>
            <span className="text-3xl">😲</span>
            <span className="text-3xl">🥰</span>
          </motion.div>
        </div>
      </header>

      {/* INTRO BAR */}
      <div className="bg-moodoo-sky text-white py-3 px-6 font-display font-bold text-xl flex items-center gap-2">
        <span className="animate-bounce">⚙️</span> Giới thiệu
      </div>

      {/* STORY - Green */}
      <section className="bg-moodoo-green text-white py-16 relative">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="flex flex-col md:flex-row items-center gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="md:flex-1 text-center">
              <div className="w-64 h-64 bg-white/20 rounded-3xl flex items-center justify-center mx-auto border-4 border-white/30 shadow-2xl hover:rotate-3 transition-transform duration-500">
                <span className="text-9xl">🦔</span>
              </div>
            </div>
            <div className="md:flex-[1.5]">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Câu chuyện về <MoodooLogo size="md" />
              </h2>
              <p className="font-body text-lg leading-relaxed mb-4 text-justify">
                Một buổi sáng, Moodoo tìm thấy một phong bì rất đẹp trước cửa nhà. Trên có ghi: "Gửi Moodoo yêu dấu của ta..."
              </p>
              <p className="font-body text-lg leading-relaxed mb-4 text-justify">
                Moodoo rất háo hức, cậu nhận ra tấm vé thông hành diệu kỳ cho phép cậu khám phá thế giới cảm xúc.
              </p>
              <p className="font-body text-lg leading-relaxed text-justify">
                Trước đó, mình luôn đóng cửa ở nhà. Moodoo bắt đầu hành trình Vùng Đất Cảm Xúc vào một ngày lộng gió, mang theo chiếc túi đỏ đựng kho báu cảm xúc...
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BOOKS - Cream */}
      <section className="bg-moodoo-cream py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-extrabold mb-12">
            BỘ SÁCH <MoodooLogo size="md" />
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-12">
            {[
              { title: "VÙNG ĐẤT CẢM XÚC I", sub: "VUI - BUỒN - NGẠC NHIÊN", bg: "bg-moodoo-blue", emoji: "📘" },
              { title: "VÙNG ĐẤT CẢM XÚC II", sub: "GIẬN - SỢ - YÊU THƯƠNG", bg: "bg-moodoo-rose", emoji: "📙" },
            ].map((book, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { duration: 0.6, delay: i * 0.2 } } }}
              >
                <div className={`w-64 h-72 ${book.bg} rounded-3xl flex items-center justify-center mx-auto shadow-2xl hover:scale-105 hover:-rotate-2 transition-all duration-500 border-4 border-white`}>
                  <span className="text-8xl drop-shadow-lg">{book.emoji}</span>
                </div>
                <p className="font-display font-extrabold text-moodoo-orange text-xl mt-5">{book.title}</p>
                <p className="font-display font-bold text-foreground">{book.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY MOODOO - Orange */}
      <section className="bg-moodoo-orange py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-3xl md:text-5xl font-display font-extrabold mb-12 text-white">
            ✨ Why <MoodooLogo size="md" />?
          </h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {whyCards.map((card, i) => (
              <motion.div
                key={i}
                className={`${card.bg} bg-white dark:bg-card backdrop-blur-sm p-6 rounded-3xl hover:scale-105 transition-all duration-300 shadow-lg border-2 border-white/50`}
                variants={fadeInUp}
              >
                <div className="text-4xl mb-3">{card.icon}</div>
                <h3 className="font-display font-bold text-lg mb-2 text-foreground">{card.title}</h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-moodoo-cream py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-3xl md:text-4xl font-display font-extrabold mb-4 text-foreground">
            💬 Ba Mẹ Nói Gì Về <MoodooLogo size="sm" />?
          </h2>
          <p className="text-center font-body text-muted-foreground mb-12">Những chia sẻ ấm áp từ gia đình đã đồng hành cùng MOODOO</p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="bg-card p-6 rounded-3xl shadow-lg border-2 border-moodoo-yellow/30 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 relative"
                variants={fadeInUp}
              >
                <div className="absolute -top-4 left-6 text-3xl">💛</div>
                <div className="flex items-center gap-3 mb-4 mt-2">
                  <div className="w-12 h-12 bg-moodoo-yellow/30 rounded-full flex items-center justify-center text-2xl">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-display font-bold text-foreground">{t.name}</p>
                    <p className="font-body text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
                <p className="font-body text-sm leading-relaxed text-muted-foreground italic mb-3">
                  "{t.quote}"
                </p>
                <div className="flex gap-1">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <span key={j} className="text-moodoo-yellow text-lg">⭐</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TEAM - Blue */}
      <section className="bg-moodoo-blue py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-3xl md:text-4xl font-display font-extrabold text-white uppercase tracking-widest mb-12">
            🎯 OUR TEAM
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                className="text-center w-36"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { duration: 0.5, delay: i * 0.1 } } }}
              >
                <div className="w-28 h-28 bg-white rounded-full border-4 border-moodoo-yellow mx-auto mb-3 flex items-center justify-center text-4xl shadow-xl hover:scale-110 hover:rotate-6 transition-all duration-300">
                  {member.emoji}
                </div>
                <p className="font-display font-bold text-white">{member.name}</p>
                <p className="font-body text-sm text-white/80 font-bold">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Pink */}
      <section className="bg-moodoo-rose py-16 relative overflow-hidden">
        <div className="absolute top-4 right-8 text-4xl animate-float">🎀</div>
        <div className="absolute bottom-4 left-8 text-3xl animate-float" style={{ animationDelay: "1s" }}>🧸</div>

        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="flex flex-col md:flex-row items-center gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="md:flex-1">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                Đến với <MoodooLogo size="md" className="text-white [&>span]:!text-white" /> 💖
              </h2>
              <p className="font-body text-lg text-white/90 leading-relaxed">
                ...Trẻ sẽ được khám phá và thấu hiểu cảm xúc của mình qua những câu chuyện sinh động và trò chơi tương tác. Hãy để Moodoo cùng con lớn lên mỗi ngày!
              </p>
            </div>
            <div className="md:flex-1">
              <div className="bg-white/20 rounded-3xl p-8 border-4 border-white transform -rotate-2 hover:rotate-1 transition-transform duration-500 backdrop-blur-sm">
                <div className="text-center text-7xl">👨‍👩‍👧‍👦</div>
                <p className="text-center font-display font-bold text-white text-xl mt-4">Happy Family 🎉</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
