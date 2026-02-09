import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AuthModal from "@/components/AuthModal";
import CartModal from "@/components/CartModal";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <AuthModal />
      <CartModal />
    </div>
  );
}
