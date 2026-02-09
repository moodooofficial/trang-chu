import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

interface AuthContextType {
  user: string | null;
  isLoggedIn: boolean;
  isAuthModalOpen: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (bookCode: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  openAuthModal: (mode?: "login" | "register") => void;
  closeAuthModal: () => void;
  authMode: "login" | "register";
  setAuthMode: (mode: "login" | "register") => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyeg43OFH3fF8ATO2O55t9yjSDdXkkPAFCunsFMqxKyQRBmB9jBnCHoOaCxYcz6T0co/exec";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  useEffect(() => {
    const saved = localStorage.getItem("moodoo_user");
    if (saved) setUser(saved);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({ action: "login", email, pass: password }),
    });
    const data = await res.json();
    if (data.result === "success") {
      setUser(email);
      localStorage.setItem("moodoo_user", email);
      setIsAuthModalOpen(false);
    } else {
      throw new Error(data.message || "Đăng nhập thất bại");
    }
  }, []);

  const register = useCallback(async (bookCode: string, email: string, password: string) => {
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({ action: "register", bookCode, email, pass: password }),
    });
    const data = await res.json();
    if (data.result === "success") {
      setUser(email);
      localStorage.setItem("moodoo_user", email);
      setIsAuthModalOpen(false);
    } else {
      throw new Error(data.message || "Đăng ký thất bại");
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("moodoo_user");
  }, []);

  const openAuthModal = useCallback((mode: "login" | "register" = "login") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => setIsAuthModalOpen(false), []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, isAuthModalOpen, login, register, logout, openAuthModal, closeAuthModal, authMode, setAuthMode }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
