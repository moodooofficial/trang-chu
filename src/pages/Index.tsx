import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { teamMembers } from "@/data/team";
import MoodooLogo from "@/components/MoodooLogo";
import moodooHouseLogo from "@/assets/moodoo-house-logo.jpg";
import moodooMascot from "@/assets/moodoo-mascot.jpg";
import moodooBook1 from "@/assets/moodoo-book1.jpg";
import moodooKids from "@/assets/moodoo-kids.jpg";
import moodooReading from "@/assets/moodoo-reading.jpg";
import moodooPlaying from "@/assets/moodoo-playing.jpg";
import moodooFamily from "@/assets/moodoo-family.jpg";
import s1Img from "@/assets/s1.jpg";
import s2Img from "@/assets/s2.jpg";

const whyCards = [
{ icon: "🐶", title: "Gắn kết tự nhiên", desc: "Hình ảnh minh họa lấy cảm hứng từ thiên nhiên, gần gũi với trẻ.", bg: "bg-amber-50 dark:bg-amber-950/30" },
{ icon: "😡", title: "Gần gũi cảm xúc", desc: "Các nhân vật được xây dựng dựa trên những cảm xúc cơ bản.", bg: "bg-rose-50 dark:bg-rose-950/30" },
{ icon: "📋", title: "Sử dụng linh hoạt", desc: "Tài liệu hướng dẫn giúp phụ huynh dễ dàng đồng hành cùng con.", bg: "bg-green-50 dark:bg-green-950/30" },
{ icon: "🔒", title: "An toàn & Riêng tư", desc: "Cam kết bảo mật thông tin và tạo không gian an toàn cho bé.", bg: "bg-blue-50 dark:bg-blue-950/30" },
{ icon: "📦", title: "Chắc chắn & Dễ hiểu", desc: "Nội dung đơn giản, phù hợp lứa tuổi mầm non và tiểu học.", bg: "bg-purple-50 dark:bg-purple-950/30" },
{ icon: "🏆", title: "Tối ưu thời gian", desc: "Không cần chuẩn bị cầu kỳ, ba mẹ có thể chơi cùng con ngay.", bg: "bg-orange-50 dark:bg-orange-950/30" }];


const testimonials = [
{ name: "Chị Minh Thư", role: "Phụ huynh bé An (5 tuổi)", avatar: "👩", quote: "Con mình biết gọi tên cảm xúc từ khi dùng MOODOO. Mỗi tối hai mẹ con cùng đọc sách, con hào hứng kể lại cảm xúc trong ngày. Tuyệt vời!", stars: 5 },
{ name: "Anh Hoàng Nam", role: "Phụ huynh bé Bông (4 tuổi)", avatar: "👨", quote: "Bé nhà mình hay cáu giận mà không biết diễn đạt. Từ khi có MOODOO, bé biết nói 'con đang giận' thay vì la hét. Cảm ơn MOODOO!", stars: 5 },
{ name: "Cô Thanh Hằng", role: "Giáo viên mầm non", avatar: "👩‍🏫", quote: "Mình dùng bộ thẻ MOODOO trong lớp và các bé rất thích. Hoạt động nhóm sôi nổi hẳn lên, các bé biết chia sẻ cảm xúc với nhau nhiều hơn.", stars: 5 },
{ name: "Chị Lan Phương", role: "Phụ huynh bé Nhi (6 tuổi)", avatar: "👩‍🦱", quote: "Bộ sách rất đẹp, hình minh họa dễ thương. Con gái mình mê lắm, cứ đòi đọc đi đọc lại mỗi tối. Rất đáng đồng tiền!", stars: 5 },
{ name: "Anh Đức Minh", role: "Phụ huynh bé Khôi (3 tuổi)", avatar: "👨‍💼", quote: "Con mình còn nhỏ nhưng vẫn thích ngắm hình và chỉ vào cảm xúc. Pack Cards rất tiện để chơi cùng con mọi lúc mọi nơi.", stars: 5 },
{ name: "Chị Hạnh Nguyên", role: "Phụ huynh bé Sóc (5 tuổi)", avatar: "👩‍🔬", quote: "Mình rất thích phương pháp CASEL mà MOODOO áp dụng. Con biết cách xử lý khi buồn hay giận, không còn ăn vạ như trước nữa.", stars: 5 },
{ name: "Cô Thu Trang", role: "Chuyên gia tâm lý trẻ em", avatar: "👩‍⚕️", quote: "MOODOO là bộ học liệu hiếm hoi ở Việt Nam tiếp cận giáo dục cảm xúc một cách bài bản, khoa học mà vẫn gần gũi với trẻ nhỏ.", stars: 5 },
{ name: "Chị Mai Anh", role: "Phụ huynh bé Miu (4 tuổi)", avatar: "👩‍🎨", quote: "Hang Động Nhỏ là phần con mình thích nhất! Bé rất háo hức khi được nói chuyện với Moodoo AI. Sáng tạo và bổ ích!", stars: 5 }];


const ctaImages = [moodooKids, moodooReading, moodooPlaying, moodooFamily];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

export default function Index() {
  const [ctaIndex, setCtaIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCtaIndex((i) => (i + 1) % ctaImages.length), 3500);
    return () => clearInterval(interval);
  }, []);

  // Auto scroll testimonials
  const testimonialRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = testimonialRef.current;
    if (!el) return;
    let scrollPos = 0;
    const speed = 0.5;
    let animId: number;
    const step = () => {
      scrollPos += speed;
      if (scrollPos >= el.scrollWidth - el.clientWidth) scrollPos = 0;
      el.scrollLeft = scrollPos;
      animId = requestAnimationFrame(step);
    };
    animId = requestAnimationFrame(step);
    const pause = () => cancelAnimationFrame(animId);
    const resume = () => {animId = requestAnimationFrame(step);};
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    return () => {cancelAnimationFrame(animId);el.removeEventListener("mouseenter", pause);el.removeEventListener("mouseleave", resume);};
  }, []);

  return (
    <div>
      {/* HERO */}
      <header className="bg-moodoo-yellow relative overflow-hidden py-16 md:py-24">
        <div className="absolute top-8 left-8 text-4xl animate-float opacity-60">⭐</div>
        <div className="absolute top-16 right-12 text-3xl animate-float opacity-50" style={{ animationDelay: "1s" }}>🌈</div>
        <div className="absolute bottom-8 left-16 text-3xl animate-float opacity-50" style={{ animationDelay: "0.5s" }}>🎈</div>
        <div className="absolute bottom-16 right-8 text-4xl animate-float opacity-60" style={{ animationDelay: "1.5s" }}>🦋</div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, type: "spring" }}>
            
          </motion.div>
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2, type: "spring" }}>
            <MoodooLogo size="xl" className="justify-center mb-4" />
          </motion.div>
          <motion.p className="text-xl md:text-2xl font-display font-bold text-moodoo-purple italic"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
            " HÀNH TRÌNH KHÁM PHÁ CẢM XÚC CÙNG TRẺ "
          </motion.p>
          <motion.div className="mt-8" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: "spring", stiffness: 200 }}>
            <img src={moodooMascot} alt="Moodoo mascot" className="w-48 h-48 md:w-64 md:h-64 mx-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500" />
          </motion.div>
          <motion.div className="mt-6 flex justify-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <span className="text-3xl">😄</span><span className="text-3xl">😢</span><span className="text-3xl">😡</span>
            <span className="text-3xl">😨</span><span className="text-3xl">😲</span><span className="text-3xl">🥰</span>
          </motion.div>
        </div>
      </header>

      {/* INTRO BAR */}
      <div className="bg-moodoo-sky text-white py-3 px-6 font-display font-bold text-xl flex items-center gap-2">
        <span className="animate-bounce">⚙️</span> Giới thiệu
      </div>

      {/* STORY */}
      <section className="bg-moodoo-green text-white py-16 relative">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div className="flex flex-col md:flex-row items-center gap-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <div className="md:flex-1 text-center">
              <img alt="Sách MOODOO 1" className="w-72 h-72 object-cover rounded-3xl mx-auto border-4 border-white/30 shadow-2xl hover:rotate-3 transition-transform duration-500" src="/lovable-uploads/ebdaa4df-e9cb-4fe3-a5ad-13c1b59ae66b.jpg" />
            </div>
            <div className="md:flex-[1.5]">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Câu chuyện về <MoodooLogo size="md" /></h2>
              <p className="font-body text-lg leading-relaxed mb-4 text-justify">Một buổi sáng, Moodoo tìm thấy một phong bì rất đẹp trước cửa nhà. Trên có ghi: "Gửi Moodoo yêu dấu của ta..."</p>
              <p className="font-body text-lg leading-relaxed mb-4 text-justify">Moodoo rất háo hức, cậu nhận ra tấm vé thông hành diệu kỳ cho phép cậu khám phá thế giới cảm xúc.</p>
              <p className="font-body text-lg leading-relaxed text-justify">Trước đó, mình luôn đóng cửa ở nhà. Moodoo bắt đầu hành trình Vùng Đất Cảm Xúc vào một ngày lộng gió, mang theo chiếc túi đỏ đựng kho báu cảm xúc...</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BOOKS - with real images */}
      <section className="bg-moodoo-cream py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-extrabold mb-12">BỘ SÁCH <MoodooLogo size="md" /></h2>
          <div className="flex flex-col md:flex-row justify-center gap-12">
            {[
            { title: "VÙNG ĐẤT CẢM XÚC I", sub: "VUI - BUỒN - NGẠC NHIÊN", image: s1Img },
            { title: "VÙNG ĐẤT CẢM XÚC II", sub: "GIẬN - SỢ - YÊU THƯƠNG", image: s2Img }].
            map((book, i) =>
            <motion.div key={i} className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { duration: 0.6, delay: i * 0.2 } } }}>
                <div className="w-64 h-72 rounded-3xl mx-auto shadow-2xl hover:scale-105 hover:-rotate-2 transition-all duration-500 border-4 border-white overflow-hidden">
                  <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                </div>
                <p className="font-display font-extrabold text-moodoo-orange text-xl mt-5">{book.title}</p>
                <p className="font-display font-bold text-foreground">{book.sub}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* WHY MOODOO - Pastel background */}
      <section className="bg-amber-50 dark:bg-card py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-3xl md:text-5xl font-display font-extrabold mb-12 text-moodoo-orange">
            ✨ Why <MoodooLogo size="md" />?
          </h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {whyCards.map((card, i) =>
            <motion.div key={i} className={`${card.bg} p-6 rounded-3xl hover:scale-105 transition-all duration-300 shadow-lg border-2 border-white/50`} variants={fadeInUp}>
                <div className="text-4xl mb-3">{card.icon}</div>
                <h3 className="font-display font-bold text-lg mb-2 text-foreground">{card.title}</h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS - Horizontal scroll */}
      <section className="bg-moodoo-cream py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-3xl md:text-4xl font-display font-extrabold mb-4 text-foreground">
            💬 Ba Mẹ Nói Gì Về <MoodooLogo size="sm" />?
          </h2>
          <p className="text-center font-body text-muted-foreground mb-10">Những chia sẻ ấm áp từ gia đình đã đồng hành cùng MOODOO</p>

          <div ref={testimonialRef} className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide cursor-grab" style={{ scrollBehavior: "auto" }}>
            {testimonials.map((t, i) =>
            <div key={i} className="bg-card p-6 rounded-3xl shadow-lg border-2 border-moodoo-yellow/30 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 relative flex-shrink-0 w-[320px]">
                <div className="absolute -top-4 left-6 text-3xl">💛</div>
                <div className="flex items-center gap-3 mb-4 mt-2">
                  <div className="w-12 h-12 bg-moodoo-yellow/30 rounded-full flex items-center justify-center text-2xl">{t.avatar}</div>
                  <div>
                    <p className="font-display font-bold text-foreground">{t.name}</p>
                    <p className="font-body text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
                <p className="font-body text-sm leading-relaxed text-muted-foreground italic mb-3">"{t.quote}"</p>
                <div className="flex gap-1">
                  {Array.from({ length: t.stars }).map((_, j) =>
                <span key={j} className="text-moodoo-yellow text-lg">⭐</span>
                )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* TEAM - with real photos */}
      <section className="bg-moodoo-blue py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-3xl md:text-4xl font-display font-extrabold text-white uppercase tracking-widest mb-12">🎯 OUR TEAM</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {teamMembers.map((member, i) =>
            <motion.div key={i} className="text-center w-36" initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { duration: 0.5, delay: i * 0.1 } } }}>
                <div className="w-28 h-28 rounded-full border-4 border-moodoo-yellow mx-auto mb-3 shadow-xl hover:scale-110 hover:rotate-6 transition-all duration-300 overflow-hidden">
                  {member.image ?
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" /> :

                <div className="w-full h-full bg-white flex items-center justify-center text-4xl">{member.emoji}</div>
                }
                </div>
                <p className="font-display font-bold text-white">{member.name}</p>
                <p className="font-body text-sm text-white/80 font-bold">{member.role}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* CTA - with image carousel */}
      <section className="bg-moodoo-rose py-16 relative overflow-hidden">
        <div className="absolute top-4 right-8 text-4xl animate-float">🎀</div>
        <div className="absolute bottom-4 left-8 text-3xl animate-float" style={{ animationDelay: "1s" }}>🧸</div>

        <div className="max-w-6xl mx-auto px-4">
          <motion.div className="flex flex-col md:flex-row items-center gap-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <div className="md:flex-1">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                Đến với <MoodooLogo size="md" className="text-white [&>span]:!text-white" /> 💖
              </h2>
              <p className="font-body text-lg text-white/90 leading-relaxed">
                ...Trẻ sẽ được khám phá và thấu hiểu cảm xúc của mình qua những câu chuyện sinh động và trò chơi tương tác. Hãy để Moodoo cùng con lớn lên mỗi ngày!
              </p>
            </div>
            <div className="md:flex-1">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                {ctaImages.map((img, i) =>
                <img key={i} src={img} alt={`MOODOO ${i}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === ctaIndex ? "opacity-100" : "opacity-0"}`} />
                )}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {ctaImages.map((_, i) =>
                  <button key={i} onClick={() => setCtaIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all ${i === ctaIndex ? "bg-white scale-125" : "bg-white/50"}`} />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>);

}