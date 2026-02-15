import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import qrCodeImage from "@/assets/qr-code.jpg";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx1IxzHOpQlmYBHXyMCoRBUOem6-WJpnr7AMc1gl2BOTiCqmasnKICIGwfEHKNf8STy/exec";

const texts = {
  vi: {
    back: "← Quay lại cửa hàng",
    title: "Xác nhận đơn hàng",
    shipping: "Thông tin giao hàng",
    name: "Họ và tên",
    namePh: "Ví dụ: Nguyễn Văn A",
    phone: "Số điện thoại",
    phonePh: "Số điện thoại nhận hàng",
    bank: "Số tài khoản ngân hàng (để hoàn tiền nếu cần)",
    bankPh: "Số tài khoản - Tên ngân hàng - Chủ TK",
    address: "Địa chỉ chi tiết",
    addressPh: "Số nhà, tên đường, phường/xã...",
    note: "Ghi chú đơn hàng",
    notePh: "Ví dụ: Giao giờ hành chính",
    cart: "Giỏ hàng của bạn",
    emptyCart: "Giỏ hàng đang trống.",
    backToShop: "Quay lại mua hàng nè!",
    total: "Tổng",
    confirm: "XÁC NHẬN ĐẶT HÀNG",
    processing: "ĐANG XỬ LÝ...",
    qrTitle: "💳 Chuyển khoản nhanh",
    qrScan: "Quét mã QR để chuyển khoản nhanh hơn",
    fillInfo: "Vui lòng điền đủ thông tin giao hàng nhé!",
    emptyCartMsg: "Giỏ hàng đang trống!",
    success: "Đặt hàng thành công! Moodoo sẽ liên hệ với bạn sớm 🎉",
    error: "Lỗi kết nối. Vui lòng kiểm tra internet!",
  },
  en: {
    back: "← Back to shop",
    title: "Order Confirmation",
    shipping: "Shipping Information",
    name: "Full Name",
    namePh: "e.g. Nguyen Van A",
    phone: "Phone Number",
    phonePh: "Receiving phone number",
    bank: "Bank Account (for refund if needed)",
    bankPh: "Account number - Bank name - Account holder",
    address: "Detailed Address",
    addressPh: "House number, street, ward...",
    note: "Order Notes",
    notePh: "e.g. Deliver during business hours",
    cart: "Your Cart",
    emptyCart: "Cart is empty.",
    backToShop: "Go back to shop!",
    total: "Total",
    confirm: "CONFIRM ORDER",
    processing: "PROCESSING...",
    qrTitle: "💳 Quick Transfer",
    qrScan: "Scan QR code for faster transfer",
    fillInfo: "Please fill in all shipping information!",
    emptyCartMsg: "Cart is empty!",
    success: "Order placed successfully! Moodoo will contact you soon 🎉",
    error: "Connection error. Please check your internet!",
  },
};

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const { lang } = useLanguage();
  const t = texts[lang];
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bank, setBank] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async () => {
    if (!name || !phone || !address) {
      toast({ title: t.fillInfo, variant: "destructive" });
      return;
    }
    if (cart.length === 0) {
      toast({ title: t.emptyCartMsg, variant: "destructive" });
      return;
    }
    setLoading(true);
    const orderData = {
      action: "order",
      customer: name, phone, address, note,
      bankAccount: bank,
      products: cart.map((i) => i.name).join(", "),
      total: totalPrice,
      user: localStorage.getItem("moodoo_user") || "Khách",
    };
    try {
      await fetch(SCRIPT_URL, { method: "POST", mode: "no-cors", body: JSON.stringify(orderData) });
      toast({ title: t.success });
      clearCart();
      setName(""); setPhone(""); setBank(""); setAddress(""); setNote("");
    } catch {
      toast({ title: t.error, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-moodoo-cream min-h-screen">
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center font-display font-bold">
        <Link to="/cua-tiem" className="text-moodoo-deep-orange uppercase text-sm hover:text-moodoo-orange transition-colors">
          {t.back}
        </Link>
      </nav>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold mb-8">{t.title}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h2 className="text-xl font-display font-bold text-moodoo-deep-orange mb-6">{t.shipping}</h2>
            <label className="font-display font-bold text-sm block mb-1">{t.name}</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={t.namePh} className="rounded-xl mb-4" />
            <label className="font-display font-bold text-sm block mb-1">{t.phone}</label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t.phonePh} type="tel" className="rounded-xl mb-4" />
            <label className="font-display font-bold text-sm block mb-1">{t.bank}</label>
            <Input value={bank} onChange={(e) => setBank(e.target.value)} placeholder={t.bankPh} className="rounded-xl mb-4" />
            <label className="font-display font-bold text-sm block mb-1">{t.address}</label>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder={t.addressPh} rows={3}
              className="w-full rounded-xl border border-input bg-background px-3 py-2 font-body text-sm mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
            <label className="font-display font-bold text-sm block mb-1">{t.note}</label>
            <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder={t.notePh} className="rounded-xl" />
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h2 className="text-xl font-display font-bold text-moodoo-deep-orange mb-6">{t.cart}</h2>
            {cart.length === 0 ? (
              <p className="font-body text-muted-foreground py-4">
                {t.emptyCart} <Link to="/cua-tiem" className="text-moodoo-rose font-bold hover:underline">{t.backToShop}</Link>
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
              <span className="text-2xl font-display font-bold text-moodoo-rose">{t.total}: {totalPrice.toLocaleString()}đ</span>
            </div>
            <button onClick={handleSubmit} disabled={loading || cart.length === 0}
              className="w-full mt-6 py-4 bg-moodoo-green text-white font-display font-bold text-lg rounded-full shadow-[0_4px_0_hsl(88,50%,40%)] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50">
              {loading ? t.processing : t.confirm}
            </button>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-lg text-center">
            <h3 className="font-display font-bold text-lg text-moodoo-deep-orange mb-2">{t.qrTitle}</h3>
            <p className="font-body text-sm text-muted-foreground mb-1">NGUYEN THI BICH TRAM</p>
            <p className="font-display font-bold text-xl text-foreground mb-3">0931486612</p>
            <img src={qrCodeImage} alt="QR Code" className="w-56 h-56 mx-auto rounded-2xl border-2 border-moodoo-cream object-contain" />
            <p className="font-body text-xs text-muted-foreground mt-3">{t.qrScan}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
