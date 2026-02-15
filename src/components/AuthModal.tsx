import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
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

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx1IxzHOpQlmYBHXyMCoRBUOem6-WJpnr7AMc1gl2BOTiCqmasnKICIGwfEHKNf8STy/exec";

const texts = {
  vi: {
    login: "ĐĂNG NHẬP", register: "ĐĂNG KÝ", or: "hoặc",
    emailPh: "Email...", passPh: "Mật khẩu...", codePh: "NHẬP MÃ SÁCH (VD: VIP001)",
    loginBtn: "VÀO NGAY", registerBtn: "KÍCH HOẠT",
    processing: "Đang xử lý...",
    forgotPass: "Quên mật khẩu?",
    forgotTitle: "Quên mật khẩu",
    forgotDesc: "Nhập đúng Email và Mã sách đã dùng để đặt mật khẩu mới.",
    forgotEmailPh: "Email đã đăng ký",
    forgotCodePh: "Nhập mã sách (VDCX...)",
    forgotNewPassPh: "Mật khẩu mới muốn đặt",
    forgotBtn: "XÁC NHẬN ĐỔI MẬT KHẨU",
    forgotBack: "Quay lại Đăng nhập",
    googleHello: "Xin chào!",
    googleCodePrompt: "Nhập mã sách để hoàn tất đăng ký",
    googleBack: "← Quay lại",
    loginSuccess: "Đăng nhập thành công! 🎉",
    registerSuccess: "Kích hoạt thành công! 🎉",
    forgotSuccess: "Đổi mật khẩu thành công! 🎉",
    forgotSuccessDesc: "Bạn có thể đăng nhập với mật khẩu mới.",
    forgotFail: "Đổi mật khẩu thất bại",
    error: "Lỗi",
    googleError: "Đăng nhập Google thất bại",
    googleWelcome: "Chào mừng",
    googleCodeAsk: "Vui lòng nhập mã sách để đăng ký.",
  },
  en: {
    login: "SIGN IN", register: "SIGN UP", or: "or",
    emailPh: "Email...", passPh: "Password...", codePh: "ENTER BOOK CODE (e.g. VIP001)",
    loginBtn: "SIGN IN", registerBtn: "ACTIVATE",
    processing: "Processing...",
    forgotPass: "Forgot password?",
    forgotTitle: "Forgot Password",
    forgotDesc: "Enter your registered email and book code to set a new password.",
    forgotEmailPh: "Registered email",
    forgotCodePh: "Enter book code (VDCX...)",
    forgotNewPassPh: "New password",
    forgotBtn: "CONFIRM PASSWORD RESET",
    forgotBack: "Back to Sign In",
    googleHello: "Hello!",
    googleCodePrompt: "Enter book code to complete registration",
    googleBack: "← Back",
    loginSuccess: "Login successful! 🎉",
    registerSuccess: "Activation successful! 🎉",
    forgotSuccess: "Password changed! 🎉",
    forgotSuccessDesc: "You can now sign in with your new password.",
    forgotFail: "Password reset failed",
    error: "Error",
    googleError: "Google sign-in failed",
    googleWelcome: "Welcome",
    googleCodeAsk: "Please enter book code to register.",
  },
};

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authMode, setAuthMode, login, register } = useAuth();
  const { toast } = useToast();
  const { lang } = useLanguage();
  const t = texts[lang];
  const [loading, setLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [regCode, setRegCode] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");
  const [googleEmail, setGoogleEmail] = useState<string | null>(null);
  const [googleBookCode, setGoogleBookCode] = useState("");
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotCode, setForgotCode] = useState("");
  const [forgotNewPass, setForgotNewPass] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(loginEmail, loginPass);
      toast({ title: t.loginSuccess });
      setLoginEmail(""); setLoginPass("");
    } catch (err: any) {
      toast({ title: t.error, description: err.message, variant: "destructive" });
    } finally { setLoading(false); }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(regCode, regEmail, regPass);
      toast({ title: t.registerSuccess });
      setRegCode(""); setRegEmail(""); setRegPass("");
    } catch (err: any) {
      toast({ title: t.error, description: err.message, variant: "destructive" });
    } finally { setLoading(false); }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const decoded = jwtDecode<GoogleJwtPayload>(credentialResponse.credential);
      const email = decoded.email;
      try {
        await login(email, "google_" + email);
        toast({ title: `${t.googleWelcome} ${decoded.name || email}! 🎉` });
      } catch {
        setGoogleEmail(email);
        toast({ title: `${t.googleWelcome} ${decoded.name || email}! ${t.googleCodeAsk}` });
      }
    } catch {
      toast({ title: t.googleError, variant: "destructive" });
    }
  };

  const handleGoogleBookCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleEmail || !googleBookCode) return;
    setLoading(true);
    try {
      await register(googleBookCode, googleEmail, "google_" + googleEmail);
      toast({ title: t.registerSuccess });
      setGoogleEmail(null); setGoogleBookCode("");
    } catch (err: any) {
      toast({ title: t.error, description: err.message, variant: "destructive" });
    } finally { setLoading(false); }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({ action: "reset_password_now", email: forgotEmail, bookCode: forgotCode, newPass: forgotNewPass }),
      });
      const data = await res.json();
      if (data.result === "success") {
        toast({ title: t.forgotSuccess, description: data.message || t.forgotSuccessDesc });
        setForgotMode(false); setForgotEmail(""); setForgotCode(""); setForgotNewPass(""); setAuthMode("login");
      } else {
        throw new Error(data.message || t.forgotFail);
      }
    } catch (err: any) {
      toast({ title: t.error, description: err.message, variant: "destructive" });
    } finally { setLoading(false); }
  };

  return (
    <Dialog open={isAuthModalOpen} onOpenChange={(open) => { if (!open) { closeAuthModal(); setGoogleEmail(null); setForgotMode(false); } }}>
      <DialogContent className="sm:max-w-[420px] rounded-3xl border-4 border-moodoo-yellow p-0 overflow-hidden">
        <div className="p-6">
          {googleEmail ? (
            <div>
              <div className="text-center mb-4">
                <p className="text-3xl mb-2">🎉</p>
                <p className="font-display font-bold text-lg text-foreground">{t.googleHello}</p>
                <p className="font-body text-sm text-muted-foreground">{googleEmail}</p>
                <p className="font-body text-xs text-muted-foreground mt-1">{t.googleCodePrompt}</p>
              </div>
              <form onSubmit={handleGoogleBookCode} className="space-y-3">
                <Input type="text" placeholder={t.codePh} value={googleBookCode}
                  onChange={e => setGoogleBookCode(e.target.value)} required
                  className="rounded-xl border-2 border-moodoo-deep-orange bg-orange-50" />
                <button type="submit" disabled={loading}
                  className="w-full py-3 bg-moodoo-deep-orange text-white font-display font-bold text-lg rounded-xl hover:bg-moodoo-orange transition-colors disabled:opacity-50">
                  {loading ? t.processing : t.registerBtn}
                </button>
                <button type="button" onClick={() => setGoogleEmail(null)}
                  className="w-full py-2 text-muted-foreground font-body text-sm hover:underline">{t.googleBack}</button>
              </form>
            </div>
          ) : forgotMode ? (
            <div>
              <div className="text-center mb-4">
                <p className="text-3xl mb-2">🔑</p>
                <p className="font-display font-bold text-lg text-foreground">{t.forgotTitle}</p>
                <p className="font-body text-xs text-muted-foreground">{t.forgotDesc}</p>
              </div>
              <form onSubmit={handleForgotPassword} className="space-y-3">
                <Input type="email" placeholder={t.forgotEmailPh} value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)} required className="rounded-xl" />
                <Input type="text" placeholder={t.forgotCodePh} value={forgotCode}
                  onChange={e => setForgotCode(e.target.value)} required className="rounded-xl" />
                <Input type="password" placeholder={t.forgotNewPassPh} value={forgotNewPass}
                  onChange={e => setForgotNewPass(e.target.value)} required className="rounded-xl" />
                <button type="submit" disabled={loading}
                  className="w-full py-3 bg-moodoo-green text-white font-display font-bold text-lg rounded-xl hover:brightness-110 transition-colors disabled:opacity-50">
                  {loading ? t.processing : t.forgotBtn}
                </button>
                <button type="button" onClick={() => setForgotMode(false)}
                  className="w-full py-2 text-primary font-body text-sm hover:underline">{t.forgotBack}</button>
              </form>
            </div>
          ) : (
            <>
              <div className="flex justify-center mb-6 border-b-2 border-muted">
                <button onClick={() => setAuthMode("login")}
                  className={`px-6 py-3 font-display font-bold text-lg transition-all ${authMode === "login" ? "text-moodoo-rose border-b-3 border-moodoo-rose" : "text-muted-foreground"}`}>
                  {t.login}
                </button>
                <button onClick={() => setAuthMode("register")}
                  className={`px-6 py-3 font-display font-bold text-lg transition-all ${authMode === "register" ? "text-moodoo-rose border-b-3 border-moodoo-rose" : "text-muted-foreground"}`}>
                  {t.register}
                </button>
              </div>
              <div className="flex justify-center mb-4">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast({ title: t.googleError, variant: "destructive" })}
                  text="signin_with" shape="pill" width={300} />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-muted" />
                <span className="font-body text-sm text-muted-foreground">{t.or}</span>
                <div className="flex-1 h-px bg-muted" />
              </div>
              {authMode === "login" ? (
                <div>
                  <form onSubmit={handleLogin} className="space-y-3">
                    <Input type="email" placeholder={t.emailPh} value={loginEmail}
                      onChange={e => setLoginEmail(e.target.value)} required className="rounded-xl" />
                    <Input type="password" placeholder={t.passPh} value={loginPass}
                      onChange={e => setLoginPass(e.target.value)} required className="rounded-xl" />
                    <button type="submit" disabled={loading}
                      className="w-full py-3 bg-moodoo-rose text-white font-display font-bold text-lg rounded-xl hover:bg-moodoo-pink transition-colors disabled:opacity-50">
                      {loading ? t.processing : t.loginBtn}
                    </button>
                  </form>
                  <button type="button" onClick={() => setForgotMode(true)}
                    className="w-full mt-3 py-2 text-moodoo-sky font-body text-sm hover:underline">
                    {t.forgotPass}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-3">
                  <Input type="text" placeholder={t.codePh} value={regCode}
                    onChange={e => setRegCode(e.target.value)} required
                    className="rounded-xl border-2 border-moodoo-deep-orange bg-orange-50" />
                  <Input type="email" placeholder={t.emailPh} value={regEmail}
                    onChange={e => setRegEmail(e.target.value)} required className="rounded-xl" />
                  <Input type="password" placeholder={t.passPh} value={regPass}
                    onChange={e => setRegPass(e.target.value)} required className="rounded-xl" />
                  <button type="submit" disabled={loading}
                    className="w-full py-3 bg-moodoo-deep-orange text-white font-display font-bold text-lg rounded-xl hover:bg-moodoo-orange transition-colors disabled:opacity-50">
                    {loading ? t.processing : t.registerBtn}
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
