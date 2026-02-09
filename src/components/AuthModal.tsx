import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authMode, setAuthMode, login, register } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  // Register fields
  const [regCode, setRegCode] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(loginEmail, loginPass);
      toast({ title: "Đăng nhập thành công! 🎉" });
      setLoginEmail(""); setLoginPass("");
    } catch (err: any) {
      toast({ title: "Lỗi", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(regCode, regEmail, regPass);
      toast({ title: "Kích hoạt thành công! 🎉" });
      setRegCode(""); setRegEmail(""); setRegPass("");
    } catch (err: any) {
      toast({ title: "Lỗi", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isAuthModalOpen} onOpenChange={closeAuthModal}>
      <DialogContent className="sm:max-w-[420px] rounded-3xl border-4 border-moodoo-yellow p-0 overflow-hidden">
        <div className="p-6">
          {/* Tabs */}
          <div className="flex justify-center mb-6 border-b-2 border-muted">
            <button
              onClick={() => setAuthMode("login")}
              className={`px-6 py-3 font-display font-bold text-lg transition-all ${
                authMode === "login"
                  ? "text-moodoo-rose border-b-3 border-moodoo-rose"
                  : "text-muted-foreground"
              }`}
            >
              ĐĂNG NHẬP
            </button>
            <button
              onClick={() => setAuthMode("register")}
              className={`px-6 py-3 font-display font-bold text-lg transition-all ${
                authMode === "register"
                  ? "text-moodoo-rose border-b-3 border-moodoo-rose"
                  : "text-muted-foreground"
              }`}
            >
              ĐĂNG KÝ
            </button>
          </div>

          {authMode === "login" ? (
            <form onSubmit={handleLogin} className="space-y-3">
              <Input
                type="email"
                placeholder="Email..."
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                required
                className="rounded-xl"
              />
              <Input
                type="password"
                placeholder="Mật khẩu..."
                value={loginPass}
                onChange={e => setLoginPass(e.target.value)}
                required
                className="rounded-xl"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-moodoo-rose text-white font-display font-bold text-lg rounded-xl hover:bg-moodoo-pink transition-colors disabled:opacity-50"
              >
                {loading ? "Đang xử lý..." : "VÀO NGAY"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3">
              <Input
                type="text"
                placeholder="NHẬP MÃ SÁCH (VD: VIP001)"
                value={regCode}
                onChange={e => setRegCode(e.target.value)}
                required
                className="rounded-xl border-2 border-moodoo-deep-orange bg-orange-50"
              />
              <Input
                type="email"
                placeholder="Email..."
                value={regEmail}
                onChange={e => setRegEmail(e.target.value)}
                required
                className="rounded-xl"
              />
              <Input
                type="password"
                placeholder="Mật khẩu..."
                value={regPass}
                onChange={e => setRegPass(e.target.value)}
                required
                className="rounded-xl"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-moodoo-deep-orange text-white font-display font-bold text-lg rounded-xl hover:bg-moodoo-orange transition-colors disabled:opacity-50"
              >
                {loading ? "Đang xử lý..." : "KÍCH HOẠT"}
              </button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
