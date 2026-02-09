import { motion } from "framer-motion";
import GatedContent from "@/components/GatedContent";
import { blogPosts } from "@/data/blog";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const blogEmojis = ["📝", "📚", "💬", "🎯"];

export default function Blog() {
  const featured = blogPosts.find((p) => p.featured);
  const posts = blogPosts.filter((p) => !p.featured);

  return (
    <div>
      {/* Title Bar */}
      <div className="bg-moodoo-teal text-white py-12 text-center border-t-4 border-white">
        <h1 className="text-4xl md:text-5xl font-display font-bold" style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.1)" }}>
          GÓC CHIA SẺ
        </h1>
        <p className="font-body text-lg mt-3 opacity-90">
          Nơi Moodoo và ba mẹ cùng nhau tâm tình, học hỏi và lớn khôn.
        </p>
      </div>

      <GatedContent
        variant="blog"
        title="NỘI DUNG DÀNH RIÊNG CHO THÀNH VIÊN"
        description="Ba mẹ vui lòng Đăng nhập hoặc Đăng ký bằng Mã Sách để đọc các bài viết chia sẻ độc quyền từ chuyên gia và đội ngũ Moodoo nhé!"
        buttonText="ĐĂNG NHẬP ĐỂ ĐỌC"
        icon="🔒"
      >
        <section className="bg-teal-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            {/* Featured Post */}
            {featured && (
              <motion.article
                className="bg-white rounded-3xl overflow-hidden shadow-lg mb-12 flex flex-col md:flex-row hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <div className="md:flex-[1.5] min-h-[300px] bg-moodoo-teal flex items-center justify-center">
                  <span className="text-9xl">📖</span>
                </div>
                <div className="md:flex-1 p-8 flex flex-col justify-center">
                  {featured.tag && (
                    <span className="inline-block bg-teal-100 text-moodoo-teal px-4 py-1 rounded-full text-sm font-display font-bold mb-4 w-fit">
                      {featured.tag}
                    </span>
                  )}
                  <h2 className="font-display font-bold text-2xl mb-4">{featured.title}</h2>
                  <p className="font-body text-muted-foreground leading-relaxed mb-6">{featured.excerpt}</p>
                  <button
                    onClick={() => alert("Tính năng đọc bài viết đang được cập nhật!")}
                    className="font-display font-bold text-moodoo-teal flex items-center gap-2 hover:gap-4 transition-all"
                  >
                    ĐỌC TIẾP ➝
                  </button>
                </div>
              </motion.article>
            )}

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <motion.div
                  key={post.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:-translate-y-2 transition-all duration-300 flex flex-col"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { duration: 0.5, delay: i * 0.15 } } }}
                >
                  <div className="h-48 bg-gradient-to-br from-moodoo-teal to-moodoo-green flex items-center justify-center">
                    <span className="text-7xl hover:scale-110 transition-transform">{blogEmojis[i + 1] || "📝"}</span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="font-body text-sm text-muted-foreground mb-2">{post.date}</p>
                    <h3 className="font-display font-bold text-lg mb-3 flex-1">{post.title}</h3>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">{post.excerpt}</p>
                    <button
                      onClick={() => alert("Sắp có nội dung nha!")}
                      className="font-display font-bold text-moodoo-teal text-sm flex items-center gap-2 hover:gap-4 transition-all"
                    >
                      Xem chi tiết ➝
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </GatedContent>
    </div>
  );
}
