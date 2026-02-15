import { motion } from "framer-motion";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import FloatingEmojis from "@/components/FloatingEmojis";
import shopBook1 from "@/assets/shop-book1.jpg";
import shopBook2 from "@/assets/shop-book2.jpg";
import shopCardTutin from "@/assets/shop-card-tutin.jpg";
import shopCardTontrong from "@/assets/shop-card-tontrong.jpg";
import shopComboDaotao from "@/assets/shop-combo-daotao.jpg";
import shopComboHieubiet from "@/assets/shop-combo-hieubiet.jpg";

const texts = {
  vi: {
    title: "CỬA TIỆM MOODOO",
    subtitle: "Sản phẩm của chúng tớ",
    packCards: "🃏 BỘ PACK CARDS",
    packCardsSub: "Mỗi bộ gồm 3 thẻ: Tình huống - Giải pháp - Sưu tầm",
    combo: "🎁 COMBO",
    demo: "✨ DEMO",
    addToCart: "THÊM VÀO GIỎ",
    perBook: "/cuốn",
    perSet: "/bộ",
    bookDesc1: "Cuốn sách đưa trẻ khám phá ba cảm xúc cơ bản: Vui - Buồn - Ngạc nhiên. Với hình minh họa sinh động, hoạt động tương tác và sticker đi kèm, giúp bé dễ dàng nhận diện, gọi tên và thể hiện cảm xúc của mình.",
    bookDesc2: "Tiếp nối hành trình, cuốn sách tiếp tục vào ba cảm xúc quan trọng: Giận - Sợ - Yêu thương. Giúp trẻ hiểu rõ hơn về cảm xúc phức tạp, biết cách kiểm soát và thể hiện tích cực.",
    added: "Đã thêm",
    toCart: "vào giỏ hàng! 🛒",
  },
  en: {
    title: "MOODOO SHOP",
    subtitle: "Our products",
    packCards: "🃏 PACK CARDS",
    packCardsSub: "Each set includes 3 cards: Scenario - Solution - Collection",
    combo: "🎁 COMBOS",
    demo: "✨ DEMO",
    addToCart: "ADD TO CART",
    perBook: "/book",
    perSet: "/set",
    bookDesc1: "This book takes children to explore three basic emotions: Happy - Sad - Surprised. With vivid illustrations, interactive activities and stickers, helping children easily recognize, name and express their emotions.",
    bookDesc2: "Continuing the journey, this book explores three important emotions: Angry - Scared - Loving. Helping children better understand complex emotions, learn to control and express them positively.",
    added: "Added",
    toCart: "to cart! 🛒",
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const bookImages = [shopBook1, shopBook2];
const cardImages = [shopCardTutin, shopCardTontrong];
const comboImages = [shopComboDaotao, shopComboHieubiet];

export default function Shop() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { lang } = useLanguage();
  const t = texts[lang];

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({ id: product.id, name: product.name, price: product.price });
    toast({ title: `${t.added} "${product.name}" ${t.toCart}` });
  };

  const books = products.filter((p) => p.category === "books");
  const combos = products.filter((p) => p.category === "combos");
  const cards = products.filter((p) => p.category === "cards");

  return (
    <div>
      <div className="bg-moodoo-pink text-white py-12 text-center border-t-4 border-white relative overflow-hidden">
        <FloatingEmojis variant="shop" count={10} />
        <h1 className="text-4xl md:text-5xl font-display font-bold relative z-10" style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.1)" }}>
          {t.title}
        </h1>
        <p className="font-display text-white/80 mt-2 relative z-10 text-lg">{t.subtitle}</p>
      </div>

      <section className="bg-moodoo-cream py-16 relative overflow-hidden">
        <FloatingEmojis variant="shop" count={8} />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          {books.map((book, i) => (
            <motion.div key={book.id}
              className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 mb-16 bg-white dark:bg-card rounded-3xl p-8 shadow-lg relative`}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              {book.sale && (
                <div className="absolute -top-3 -right-3 bg-moodoo-red text-white font-display font-bold text-sm px-4 py-1 rounded-full shadow-lg animate-bounce z-10">
                  🔥 SALE
                </div>
              )}
              <div className="rounded-2xl w-full md:w-64 h-56 flex-shrink-0 overflow-hidden">
                <img src={bookImages[i]} alt={book.name} className="w-full h-full object-cover rounded-2xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-2xl mb-3 text-moodoo-orange">{book.name}</h3>
                <p className="font-body text-muted-foreground mb-4 leading-relaxed">{book.description}</p>
                <p className="font-body text-sm text-muted-foreground mb-4">
                  {i === 0 ? t.bookDesc1 : t.bookDesc2}
                </p>
                <div className="flex items-center gap-4 mb-4">
                  {book.originalPrice && (
                    <span className="font-display text-lg text-muted-foreground line-through">{book.originalPrice.toLocaleString()}đ</span>
                  )}
                  <span className="font-display font-black text-2xl text-moodoo-rose">{book.price.toLocaleString()}đ{t.perBook}</span>
                </div>
                <button onClick={() => handleAddToCart(book)}
                  className="px-8 py-3 bg-moodoo-green text-white font-display font-bold rounded-full shadow-[0_4px_0_hsl(88,50%,40%)] active:translate-y-1 active:shadow-none transition-all hover:brightness-110">
                  {t.addToCart}
                </button>
              </div>
            </motion.div>
          ))}

          {/* Pack Cards */}
          <div className="mb-16">
            <h2 className="text-center text-2xl md:text-3xl font-display font-bold text-moodoo-sky uppercase mb-8">{t.packCards}</h2>
            <p className="text-center font-body text-muted-foreground mb-8">{t.packCardsSub}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {cards.map((card, i) => (
                <motion.div key={card.id}
                  className="bg-white dark:bg-card rounded-3xl p-6 shadow-lg text-center hover:-translate-y-2 transition-all duration-300"
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { duration: 0.5, delay: i * 0.15 } } }}>
                  <div className="rounded-2xl h-40 flex items-center justify-center mb-4 overflow-hidden">
                    <img src={cardImages[i]} alt={card.name} className="w-full h-full object-cover rounded-2xl" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-2">{card.name}</h3>
                  <p className="font-body text-sm text-muted-foreground mb-3">{card.description}</p>
                  <p className="font-display font-bold text-lg text-moodoo-rose mb-4">{card.price.toLocaleString()}đ{t.perSet}</p>
                  <button onClick={() => handleAddToCart(card)}
                    className="px-6 py-2 bg-moodoo-sky text-white font-display font-bold rounded-full shadow-[0_3px_0_hsl(199,89%,38%)] active:translate-y-1 active:shadow-none transition-all hover:brightness-110">
                    {t.addToCart}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Combos */}
          <div className="mb-16">
            <h2 className="text-center text-2xl md:text-3xl font-display font-bold text-moodoo-orange uppercase mb-8">{t.combo}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {combos.map((combo, i) => (
                <motion.div key={combo.id}
                  className="bg-white dark:bg-card rounded-3xl p-6 shadow-lg text-center hover:-translate-y-2 transition-all duration-300 border-2 border-moodoo-yellow/30"
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { duration: 0.5, delay: i * 0.15 } } }}>
                  <div className="rounded-2xl h-48 flex items-center justify-center mb-4 overflow-hidden">
                    <img src={comboImages[i]} alt={combo.name} className="w-full h-full object-cover rounded-2xl" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-2">{combo.name}</h3>
                  <p className="font-body text-sm text-muted-foreground mb-3">{combo.description}</p>
                  <p className="font-display font-bold text-xl text-moodoo-rose mb-4">{combo.price.toLocaleString()}đ{t.perSet}</p>
                  <button onClick={() => handleAddToCart(combo)}
                    className="px-6 py-3 bg-moodoo-rose text-white font-display font-bold rounded-full shadow-[0_4px_0_hsl(340,82%,42%)] active:translate-y-1 active:shadow-none transition-all hover:brightness-110">
                    {t.addToCart}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Demo Flipbook */}
          <div>
            <h2 className="text-center text-2xl md:text-3xl font-display font-bold text-moodoo-orange uppercase mb-8">{t.demo}</h2>
            <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-moodoo-cream">
              <iframe allowFullScreen allow="clipboard-write" scrolling="no" className="w-full h-[400px] md:h-[500px]"
                src="https://heyzine.com/flip-book/03405680f3.html" style={{ border: "1px solid #ddd" }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
