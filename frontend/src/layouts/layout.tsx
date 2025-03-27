import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="p-4 py-12 md:py-12 md:p-12 min-h-screen">
        {children}
        <Toaster />
      </main>
      <Footer />
    </>
  );
}
