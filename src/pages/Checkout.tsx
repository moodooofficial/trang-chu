import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyeg43OFH3fF8ATO2O55t9yjSDdXkkPAFCunsFMqxKyQRBmB9jBnCHoOaCxYcz6T0co/exec";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bank, setBank] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async () => {
    if (!name || !phone || !address) {
      toast({ title: "Vui lòng điền đủ thông tin giao hàng nhé!", variant: "destructive" });
      return;
    }
    if (cart.length === 0) {
      toast({ title: "Giỏ hàng đang trống!", variant: "destructive" });
      return;
    }

    setLoading(true);
    const orderData = {
      action: "order",
      customer: name,
      phone,
      address,
      note,
      bankAccount: bank,
      products: cart.map((i) => i.name).join(", "),
      total: totalPrice,
      user: localStorage.getItem("moodoo_user") || "Khách",
    };

    try {
      await fetch(SCRIPT_URL, { method: "POST", mode: "no-cors", body: JSON.stringify(orderData) });
      toast({ title: "Đặt hàng thành công! Moodoo sẽ liên hệ với bạn sớm 🎉" });
      clearCart();
      setName(""); setPhone(""); setBank(""); setAddress(""); setNote("");
    } catch {
      toast({ title: "Lỗi kết nối. Vui lòng kiểm tra internet!", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-moodoo-cream min-h-screen">
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center font-display font-bold">
        <Link to="/cua-tiem" className="text-moodoo-deep-orange uppercase text-sm hover:text-moodoo-orange transition-colors">
          ← Quay lại cửa hàng
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold mb-8">Xác nhận đơn hàng</h1>

        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-8">
          {/* Form */}
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h2 className="text-xl font-display font-bold text-moodoo-deep-orange mb-6">Thông tin giao hàng</h2>

            <label className="font-display font-bold text-sm block mb-1">Họ và tên</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ví dụ: Nguyễn Văn A" className="rounded-xl mb-4" />

            <label className="font-display font-bold text-sm block mb-1">Số điện thoại</label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Số điện thoại nhận hàng" type="tel" className="rounded-xl mb-4" />

            <label className="font-display font-bold text-sm block mb-1">Số tài khoản ngân hàng (để hoàn tiền nếu cần)</label>
            <Input value={bank} onChange={(e) => setBank(e.target.value)} placeholder="Số tài khoản - Tên ngân hàng - Chủ TK" className="rounded-xl mb-4" />

            <label className="font-display font-bold text-sm block mb-1">Địa chỉ chi tiết</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Số nhà, tên đường, phường/xã..."
              rows={3}
              className="w-full rounded-xl border border-input bg-background px-3 py-2 font-body text-sm mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            />

            <label className="font-display font-bold text-sm block mb-1">Ghi chú đơn hàng</label>
            <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ví dụ: Giao giờ hành chính" className="rounded-xl" />
          </div>

          {/* Order Summary */}
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h2 className="text-xl font-display font-bold text-moodoo-deep-orange mb-6">Giỏ hàng của bạn</h2>

            {cart.length === 0 ? (
              <p className="font-body text-muted-foreground py-4">
                Giỏ hàng đang trống. <Link to="/cua-tiem" className="text-moodoo-rose font-bold hover:underline">Quay lại mua hàng nè!</Link>
              </p>
            ) : (
              <div className="space-y-3">
                {cart.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="flex justify-between items-center py-3 border-b border-muted">
                    <span className="font-body text-sm">{item.name}</span>
                    <span className="font-display font-bold text-moodoo-rose">{item.price.toLocaleString()}đ</span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 pt-4 border-t-2 border-dashed border-muted text-right">
              <span className="text-2xl font-display font-bold text-moodoo-rose">
                Tổng: {totalPrice.toLocaleString()}đ
              </span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || cart.length === 0}
              className="w-full mt-6 py-4 bg-moodoo-green text-white font-display font-bold text-lg rounded-full shadow-[0_4px_0_hsl(88,50%,40%)] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50"
            >
              {loading ? "ĐANG XỬ LÝ..." : "XÁC NHẬN ĐẶT HÀNG"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
