import { motion } from "framer-motion";
import { teamMembers } from "@/data/team";

const whyCards = [
  { icon: "🐶", title: "Gắn kết tự nhiên", desc: "Hình ảnh minh họa lấy cảm hứng từ thiên nhiên, gần gũi với trẻ." },
  { icon: "😡", title: "Gần gũi cảm xúc", desc: "Các nhân vật được xây dựng dựa trên những cảm xúc cơ bản." },
  { icon: "📋", title: "Sử dụng linh hoạt", desc: "Tài liệu hướng dẫn giúp phụ huynh dễ dàng đồng hành cùng con." },
  { icon: "🔒", title: "An toàn & Riêng tư", desc: "Cam kết bảo mật thông tin và tạo không gian an toàn cho bé." },
  { icon: "📦", title: "Chắc chắn & Dễ hiểu", desc: "Nội dung đơn giản, phù hợp lứa tuổi mầm non và tiểu học." },
  { icon: "🏆", title: "Tối ưu thời gian", desc: "Không cần chuẩn bị cầu kỳ, ba mẹ có thể chơi cùng con ngay." },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Index() {
  return (
    <div>
      {/* HEADER - Yellow */}
      <header className="bg-moodoo-yellow text-center py-12 relative overflow-hidden"
        style={{ backgroundImage: "radial-gradient(hsl(var(--moodoo-yellow) / 0.6) 20%, transparent 20%)", backgroundSize: "30px 30px" }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-moodoo-rose mb-4 tracking-wider">
            MOODOO
          </h1>
          <p className="text-lg md:text-xl font-display font-bold text-moodoo-deep-orange italic">
            " HÀNH TRÌNH KHÁM PHÁ CẢM XÚC CÙNG TRẺ "
          </p>
          <div className="mt-8 text-8xl">🦔</div>
        </div>
      </header>

      {/* INTRO BAR */}
      <div className="bg-moodoo-sky text-foreground py-3 px-6 font-display font-bold text-xl flex items-center gap-2">
        <span>⚙️</span> Giới thiệu
      </div>

      {/* INTRO - Green */}
      <section className="bg-moodoo-green text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="flex flex-col md:flex-row items-center gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="md:flex-1 text-center">
              <div className="w-64 h-64 bg-white/20 rounded-3xl flex items-center justify-center mx-auto">
                <span className="text-9xl">🦔</span>
              </div>
            </div>
            <div className="md:flex-[1.5]">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Câu chuyện về <span className="text-moodoo-rose">MOODOO</span>
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

      {/* BOOKS - Cream/Yellow */}
      <section className="bg-moodoo-cream py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-black mb-12">
            BỘ SÁCH <span className="text-moodoo-rose">MOODOO</span>
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-12">
            {[
              { title: "VÙNG ĐẤT CẢM XÚC I", sub: "VUI - BUỒN - NGẠC NHIÊN", bg: "bg-blue-200", emoji: "📘" },
              { title: "VÙNG ĐẤT CẢM XÚC II", sub: "GIẬN - SỢ - YÊU THƯƠNG", bg: "bg-pink-200", emoji: "📙" },
            ].map((book, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { duration: 0.6, delay: i * 0.2 } } }}
              >
                <div className={`w-64 h-64 ${book.bg} rounded-3xl flex items-center justify-center mx-auto shadow-xl hover:scale-105 transition-transform duration-300`}>
                  <span className="text-8xl">{book.emoji}</span>
                </div>
                <p className="font-display font-black text-moodoo-deep-orange text-xl mt-4">{book.title}</p>
                <p className="font-display font-bold text-foreground">{book.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY MOODOO - Orange */}
      <section className="bg-moodoo-orange py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-right text-3xl md:text-5xl font-display font-black italic mb-12">
            <span className="text-moodoo-sky">Why </span>
            <span className="text-moodoo-rose">MOODOO?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyCards.map((card, i) => (
              <motion.div
                key={i}
                className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/90 transition-all duration-300 hover:-translate-y-1"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { duration: 0.5, delay: i * 0.1 } } }}
              >
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="font-display font-bold text-lg mb-2">{card.title}</h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM - Blue */}
      <section className="bg-moodoo-blue py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-3xl md:text-4xl font-display font-black text-white uppercase tracking-widest mb-12">
            OUR TEAM
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
                <div className="w-28 h-28 bg-white rounded-full border-4 border-white mx-auto mb-3 flex items-center justify-center text-4xl shadow-lg">
                  {member.emoji}
                </div>
                <p className="font-display font-bold text-foreground">{member.name}</p>
                <p className="font-body text-sm text-foreground/70 font-bold">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Pink */}
      <section className="bg-moodoo-pink py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="flex flex-col md:flex-row items-center gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="md:flex-1">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white italic mb-6">
                Đến với <span className="text-moodoo-rose font-black">MOODOO</span>
              </h2>
              <p className="font-body text-lg text-white leading-relaxed">
                ...Trẻ sẽ được khám phá và thấu hiểu cảm xúc của mình qua những câu chuyện sinh động và trò chơi tương tác. Hãy để Moodoo cùng con lớn lên mỗi ngày!
              </p>
            </div>
            <div className="md:flex-1">
              <div className="bg-white/30 rounded-2xl p-8 border-4 border-white transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="text-center text-6xl">👨‍👩‍👧‍👦</div>
                <p className="text-center font-display font-bold text-white text-xl mt-4">Happy Family</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
