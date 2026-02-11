import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

interface GoogleJwtPayload {
  email: string;
  name?: string;
  picture?: string;
}

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

  // Google sign-in state - after Google auth, show book code input
  const [googleEmail, setGoogleEmail] = useState<string | null>(null);
  const [googleBookCode, setGoogleBookCode] = useState("");

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

  const handleGoogleSuccess = (credentialResponse: any) => {
    try {
      const decoded = jwtDecode<GoogleJwtPayload>(credentialResponse.credential);
      setGoogleEmail(decoded.email);
      toast({ title: `Xin chào ${decoded.name || decoded.email}! Vui lòng nhập mã sách để kích hoạt.` });
    } catch {
      toast({ title: "Lỗi đăng nhập Google", variant: "destructive" });
    }
  };

  const handleGoogleBookCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleEmail || !googleBookCode) return;
    setLoading(true);
    try {
      // Register with Google email + book code, use email as password placeholder
      await register(googleBookCode, googleEmail, "google_" + googleEmail);
      toast({ title: "Kích hoạt thành công! 🎉" });
      setGoogleEmail(null);
      setGoogleBookCode("");
    } catch (err: any) {
      // If already registered, try login
      try {
        await login(googleEmail, "google_" + googleEmail);
        toast({ title: "Đăng nhập thành công! 🎉" });
        setGoogleEmail(null);
        setGoogleBookCode("");
      } catch {
        toast({ title: "Lỗi", description: err.message, variant: "destructive" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isAuthModalOpen} onOpenChange={(open) => { if (!open) { closeAuthModal(); setGoogleEmail(null); } }}>
      <DialogContent className="sm:max-w-[420px] rounded-3xl border-4 border-moodoo-yellow p-0 overflow-hidden">
        <div className="p-6">
          {googleEmail ? (
            /* After Google sign-in: show book code input */
            <div>
              <div className="text-center mb-4">
                <p className="text-3xl mb-2">🎉</p>
                <p className="font-display font-bold text-lg text-foreground">Xin chào!</p>
                <p className="font-body text-sm text-muted-foreground">{googleEmail}</p>
              </div>
              <form onSubmit={handleGoogleBookCode} className="space-y-3">
                <Input
                  type="text"
                  placeholder="NHẬP MÃ SÁCH (VD: VIP001)"
                  value={googleBookCode}
                  onChange={e => setGoogleBookCode(e.target.value)}
                  required
                  className="rounded-xl border-2 border-moodoo-deep-orange bg-orange-50"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-moodoo-deep-orange text-white font-display font-bold text-lg rounded-xl hover:bg-moodoo-orange transition-colors disabled:opacity-50"
                >
                  {loading ? "Đang xử lý..." : "KÍCH HOẠT"}
                </button>
                <button
                  type="button"
                  onClick={() => setGoogleEmail(null)}
                  className="w-full py-2 text-muted-foreground font-body text-sm hover:underline"
                >
                  ← Quay lại
                </button>
              </form>
            </div>
          ) : (
            <>
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

              {/* Google Sign-In */}
              <div className="flex justify-center mb-4">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast({ title: "Đăng nhập Google thất bại", variant: "destructive" })}
                  text="signin_with"
                  shape="pill"
                  width={300}
                />
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-muted" />
                <span className="font-body text-sm text-muted-foreground">hoặc</span>
                <div className="flex-1 h-px bg-muted" />
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
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
