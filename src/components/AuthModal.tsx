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

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwLeJ1d4SvvdRUQoe38wntEbUde5pzG3pm0fBmH167jIttqcSxAgUZT_JyDSij2Jjw/exec";

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

  // Google sign-in state
  const [googleEmail, setGoogleEmail] = useState<string | null>(null);
  const [googleBookCode, setGoogleBookCode] = useState("");

  // Forgot password state
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

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

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const decoded = jwtDecode<GoogleJwtPayload>(credentialResponse.credential);
      const email = decoded.email;
      // Try login first (existing account)
      try {
        await login(email, "google_" + email);
        toast({ title: `Chào mừng ${decoded.name || email}! 🎉` });
      } catch {
        // Not registered yet, ask for book code
        setGoogleEmail(email);
        toast({ title: `Xin chào ${decoded.name || email}! Vui lòng nhập mã sách để đăng ký.` });
      }
    } catch {
      toast({ title: "Lỗi đăng nhập Google", variant: "destructive" });
    }
  };

  const handleGoogleBookCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleEmail || !googleBookCode) return;
    setLoading(true);
    try {
      await register(googleBookCode, googleEmail, "google_" + googleEmail);
      toast({ title: "Kích hoạt thành công! 🎉" });
      setGoogleEmail(null);
      setGoogleBookCode("");
    } catch (err: any) {
      toast({ title: "Lỗi", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
          action: "forgotPassword",
          email: forgotEmail,
        }),
      });
      const data = await res.json();
      if (data.result === "success") {
        toast({ title: "Yêu cầu đã được gửi! 🎉", description: data.message || "Vui lòng kiểm tra email." });
        setForgotMode(false);
        setForgotEmail("");
        setAuthMode("login");
      } else {
        throw new Error(data.message || "Gửi yêu cầu thất bại");
      }
    } catch (err: any) {
      toast({ title: "Lỗi", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isAuthModalOpen} onOpenChange={(open) => { if (!open) { closeAuthModal(); setGoogleEmail(null); setForgotMode(false); } }}>
      <DialogContent className="sm:max-w-[420px] rounded-3xl border-4 border-moodoo-yellow p-0 overflow-hidden">
        <div className="p-6">
          {googleEmail ? (
            /* After Google sign-in (new user): show book code input */
            <div>
              <div className="text-center mb-4">
                <p className="text-3xl mb-2">🎉</p>
                <p className="font-display font-bold text-lg text-foreground">Xin chào!</p>
                <p className="font-body text-sm text-muted-foreground">{googleEmail}</p>
                <p className="font-body text-xs text-muted-foreground mt-1">Nhập mã sách để hoàn tất đăng ký</p>
              </div>
              <form onSubmit={handleGoogleBookCode} className="space-y-3">
                <Input type="text" placeholder="NHẬP MÃ SÁCH (VD: VIP001)" value={googleBookCode}
                  onChange={e => setGoogleBookCode(e.target.value)} required
                  className="rounded-xl border-2 border-moodoo-deep-orange bg-orange-50" />
                <button type="submit" disabled={loading}
                  className="w-full py-3 bg-moodoo-deep-orange text-white font-display font-bold text-lg rounded-xl hover:bg-moodoo-orange transition-colors disabled:opacity-50">
                  {loading ? "Đang xử lý..." : "KÍCH HOẠT"}
                </button>
                <button type="button" onClick={() => setGoogleEmail(null)}
                  className="w-full py-2 text-muted-foreground font-body text-sm hover:underline">← Quay lại</button>
              </form>
            </div>
          ) : forgotMode ? (
            /* Forgot password form */
            <div>
              <div className="text-center mb-4">
                <p className="text-3xl mb-2">🔑</p>
                <p className="font-display font-bold text-lg text-foreground">Quên mật khẩu</p>
                <p className="font-body text-xs text-muted-foreground">Nhập email của bạn, Moodoo sẽ kiểm tra và hỗ trợ cấp lại mật khẩu.</p>
              </div>
              <form onSubmit={handleForgotPassword} className="space-y-3">
                <Input type="email" placeholder="Email đã đăng ký" value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)} required className="rounded-xl" />
                <button type="submit" disabled={loading}
                  className="w-full py-3 bg-muted-foreground text-white font-display font-bold text-lg rounded-xl hover:brightness-110 transition-colors disabled:opacity-50">
                  {loading ? "Đang xử lý..." : "GỬI YÊU CẦU"}
                </button>
                <button type="button" onClick={() => setForgotMode(false)}
                  className="w-full py-2 text-primary font-body text-sm hover:underline">Quay lại Đăng nhập</button>
              </form>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="flex justify-center mb-6 border-b-2 border-muted">
                <button onClick={() => setAuthMode("login")}
                  className={`px-6 py-3 font-display font-bold text-lg transition-all ${authMode === "login" ? "text-moodoo-rose border-b-3 border-moodoo-rose" : "text-muted-foreground"}`}>
                  ĐĂNG NHẬP
                </button>
                <button onClick={() => setAuthMode("register")}
                  className={`px-6 py-3 font-display font-bold text-lg transition-all ${authMode === "register" ? "text-moodoo-rose border-b-3 border-moodoo-rose" : "text-muted-foreground"}`}>
                  ĐĂNG KÝ
                </button>
              </div>

              {/* Google Sign-In */}
              <div className="flex justify-center mb-4">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast({ title: "Đăng nhập Google thất bại", variant: "destructive" })}
                  text="signin_with" shape="pill" width={300} />
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-muted" />
                <span className="font-body text-sm text-muted-foreground">hoặc</span>
                <div className="flex-1 h-px bg-muted" />
              </div>

              {authMode === "login" ? (
                <div>
                  <form onSubmit={handleLogin} className="space-y-3">
                    <Input type="email" placeholder="Email..." value={loginEmail}
                      onChange={e => setLoginEmail(e.target.value)} required className="rounded-xl" />
                    <Input type="password" placeholder="Mật khẩu..." value={loginPass}
                      onChange={e => setLoginPass(e.target.value)} required className="rounded-xl" />
                    <button type="submit" disabled={loading}
                      className="w-full py-3 bg-moodoo-rose text-white font-display font-bold text-lg rounded-xl hover:bg-moodoo-pink transition-colors disabled:opacity-50">
                      {loading ? "Đang xử lý..." : "VÀO NGAY"}
                    </button>
                  </form>
                  <button type="button" onClick={() => setForgotMode(true)}
                    className="w-full mt-3 py-2 text-moodoo-sky font-body text-sm hover:underline">
                    Quên mật khẩu?
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-3">
                  <Input type="text" placeholder="NHẬP MÃ SÁCH (VD: VIP001)" value={regCode}
                    onChange={e => setRegCode(e.target.value)} required
                    className="rounded-xl border-2 border-moodoo-deep-orange bg-orange-50" />
                  <Input type="email" placeholder="Email..." value={regEmail}
                    onChange={e => setRegEmail(e.target.value)} required className="rounded-xl" />
                  <Input type="password" placeholder="Mật khẩu..." value={regPass}
                    onChange={e => setRegPass(e.target.value)} required className="rounded-xl" />
                  <button type="submit" disabled={loading}
                    className="w-full py-3 bg-moodoo-deep-orange text-white font-display font-bold text-lg rounded-xl hover:bg-moodoo-orange transition-colors disabled:opacity-50">
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
