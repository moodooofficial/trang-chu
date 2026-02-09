import { motion } from "framer-motion";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const categoryLabels: Record<string, { label: string; icon: string }> = {
  books: { label: "SÁCH MOODOO", icon: "📚" },
  combos: { label: "COMBO TIẾT KIỆM", icon: "🎁" },
  cards: { label: "PACK CARDS", icon: "🃏" },
};

const productEmojis: Record<string, string> = {
  "book-1": "📘",
  "book-2": "📙",
  "combo-1": "📦",
  "combo-2": "🎒",
  "card-1": "🃏",
  "card-2": "🎴",
};

export default function Shop() {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({ id: product.id, name: product.name, price: product.price });
    toast({ title: `Đã thêm "${product.name}" vào giỏ hàng! 🛒` });
  };

  const categories = ["books", "combos", "cards"] as const;

  return (
    <div>
      {/* Title Bar */}
      <div className="bg-moodoo-pink text-white py-12 text-center border-t-4 border-white">
        <h1 className="text-4xl md:text-5xl font-display font-bold" style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.1)" }}>
          CỬA TIỆM MOODOO
        </h1>
      </div>

      <section className="bg-moodoo-cream py-16">
        <div className="max-w-6xl mx-auto px-4">
          {categories.map((cat) => {
            const catProducts = products.filter((p) => p.category === cat);
            const { label, icon } = categoryLabels[cat];

            return (
              <div key={cat} className="mb-16">
                <h2 className="text-center text-2xl md:text-3xl font-display font-bold text-moodoo-orange uppercase mb-8 border-b-2 border-dashed border-moodoo-orange inline-block mx-auto pb-2">
                  <span className="block text-center w-full">{icon} {label}</span>
                </h2>
                <div className="text-center mb-8">
                  <span className="inline-block border-b-2 border-dashed border-moodoo-orange" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                  {catProducts.map((product, i) => (
                    <motion.div
                      key={product.id}
                      className="bg-white rounded-3xl p-6 shadow-lg border-3 border-transparent hover:border-moodoo-yellow hover:-translate-y-2 transition-all duration-300 flex flex-col"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { duration: 0.5, delay: i * 0.15 } } }}
                    >
                      <div className={`${product.bgColor} rounded-2xl h-56 flex items-center justify-center mb-5`}>
                        <span className="text-8xl">{productEmojis[product.id] || "📦"}</span>
                      </div>
                      <h3 className="font-display font-bold text-xl mb-2">{product.name}</h3>
                      <p className="font-body text-muted-foreground text-sm mb-4 flex-1">{product.description}</p>
                      <p className="font-display font-black text-2xl text-moodoo-rose mb-5">{product.price.toLocaleString()}đ</p>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`w-full py-3 text-white font-display font-bold text-lg rounded-full transition-all active:translate-y-1 ${
                          cat === "combos"
                            ? "bg-moodoo-rose shadow-[0_4px_0_hsl(340,82%,42%)] active:shadow-none"
                            : "bg-moodoo-green shadow-[0_4px_0_hsl(88,50%,40%)] active:shadow-none"
                        }`}
                      >
                        THÊM VÀO GIỎ
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Demo Flipbook */}
          <div className="mb-8">
            <h2 className="text-center text-2xl md:text-3xl font-display font-bold text-moodoo-orange uppercase mb-8">
              ✨ DEMO
            </h2>
            <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-moodoo-cream">
              <iframe
                allowFullScreen
                allow="clipboard-write"
                scrolling="no"
                className="w-full h-[400px] md:h-[500px]"
                src="https://heyzine.com/flip-book/505caa7e1e.html"
                style={{ border: "1px solid #ddd" }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
