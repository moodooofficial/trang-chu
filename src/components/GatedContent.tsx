import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface GatedContentProps {
  children: ReactNode;
  title?: string;
  description?: string;
  buttonText?: string;
  icon?: string;
  variant?: "default" | "cave" | "blog";
}

export default function GatedContent({
  children,
  title = "KHO BÁU DÀNH RIÊNG CHO THÀNH VIÊN",
  description = "Đăng nhập hoặc nhập Mã Sách để mở khóa toàn bộ nội dung nhé!",
  buttonText = "MỞ KHÓA NGAY",
  icon = "🔒",
  variant = "default",
}: GatedContentProps) {
  const { isLoggedIn, openAuthModal } = useAuth();

  if (isLoggedIn) return <>{children}</>;

  const variantStyles = {
    default: "bg-orange-50 border-moodoo-orange",
    cave: "bg-white border-moodoo-purple shadow-[0_0_30px_rgba(171,71,188,0.5)]",
    blog: "bg-white border-moodoo-teal border-dashed",
  };

  const btnStyles = {
    default: "bg-moodoo-deep-orange hover:bg-moodoo-orange",
    cave: "bg-moodoo-purple hover:bg-purple-500",
    blog: "bg-moodoo-deep-orange hover:bg-moodoo-orange",
  };

  return (
    <div className="py-16 px-4">
      <div className={`max-w-lg mx-auto rounded-3xl border-4 p-10 text-center ${variantStyles[variant]}`}>
        <div className="text-5xl mb-4">{icon}</div>
        <h2 className="text-2xl font-display font-bold mb-3 text-foreground">{title}</h2>
        <p className="font-body text-muted-foreground mb-6">{description}</p>
        <button
          onClick={() => openAuthModal("login")}
          className={`px-8 py-4 text-white font-display font-bold text-lg rounded-full transition-all transform hover:-translate-y-1 shadow-lg ${btnStyles[variant]}`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
