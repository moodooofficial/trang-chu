import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

export default function CartModal() {
  const { cart, removeFromCart, totalPrice, isCartOpen, closeCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate("/thanh-toan");
  };

  return (
    <Dialog open={isCartOpen} onOpenChange={closeCart}>
      <DialogContent className="sm:max-w-[420px] rounded-3xl border-4 border-moodoo-yellow p-0 overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-display font-bold text-moodoo-rose mb-4">🛒 GIỎ HÀNG CỦA BẠN</h2>

          {cart.length === 0 ? (
            <p className="text-muted-foreground font-body py-8 text-center">Giỏ hàng đang trống trơn nè... 🦔</p>
          ) : (
            <div className="space-y-3 max-h-[50vh] overflow-y-auto">
              {cart.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="flex items-center gap-3 border-b border-muted pb-3">
                  <div className="w-12 h-12 bg-moodoo-cream rounded-lg flex items-center justify-center text-2xl">📦</div>
                  <div className="flex-1">
                    <p className="font-display font-bold text-sm">{item.name}</p>
                    <p className="text-moodoo-rose font-bold text-sm">{item.price.toLocaleString()}đ</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 pt-4 border-t-2 border-dashed border-muted">
            <p className="text-right font-display font-bold text-lg">
              Tổng cộng: <span className="text-moodoo-rose">{totalPrice.toLocaleString()}đ</span>
            </p>
          </div>

          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full mt-4 py-3 bg-moodoo-green text-white font-display font-bold text-lg rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 shadow-[0_4px_0_hsl(var(--moodoo-green)/0.7)]"
          >
            GỬI ĐƠN HÀNG
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
